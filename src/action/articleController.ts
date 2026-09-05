"use server"

import { WP_TAGS } from "../lib/wpTags"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 300
const PER_PAGE = 9
const WORDS_PER_MINUTE = 200

export type Article = {
    id: number
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    image: string
    author: string
    categories: string[]
    readTime: number
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim()

const readTimeFor = (html: string) => {
    const words = stripHtml(html).split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// This hits WordPress's built-in `posts` type, so the response shape is
// plain WP REST fields (title.rendered, _embedded, ...), not the ACF
// `p.acf.*` shape used by the other, custom-post-type controllers.
const mapArticle = (p: any): Article => ({
    id: p.id,
    slug: p.slug,
    title: p.title?.rendered ? stripHtml(p.title.rendered) : "",
    excerpt: p.excerpt?.rendered ? stripHtml(p.excerpt.rendered) : "",
    content: p.content?.rendered ?? "",
    date: p.date ?? "",
    image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "",
    author: p._embedded?.author?.[0]?.name ?? "",
    categories: p._embedded?.["wp:term"]?.[0]?.map((t: any) => t.name) ?? [],
    readTime: readTimeFor(p.content?.rendered ?? ""),
})

export const getArticles = async ({ page }: { page?: number } = {}) => {
    try {
        let endpoint = `${website_url}wp-json/wp/v2/posts?_embed&per_page=${PER_PAGE}`
        if (page) endpoint += `&page=${page}`

        const res = await fetch(endpoint, {
            signal: AbortSignal.timeout(8000),
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.articles] },
        })
        if (!res.ok) return { articles: [], pages: 1 }

        const totalPagesHeader = res.headers.get("X-WP-TotalPages")
        const data = await res.json()
        const articles: Article[] = data.map(mapArticle)

        return {
            articles,
            pages: totalPagesHeader ? parseInt(totalPagesHeader) : 1,
        }
    } catch (e) {
        return { articles: [], pages: 1 }
    }
}

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    try {
        const endpoint = `${website_url}wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`
        const res = await fetch(endpoint, {
            signal: AbortSignal.timeout(8000),
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.articles] },
        })
        if (!res.ok) return null

        const data = await res.json()
        if (!data.length) return null
        return mapArticle(data[0])
    } catch (e) {
        return null
    }
}
