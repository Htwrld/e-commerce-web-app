const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type Product = {
    id: number
    photo: string
    badge: string
    gender: string
    name: string
    description: string
    price: string
    quotes: string
    bible_verse: string
    bible_verse_content: string
    colors: string[]
    sizes: string[]
    fabric: string
    fit: string
    care: string
    delivery: string
    size_guide: string
}

export const getProducts = async () => {
    try {
        const res = await fetch(`${website_url}wp-json/wp/v2/product?acf_format=standard`, {
            cache: "no-cache"
        })
        const data = await res.json()
        console.log(data)
        const products: Product[] = data.map((p: any) => {
            return {
                id: p.id,
                photo: p.acf.photo,
                badge: p.acf.badge,
                gender: p.acf.gender,
                name: p.acf.name,
                description: p.acf.description,
                price: p.acf.price,
                quotes: p.acf.quotes,
                bible_verse: p.acf.bible_verse,
                bible_verse_content: p.acf.bible_verse_content,
                colors: p.acf.colors,
                sizes: p.acf.sizes,
                fabric: p.acf.fabric,
                fit: p.acf.fit,
                care: p.acf.care,
                delivery: p.acf.delivery,
                size_guide: p.acf.size_guide,
            }
        })
        
        return products
    } catch (error) {
        return []
    }
}
