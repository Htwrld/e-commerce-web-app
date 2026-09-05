import { getVideoBySlug, getVideos } from "@/src/action/videoController"
import { SingleVideoView } from "@/src/components/sections/SingleVideoView"
import { notFound } from "next/navigation"

const SingleVideoPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const video = await getVideoBySlug(slug)

    if (!video) return notFound()

    const { videos } = await getVideos({})

    return <SingleVideoView video={video} videos={videos} />
}

export default SingleVideoPage
