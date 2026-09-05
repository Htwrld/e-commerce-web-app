import { T } from "@/src/lib/tokens"
import { WP_TAGS } from "@/src/lib/wpTags"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 300

export type Hashtag = {
    id: number
    emoji: string
    icon: string
    name: string
    quote: string
    hearts: number
    color: string
}

const emojis = ["👸🏾", "👨🏾‍💼", "💃🏾", "🎤"]
export const getHashtags = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/hashtag?acf_format=standard`, {
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.hashtags] },
        })
        const data = await res.json()

        const hashtags: Hashtag[] = data.map((a: any) => {
            return {
                id: a.id,
                emoji: emojis[Math.floor(Math.random() * emojis.length)],
                icon: a.acf.icon,
                name: a.acf.name,
                quote: a.acf.quote,
                hearts: a.acf.hearts,
                color: T.charcoal,
            }
        })

        return hashtags
    } catch (e) {
        return []
    }
}
