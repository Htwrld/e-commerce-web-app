export const extractYouTubeId = (url: string): string | null => {
    if (!url) return null
    const match = url.match(
        /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
    )
    return match ? match[1] : null
}

export const getYouTubeThumbnail = (url: string): string => {
    const id = extractYouTubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
}

export const getEmbedUrl = (url: string): string | null => {
    if (!url) return null

    const youtubeId = extractYouTubeId(url)
    if (youtubeId) return `https://www.youtube.com/embed/${youtubeId}`

    const vimeo = url.match(/vimeo\.com\/(\d+)/)
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

    return null
}

export const isDirectVideoFile = (url: string): boolean => /\.(mp4|webm|ogg)$/i.test(url)
