import { getVideoBySlug, getVideos } from "@/src/action/videoController"
import { incrementViewCount } from "@/src/action/viewController"
import { SingleVideoView } from "@/src/components/sections/SingleVideoView"
import { notFound } from "next/navigation"

const SingleVideoPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const video = await getVideoBySlug(slug)

    if (!video) return notFound()

    const views = await incrementViewCount("video", slug)
    const { videos } = await getVideos({})

    return <SingleVideoView video={{ ...video, views }} videos={videos} />
}

export default SingleVideoPage
