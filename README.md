# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## WordPress cache revalidation

Content is fetched from WordPress with a 5-minute time-based cache (`next: { revalidate: 300 }`). To make edits show up immediately instead of waiting up to 5 minutes, wire WordPress to call `/api/revalidate` on save.

Add this to your theme's `functions.php` (or a site-specific plugin):

```php
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
```

Replace `$next_site_url` and `$revalidate_secret` with real values — keep the secret out of version control if this snippet lives in a public theme repo (e.g. pull it from a WordPress constant defined in `wp-config.php` instead of hardcoding it here).

Post type / page ID → cache tag mapping (see `src/lib/wpTags.ts`):

| `post_type` | tag |
| --- | --- |
| `product` | `wp-products` |
| `locations` | `wp-locations` |
| `ambasador` | `wp-ambassadors` |
| `hashtag` | `wp-hashtags` |
| `style` | `wp-styles` |
| `testimonial` | `wp-testimonials` |
| `post` | `wp-articles` |

| `page_id` | tag |
| --- | --- |
| `24` | `wp-homepage` |
| `315` | `wp-ambassadors-page` |
| `319` | `wp-our-story-page` |
| `321` | `wp-contact-page` |
| `482` | `wp-navbar-footer` |
