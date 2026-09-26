<?php
/**
 * Plugin Name: HTW Headless
 * Description: Everything the headless Next.js storefront needs from WordPress:
 * a public view-count endpoint for articles and videos, plus the WooCommerce
 * glue (price on /wp/v2/product, an "Out for delivery" order status, and a
 * one-time migration for the old ACF products).
 * Version: 1.1.0
 *
 * Replaces the separate "Site View Counter" and "HTW WooCommerce Bridge"
 * plugins. Deactivate and delete both before activating this one, or
 * WordPress will fatal on the duplicate functions.
 *
 * WooCommerce setup order (do this on staging first):
 *  1. Remove the old "product" post type registration (CPT UI / theme code).
 *     Keep its taxonomies and ACF field group. Removing the registration does
 *     not delete the posts.
 *  2. Install + activate WooCommerce, set currency to NGN.
 *  3. Activate this plugin, then run:  wp htw migrate-products
 *     (copies each product's ACF "price" into WooCommerce's price field).
 *  4. WooCommerce > Settings > Advanced > REST API: create a Read/Write key
 *     for the Next.js server (WC_CONSUMER_KEY / WC_CONSUMER_SECRET).
 */

if (!defined('ABSPATH')) {
    exit;
}

/* -------------------------------------------------------------------------
 * View counter
 *
 * Public REST endpoint the Next.js frontend calls to read and atomically
 * increment a post's "view_count" ACF field.
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    register_rest_route('site/v1', '/views', [
        'methods' => 'GET',
        'callback' => 'site_get_view_count',
        'permission_callback' => '__return_true',
        'args' => [
            'type' => ['required' => true],
            'slug' => ['required' => true],
        ],
    ]);

    register_rest_route('site/v1', '/views', [
        'methods' => 'POST',
        'callback' => 'site_increment_view_count',
        'permission_callback' => '__return_true',
        'args' => [
            'type' => ['required' => true],
            'slug' => ['required' => true],
        ],
    ]);
});

function site_view_post_type($type)
{
    return $type === 'video' ? 'video' : 'post';
}

function site_find_post_id($slug, $type)
{
    $post = get_page_by_path(sanitize_title($slug), OBJECT, site_view_post_type($type));
    return $post ? $post->ID : null;
}

function site_get_view_count(WP_REST_Request $req)
{
    $post_id = site_find_post_id($req->get_param('slug'), $req->get_param('type'));
    if (!$post_id) {
        return new WP_REST_Response(['count' => 0], 200);
    }

    return new WP_REST_Response(['count' => (int) get_post_meta($post_id, 'view_count', true)], 200);
}

function site_increment_view_count(WP_REST_Request $req)
{
    global $wpdb;

    $post_id = site_find_post_id($req->get_param('slug'), $req->get_param('type'));
    if (!$post_id) {
        return new WP_REST_Response(['count' => 0], 404);
    }

    // ACF's Number field for "view_count" stores its value under the same
    // postmeta key, so this both drives the counter and keeps the ACF field
    // (and therefore `acf.view_count` in the normal wp/v2 responses) in sync.
    if (get_post_meta($post_id, 'view_count', true) === '') {
        add_post_meta($post_id, 'view_count', 0, true);
    }

    // A read-then-write via update_post_meta would race under concurrent
    // viewers; incrementing at the DB level keeps it atomic.
    $wpdb->query($wpdb->prepare(
        "UPDATE {$wpdb->postmeta} SET meta_value = meta_value + 1 WHERE post_id = %d AND meta_key = 'view_count'",
        $post_id
    ));

    return new WP_REST_Response(['count' => (int) get_post_meta($post_id, 'view_count', true)], 200);
}

/* -------------------------------------------------------------------------
 * WooCommerce
 * ---------------------------------------------------------------------- */

// WooCommerce's "product" post type must stay on /wp/v2/product so the
// storefront keeps reading products (and their ACF fields) the same way.
add_filter('woocommerce_register_post_type_product', function ($args) {
    $args['show_in_rest'] = true;
    $args['rest_base'] = 'product';
    return $args;
});

// WooCommerce stores prices in its own meta, which /wp/v2 doesn't return.
add_action('rest_api_init', function () {
    register_rest_field('product', 'shop_price', [
        'get_callback' => function ($post) {
            $product = function_exists('wc_get_product') ? wc_get_product($post['id']) : null;
            return $product ? $product->get_price() : null;
        },
        'schema' => ['type' => ['string', 'null']],
    ]);

    register_rest_field('product', 'in_stock', [
        'get_callback' => function ($post) {
            $product = function_exists('wc_get_product') ? wc_get_product($post['id']) : null;
            return $product ? $product->is_in_stock() : true;
        },
        'schema' => ['type' => 'boolean'],
    ]);
});

// "Out for delivery" sits between processing and completed so customers
// tracking their order can see it has left the shop.
add_action('init', function () {
    register_post_status('wc-shipped', [
        'label' => 'Out for delivery',
        'public' => true,
        'exclude_from_search' => false,
        'show_in_admin_all_list' => true,
        'show_in_admin_status_list' => true,
        'label_count' => _n_noop('Out for delivery <span class="count">(%s)</span>', 'Out for delivery <span class="count">(%s)</span>'),
    ]);
});

add_filter('wc_order_statuses', function ($statuses) {
    $result = [];
    foreach ($statuses as $key => $label) {
        $result[$key] = $label;
        if ($key === 'wc-processing') {
            $result['wc-shipped'] = 'Out for delivery';
        }
    }
    return $result;
});

add_filter('bulk_actions-edit-shop_order', 'htw_add_shipped_bulk_action');
add_filter('bulk_actions-woocommerce_page_wc-orders', 'htw_add_shipped_bulk_action');
function htw_add_shipped_bulk_action($actions)
{
    $actions['mark_shipped'] = 'Change status to out for delivery';
    return $actions;
}

if (defined('WP_CLI') && WP_CLI) {
    WP_CLI::add_command('htw migrate-products', function () {
        $ids = get_posts([
            'post_type' => 'product',
            'post_status' => 'any',
            'numberposts' => -1,
            'fields' => 'ids',
        ]);

        foreach ($ids as $id) {
            $raw = function_exists('get_field') ? get_field('price', $id) : get_post_meta($id, 'price', true);
            $price = preg_replace('/[^\d.]/', '', (string) $raw);

            if (!has_term('', 'product_type', $id)) {
                wp_set_object_terms($id, 'simple', 'product_type');
            }

            $product = wc_get_product($id);
            if (!$product) {
                WP_CLI::warning("#$id: could not load as a WooCommerce product");
                continue;
            }

            if ($price === '') {
                WP_CLI::warning("#$id \"{$product->get_name()}\": no ACF price, skipped");
                continue;
            }

            $product->set_regular_price($price);
            $product->set_stock_status('instock');
            $product->save();
            WP_CLI::log("#$id \"{$product->get_name()}\": ₦$price");
        }

        WP_CLI::success(count($ids) . ' products processed.');
    });
}
