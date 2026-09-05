"use server"

import { WP_TAGS } from "../lib/wpTags"
import { getYouTubeThumbnail } from "../lib/video"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 300
const PER_PAGE = 8

export type Video = {
    id: number
    slug: string
    title: string
    content: string
    youtubeLink: string
    isLive: boolean
    thumbnail: string
    date: string
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim()

const isLiveValue = (value: unknown) => {
    const v = String(value ?? "").trim().toLowerCase()
    return v === "yes" || v === "true" || v === "1" || v === "live"
}

const mapVideo = (v: any): Video => {
    const youtubeLink = v.acf?.youtube_link ?? ""
    return {
        id: v.id,
        slug: v.slug ?? String(v.id),
        title: v.title?.rendered ? stripHtml(v.title.rendered) : "",
        content: v.content?.rendered ?? "",
        youtubeLink,
        isLive: isLiveValue(v.acf?.is_live),
        thumbnail: v.acf?.video_thumbnail || getYouTubeThumbnail(youtubeLink),
        date: v.date ?? "",
    }
}

// Live videos surface first so the featured slot on the videos page always
// picks one up when available, without disturbing the newest-first order
// WordPress already returns otherwise.
const withLiveFirst = (videos: Video[]) =>
    [...videos].sort((a, b) => Number(b.isLive) - Number(a.isLive))

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
        const videos: Video[] = withLiveFirst(data.map(mapVideo))

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
