"use server"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type Product = {
    id: number
    photo: string
    badge: string
    gender: string
    name: string
    description: string
    price: string
    usd_price: string
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

export const getProductsByCategoryGenderBadge = async (
    category: string,
    gender: string,
    badge: string
) => {
    try {
        let endpoint = `${website_url}wp-json/wp/v2/product?acf_format=standard`
        if (category) endpoint += `&category=${category}`
        if (gender) endpoint += `&gender=${gender}`
        if (badge) endpoint += `&badge=${badge}`
        endpoint += `&order=desc&per_page=36`
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
        console.log(products)
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

export const getProducts = async ({
    badge,
    category,
    gender,
    page,
}: {
    badge?: string
    category?: string
    gender?: string
    page?: number
}) => {
    try {
        let endpoint = `${website_url}wp-json/wp/v2/product?acf_format=standard`
        if (badge) endpoint += `&badge=${badge}`
        if (category) endpoint += `&cat=${category}`
        if (gender) endpoint += `&gender=${gender}`
        endpoint += `&per_page=12`
        if (page) endpoint += `&page=${page}`
        
        const res = await fetch(endpoint)
        const totalPagesHeader = res.headers.get("X-WP-TotalPages")
        const data = await res.json()
        const products: Product[] = data.map((p: any) => {
            return {
                id: p.id,
                photo: p.acf.photo ? p.acf.photo : "",
                badge: p.acf.badge ? p.acf.badge : "",
                categories: p.acf.category ? p.acf.category.map((c: any) => c.name) : [],
                gender: p.acf.gender ? p.acf.gender : "",
                name: p.acf.name ? p.acf.name : "",
                description: p.acf.description ? p.acf.description : "",
                price: p.acf.price !== "" ? p.acf.price : "0",
                usd_price: p.acf.usd_price !== "" ? p.acf.usd_price : "0",
                quotes: p.acf.quotes ? p.acf.quotes : "",
                bible_verse: p.acf.bible_verse ? p.acf.bible_verse : "",
                bible_verse_content: p.acf.bible_verse_content ? p.acf.bible_verse_content : "",
                colors: p.acf.colors ? p.acf.colors.map((c: any) => c.name) : [],
                sizes: p.acf.sizes ? p.acf.sizes.map((s: any) => s.name) : [],
                fabric: p.acf.fabric ? p.acf.fabric : "",
                fit: p.acf.fit ? p.acf.fit : "",
                care: p.acf.care ? p.acf.care : "",
                delivery: p.acf.delivery ? p.acf.delivery : "",
                size_guide: p.acf.size_guide ? p.acf.size_guide : "",
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

export const getProductById = async (id: number): Promise<Product | null> => {
    try {
        const endpoint = `${website_url}wp-json/wp/v2/product/${id}?acf_format=standard`
        const res = await fetch(endpoint)
        if (!res.ok) return null
        const p = await res.json()
        return {
            id: p.id,
            photo: p.acf.photo ? p.acf.photo : "",
            badge: p.acf.badge ? p.acf.badge : "",
            categories: p.acf.category ? p.acf.category.map((c: any) => c.name) : [],
            gender: p.acf.gender ? p.acf.gender : "",
            name: p.acf.name ? p.acf.name : "",
            description: p.acf.description ? p.acf.description : "",
            price: p.acf.price !== "" ? p.acf.price : "0",
            usd_price: p.acf.usd_price !== "" ? p.acf.usd_price : "0",
            quotes: p.acf.quotes ? p.acf.quotes : "",
            bible_verse: p.acf.bible_verse ? p.acf.bible_verse : "",
            bible_verse_content: p.acf.bible_verse_content ? p.acf.bible_verse_content : "",
            colors: p.acf.colors ? p.acf.colors.map((c: any) => c.name) : [],
            sizes: p.acf.sizes ? p.acf.sizes.map((s: any) => s.name) : [],
            fabric: p.acf.fabric ? p.acf.fabric : "",
            fit: p.acf.fit ? p.acf.fit : "",
            care: p.acf.care ? p.acf.care : "",
            delivery: p.acf.delivery ? p.acf.delivery : "",
            size_guide: p.acf.size_guide ? p.acf.size_guide : "",
        }
    } catch (error) {
        return null
    }
}

export type Location = {
    id: number
    location: string
    fees: number
}

export const getLocations = async () => {
    try {
        const req = await fetch(`${website_url}wp-json/wp/v2/locations?per_page=40`)
        const res = await req.json()
        const locations: Location[] = res.map((l: any) => {
            return {
                id: l.id,
                location: l.acf.location,
                fees: l.acf.fees ? parseInt(l.acf.fees) : 0,
            }
        })
        return locations
    } catch (err) {
        return []
    }
}
