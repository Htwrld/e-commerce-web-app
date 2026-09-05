import { WP_TAGS } from "@/src/lib/wpTags"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 300

export type Testimonial = {
    id: number
    stars: number
    text: string
    name: string
    city: string
}

export const getTestimonials = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/testimonial?acf_format=standard`, {
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.testimonials] },
        })
        const data = await res.json()

        const testimonials: Testimonial[] = data.map((t: any) => {
            return {
                id: t.id,
                stars: t.acf.star_ratings,
                text: t.acf.customer_review_quote,
                name: t.acf.customer_name,
                city: t.acf.city,
            }
        })

        return testimonials
    } catch (e) {
        return []
    }
}