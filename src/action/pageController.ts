const website_url = process.env.WORDPRESS_URL_ENDPOINT

export const getPageBySlug = async (slug: string) => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/${slug}`)
    const data = await res.json()
    return data
}

export const getPageById = async (id: number) => {
    const res = await fetch(`${website_url}/wp-json/wp/v2/pages/${id}`)
    const data = await res.json()
    return data
}
