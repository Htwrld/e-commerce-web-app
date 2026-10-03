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

## Paystack checkout setup

This Next.js checkout initializes Paystack transactions directly and stores orders in
WooCommerce. WordPress's Paystack plugin is only required if you also offer the
native WooCommerce checkout; installing it alone does not configure this app.

1. In WordPress, set WooCommerce > Settings > General > Currency to Nigerian naira
   (NGN) for this Nigerian storefront. Keep the WooCommerce REST API credentials
   used by the app enabled with Read/Write permission.
2. If you offer native WordPress checkout, install and activate **Paystack
   WooCommerce Payment Gateway**, then enable it under WooCommerce > Settings >
   Payments > Paystack. Enter the matching test public/secret keys and enable test
   mode initially. Disable Flutterwave there if it is no longer offered.
3. Set `PAYSTACK_SECRET_KEY=sk_test_...` in `.env.local` and your deployed app's
   server environment. Keep it private; no `NEXT_PUBLIC_` key is needed. Set
   `SITE_URL=https://hopestrendyworld.com` (or the actual storefront origin), and
   restart/redeploy the app. `FLW_SECRET_KEY` and `FLW_WEBHOOK_HASH` are no longer
   used and may be removed from the environment.
4. In Paystack > Settings > API Keys & Webhooks, set the **test webhook URL** to
   `https://hopestrendyworld.com/api/paystack/webhook` (use your deployed storefront
   domain). This app supplies its own callback URL for each order; do not set the
   webhook to `/checkout/complete` or substitute the WordPress plugin's webhook.
   If both native WooCommerce and this app accept payments using the same Paystack
   account, arrange webhook routing to both handlers before enabling both flows.
5. Test a successful payment, a cancelled payment and retry, and a payment where
   the customer closes the popup before returning. Confirm that WooCommerce shows
   the successful order as Processing/Completed with a Paystack reference, reduces
   stock, and sends its configured order emails. Failed payments must stay unpaid.
6. When ready, use the matching live keys in the app and any WordPress Paystack
   plugin, disable the plugin's test mode, configure the **live webhook URL** to
   the same app endpoint, and redeploy. Sandbox checks do not move real money.

The app converts naira to kobo, verifies payments server-side, checks the order's
stored payment reference, customer email, exact amount and currency, and validates
webhooks with HMAC SHA512. Retrying preserves previous references. Existing
Flutterwave payments in flight should be reconciled before switching the deployment.
Refunds are not automatically synchronized by this integration.

References: [Paystack transactions](https://paystack.com/docs/api/transaction/),
[Paystack webhooks](https://paystack.com/docs/payments/webhooks/),
[WooCommerce Paystack setup](https://woocommerce.com/document/paystack/).

## Homepage hero: three slides with three images each

Import `wordpress/acf-homepage-hero.json` under **ACF > Tools > Import Field
Groups**. It creates **Homepage Hero Slides**, assigned to homepage ID **24**,
with **Show in REST API** enabled. If your homepage ID differs, change the location
rule and the homepage fetch in `src/action/pageController.ts` together.

The three Group fields are `hero_slide_1`, `hero_slide_2`, and `hero_slide_3`.
Each contains:

| Field name | ACF type | Purpose |
| --- | --- | --- |
| `badge` | Text | Short badge above the headline |
| `headline` | Text | Main heading |
| `subheadline` | Text Area | Supporting copy |
| `tagline` | Text | Short additional message |
| `background_color` | Color Picker | Slide background colour |
| `image_1`, `image_2`, `image_3` | Image, return Image Array | Three individual slide images; set alt text in Media Library |
| `button_1_text`, `button_2_text` | Text | Button labels |
| `button_1_link`, `button_2_link` | Text | Relative paths (`/shop`) or complete HTTPS links |

Populate each group on the homepage and save. The hero rotates every five seconds,
changing its copy, buttons, background and image strip together. Dots select a
slide; Pause/Play controls autoplay. Hovering or focusing the hero temporarily
pauses rotation. Slides with no heading or images are omitted. Existing flat
`hero_*_1`, `hero_*_2`, `hero_*_3` fields remain fallbacks while you populate the new
groups; each old image belongs only to its corresponding slide. Once a new group
is filled, clear legacy values if you want optional copy/buttons to be empty.

There are nine image slots total (three per slide). Images should come from the
configured WordPress Media Library at `blog.hopestrendyworld.com`; a different
media host needs to be allowed in `next.config.ts`. Saved content appears within
five minutes, or immediately with the cache revalidation setup above.

ACF references: [Group fields](https://www.advancedcustomfields.com/resources/group/)
and [REST API exposure](https://www.advancedcustomfields.com/resources/wp-rest-api-integration/).
