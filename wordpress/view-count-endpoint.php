<?php
/**
 * Plugin Name: Site View Counter
 * Description: Public REST endpoint the Next.js frontend calls to read and
 * atomically increment a post's "view_count" ACF field, replacing the old
 * Postgres/Prisma view-count table.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

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
