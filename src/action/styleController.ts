import { T } from "@/src/lib/tokens"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type Style = {
    id: number
    image: string
    title: string
    handle: string
    city: string
    color: string
}

export const getStyles = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/style?acf_format=standard`)
        const data = await res.json()
  
        const styles: Style[] = data.map((p: any) => {
            return {
                id: p.id,
                image: p.acf.image,
                title: p.acf.title,
                handle: p.acf.handle,
                city: p.acf.city,
                color: Object.keys(T)[Math.floor(Math.random() * Object.keys(T).length)],
            }
        })

        return styles
    } catch (e) {
        console.log(e)
        return []
    }
}
