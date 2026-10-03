<?php
/**
 * Plugin Name: HTW Headless
 * Description: Everything the headless Next.js storefront needs from WordPress:
 * a public view-count endpoint for articles and videos, plus the WooCommerce
 * glue (price on /wp/v2/product, an "Out for delivery" order status, and a
 * one-time migration for the old ACF products).
 * Version: 1.3.0
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
 *  3. Rename the product ACF field "price" to "legacy_ngn_price".
 *     Activate this plugin, preview: wp htw migrate-products --dry-run
 *     Then apply: wp htw migrate-products (see README repair instructions).
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

/**
 * Notify Next.js to revalidate its cache when content is saved in WordPress.
 */
add_action('save_post', function ($post_id, $post, $update) {
    if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id)) {
        return;
    }
    if ($post->post_status !== 'publish') {
        return;
    }

    $next_site_url = 'https://your-nextjs-domain.com'; // no trailing slash
    $revalidate_secret = 'your-revalidate-secret'; // must match REVALIDATE_SECRET in .env.local

    $params = ['secret' => $revalidate_secret];

    // ACF page-builder pages (home, ambassadors, our story, contact, navbar/footer)
    // are identified by page ID; everything else by its post type.
    if ($post->post_type === 'page') {
        $params['page_id'] = $post_id;
    } else {
        $params['post_type'] = $post->post_type;
    } 

    wp_remote_post(add_query_arg($params, "{$next_site_url}/api/revalidate"), [
        'timeout' => 5,
        'blocking' => false, // fire-and-forget, don't slow down the WP save
    ]);
}, 10, 3);

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

    foreach ([
        'stock_quantity' => 'get_stock_quantity',
        'manage_stock' => 'managing_stock',
        'backorders_allowed' => 'backorders_allowed',
        'stock_status' => 'get_stock_status',
    ] as $field => $method) {
        register_rest_field('product', $field, [
            'get_callback' => function ($post) use ($method) {
                $product = function_exists('wc_get_product') ? wc_get_product($post['id']) : null;
                return $product ? $product->$method() : null;
            },
        ]);
    }

    register_rest_field('product', 'in_stock', [
        'get_callback' => function ($post) {
            $product = function_exists('wc_get_product') ? wc_get_product($post['id']) : null;
            return $product ? $product->is_in_stock() : false;
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

// After renaming the old ACF "price" field to "legacy_ngn_price", keep its
// existing values visible until each product is next saved. Never use _price
// for an ACF reference: WooCommerce owns that metadata key.
add_filter('acf/load_value/name=legacy_ngn_price', function ($value, $post_id) {
    if (get_post_type($post_id) === 'product' && !metadata_exists('post', $post_id, 'legacy_ngn_price')) {
        return get_post_meta($post_id, 'price', true);
    }
    return $value;
}, 10, 2);

// Accept plain decimal amounts only. In particular, do not strip letters from
// an ACF field key and accidentally turn its digits into a payable amount.
function htw_parse_legacy_price($raw)
{
    if (!is_string($raw) && !is_int($raw) && !is_float($raw)) {
        return null;
    }
    $price = trim((string) $raw);
    if (!preg_match('/^\d+(?:\.\d{1,2})?$/D', $price) || (float) $price <= 0) {
        return null;
    }
    return $price;
}

if (defined('WP_CLI') && WP_CLI) {
    /**
     * Restore simple-product WooCommerce prices from preserved ACF values.
     *
     * ## OPTIONS
     *
     * [--dry-run]
     * : Show proposed prices without changing products.
     */
    WP_CLI::add_command('htw migrate-products', function ($args, $assoc_args) {
        if (!function_exists('wc_get_product')) {
            WP_CLI::error('WooCommerce must be active.');
        }
        $dry_run = isset($assoc_args['dry-run']);
        // Fail before any writes if the old conflicting ACF field is still
        // attached to a product. Renaming must happen before the repair.
        if (function_exists('acf_get_field_groups')) {
            $has_price_field = function ($fields) use (&$has_price_field) {
                foreach ($fields ?: [] as $field) {
                    if (($field['name'] ?? '') === 'price') {
                        return true;
                    }
                    if ($has_price_field($field['sub_fields'] ?? [])) {
                        return true;
                    }
                    foreach ($field['layouts'] ?? [] as $layout) {
                        if ($has_price_field($layout['sub_fields'] ?? [])) {
                            return true;
                        }
                    }
                }
                return false;
            };
        }
        $ids = get_posts([
            'post_type' => 'product',
            'post_status' => 'any',
            'numberposts' => -1,
            'fields' => 'ids',
        ]);
        if (isset($has_price_field)) {
            foreach ($ids as $id) {
                foreach (acf_get_field_groups(['post_id' => $id]) as $group) {
                    if ($has_price_field(acf_get_fields($group))) {
                        WP_CLI::error('Rename the product ACF field "price" to "legacy_ngn_price" first. Keep its field key unchanged.');
                    }
                }
            }
        }
        $updated = 0;
        $skipped = 0;
        foreach ($ids as $id) {
            $source = metadata_exists('post', $id, 'legacy_ngn_price') ? 'legacy_ngn_price' : 'price';
            $price = htw_parse_legacy_price(get_post_meta($id, $source, true));
            $product = wc_get_product($id);
            if (!$product || !$product->is_type('simple') || $price === null) {
                WP_CLI::warning("#$id: not a simple product or missing/invalid legacy price; skipped.");
                $skipped++;
                continue;
            }
            WP_CLI::log(sprintf('#%d %s: %s -> %s NGN%s', $id, $product->get_name(), $product->get_price(), $price, $dry_run ? ' (dry run)' : ''));
            if (!$dry_run) {
                // Keep a snapshot of the pre-repair pricing for investigation.
                add_post_meta($id, '_htw_price_before_repair', [
                    'price' => $product->get_price(),
                    'regular_price' => $product->get_regular_price(),
                    'sale_price' => $product->get_sale_price(),
                    'sale_from' => $product->get_date_on_sale_from() ? $product->get_date_on_sale_from()->getTimestamp() : null,
                    'sale_to' => $product->get_date_on_sale_to() ? $product->get_date_on_sale_to()->getTimestamp() : null,
                ], true);
                $product->set_regular_price($price);
                // The legacy ACF amount is the intended current selling price.
                $product->set_sale_price('');
                $product->set_date_on_sale_from(null);
                $product->set_date_on_sale_to(null);
                $product->set_price($price);
                $product->save();
                wc_delete_product_transients($id);
            }
            $updated++;
        }
        WP_CLI::success(sprintf('%d products %s; %d skipped.', $updated, $dry_run ? 'previewed' : 'repaired', $skipped));
    });
}
