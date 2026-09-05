import { T } from "@/src/lib/tokens"
import { WP_TAGS } from "@/src/lib/wpTags"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 300

export type Ambassador = {
    id: number
    emoji: string
    photo: string
    name: string
    social_handle: string
    quote: string
    city: string
    color: string
}

const emojis = ["👸🏾", "👨🏾‍💼", "💃🏾", "🎤"]

export const getAmbassadors = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/ambasador?acf_format=standard`, {
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.ambassadors] },
        })
        const data = await res.json()

        const ambassadors: Ambassador[] = data.map((a: any) => {
            return {
                id: a.id,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                photo: a.acf.profile_photo,
                name: a.acf.ambassadors_full_name,
                social_handle: a.acf.social_media_handle,
                city: a.acf.city,
                quote: a.acf.personal_quote,
                color: T.gold,
            }
        })

        return ambassadors
    } catch (e) {
        return []
    }
}
