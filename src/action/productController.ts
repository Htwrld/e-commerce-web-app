'use server'

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
    categories: string[]
    colors: string[]
    sizes: string[]
    fabric: string
    fit: string
    care: string
    delivery: string
    size_guide: string
}

export const getProducts = async (acfField?: string, page?: number) => {
    try {
        let endpoint = `${website_url}wp-json/wp/v2/product?acf_format=standard`
        if (acfField) endpoint += `&meta_key=${acfField}`
        endpoint += `&order=desc&per_page=36`
        if (page) endpoint += `&page=${page}`
        const res = await fetch(endpoint)
        const totalPagesHeader = res.headers.get("X-WP-TotalPages")
        const data = await res.json()
        const products: Product[] = data.map((p: any) => {
            return {
                id: p.id,
                photo: p.acf.photo,
                badge: p.acf.badge,
                categories: p.acf.category ? p.acf.category.map((c: any) => c.name) : [],
                gender: p.acf.gender,
                name: p.acf.name,
                description: p.acf.description,
                price: p.acf.price !== "" ? p.acf.price : "100",
                quotes: p.acf.quotes,
                bible_verse: p.acf.bible_verse,
                bible_verse_content: p.acf.bible_verse_content,
                colors: p.acf.colors ? p.acf.colors.map((c: any) => c.name) : [],
                sizes: p.acf.sizes ? p.acf.sizes.map((s: any) => s.name) : [],
                fabric: p.acf.fabric,
                fit: p.acf.fit,
                care: p.acf.care,
                delivery: p.acf.delivery,
                size_guide: p.acf.size_guide,
            }
        })

        return {
            products,
            pages: totalPagesHeader ? parseInt(totalPagesHeader) : 1,
        }
    } catch (error) {
        return {
            products: [],
            pages: 1,
        }
    }
}
