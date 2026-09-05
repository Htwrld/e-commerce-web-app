export const getEmbedUrl = (url: string): string | null => {
    if (!url) return null

    const youtube = url.match(
        /(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/
    )
    if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`

    const vimeo = url.match(/vimeo\.com\/(\d+)/)
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`

    return null
}

export const isDirectVideoFile = (url: string): boolean => /\.(mp4|webm|ogg)$/i.test(url)
