"use server"

import { WP_TAGS } from "../lib/wpTags"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 300
const PER_PAGE = 8

export type Video = {
    id: number
    slug: string
    title: string
    description: string
    thumbnail: string
    videoUrl: string
    duration: string
    views: string
    category: string
    date: string
}

const mapVideo = (v: any): Video => ({
    id: v.id,
    slug: v.slug ?? String(v.id),
    title: v.acf?.title ?? "",
    description: v.acf?.description ?? "",
    thumbnail: v.acf?.thumbnail ?? "",
    videoUrl: v.acf?.video_url ?? "",
    duration: v.acf?.duration ?? "",
    views: v.acf?.views ?? "",
    category: v.acf?.category ?? "",
    date: v.date ?? "",
})

export const getVideos = async ({ page }: { page?: number } = {}) => {
    try {
        let endpoint = `${website_url}wp-json/wp/v2/video?acf_format=standard&per_page=${PER_PAGE}`
        if (page) endpoint += `&page=${page}`

        const res = await fetch(endpoint, {
            signal: AbortSignal.timeout(8000),
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.videos] },
        })
        if (!res.ok) return { videos: [], pages: 1 }

        const totalPagesHeader = res.headers.get("X-WP-TotalPages")
        const data = await res.json()
        const videos: Video[] = data.map(mapVideo)

        return {
            videos,
            pages: totalPagesHeader ? parseInt(totalPagesHeader) : 1,
        }
    } catch (e) {
        return { videos: [], pages: 1 }
    }
}

export const getVideoBySlug = async (slug: string): Promise<Video | null> => {
    try {
        const endpoint = `${website_url}wp-json/wp/v2/video?slug=${encodeURIComponent(slug)}&acf_format=standard`
        const res = await fetch(endpoint, {
            signal: AbortSignal.timeout(8000),
            next: { revalidate: REVALIDATE_SECONDS, tags: [WP_TAGS.videos] },
        })
        if (!res.ok) return null

        const data = await res.json()
        if (!data.length) return null
        return mapVideo(data[0])
    } catch (e) {
        return null
    }
}
