import { T } from "@/src/lib/tokens"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type Hashtag = {
    id: number
    icon: string
    name: string
    quote: string
    hearts: number
    color: string
}

export const getHashtags = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/hashtag?acf_format=standard`)
        const data = await res.json()

        const hashtags: Hashtag[] = data.map((a: any) => {
            return {
                id: a.id,
                icon: a.acf.icon,
                name: a.acf.name,
                quote: a.acf.quote,
                hearts: a.acf.hearts,
                color: Object.keys(T)[Math.floor(Math.random() * Object.keys(T).length)],
            }
        })

        return hashtags
    } catch (e) {
        console.log(e)
        return []
    }
}
