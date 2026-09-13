"use server"

export type ViewType = "article" | "video"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

// Maps our internal view type to the WordPress post type slug the custom
// `site/v1/views` REST route (see wordpress/view-count-endpoint.php) expects.
const WP_POST_TYPE: Record<ViewType, string> = {
    article: "post",
    video: "video",
}

export const incrementViewCount = async (type: ViewType, slug: string): Promise<number> => {
    try {
        const res = await fetch(`${website_url}wp-json/site/v1/views`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: WP_POST_TYPE[type], slug }),
            signal: AbortSignal.timeout(8000),
            cache: "no-store",
        })
        if (!res.ok) return 0
        const data = await res.json()
        return data.count ?? 0
    } catch (e) {
        return 0
    }
}
