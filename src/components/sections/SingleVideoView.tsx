import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Video } from "@/src/action/videoController"
import { LiveBadge } from "@/src/components/cards/LiveBadge"
import { getEmbedUrl, isDirectVideoFile } from "@/src/lib/video"
import { formatViewCount } from "@/src/lib/utils"
import { CommentsSection } from "@/src/components/sections/CommentsSection"

export const SingleVideoView = ({ video, videos }: { video: Video; videos: Video[] }) => {
    const date = video.date
        ? new Date(video.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : ""
    const related = videos.filter((v) => v.id !== video.id).slice(0, 3)
    const embedUrl = getEmbedUrl(video.youtubeLink)
    const isDirectFile = !embedUrl && isDirectVideoFile(video.youtubeLink)

    return (
        <main>
            <div
                style={{
                    maxWidth: 1160,
                    margin: "0 auto",
                    padding: "44px 28px 60px",
                    display: "flex",
                    gap: 48,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ flex: "1 1 640px", minWidth: 0 }}>
                    <div style={{ margin: "0 0 20px" }}>
                        <h1
                            className="section-title"
                            style={{ fontSize: "clamp(28px,4.5vw,42px)", marginBottom: 12 }}
                        >
                            {video.title}
                        </h1>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            {date && (
                                <div style={{ fontSize: 13, color: T.muted }}>
                                    {date} · {formatViewCount(video.views)} views
                                </div>
                            )}
                            {video.isLive && <LiveBadge />}
                        </div>
                    </div>

                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "16 / 9",
                            borderRadius: 14,
                            overflow: "hidden",
                            marginBottom: 32,
                            background: T.ink,
                        }}
                    >
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                            />
                        ) : isDirectFile ? (
                            <video
                                src={video.youtubeLink}
                                poster={video.thumbnail || undefined}
                                controls
                                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                            />
                        ) : (
                            <>
                                {video.thumbnail && (
                                    <Image
                                        src={video.thumbnail}
                                        alt={video.title}
                                        fill
                                        className="h-full w-full object-cover object-center static!"
                                    />
                                )}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 48,
                                        color: "#fff",
                                    }}
                                >
                                    🎬
                                </div>
                            </>
                        )}
                    </div>

                    {video.content && (
                        <div
                            className="article-content"
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 19,
                                lineHeight: 1.8,
                                color: T.charcoal,
                            }}
                            dangerouslySetInnerHTML={{ __html: video.content }}
                        />
                    )}

                    <CommentsSection postId={video.id} />
                </div>

                {related.length > 0 && (
                    <aside style={{ flex: "1 1 280px", maxWidth: 340, width: "100%" }}>
                        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 18 }}>
                            More Videos
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            {related.map((v) => (
                                <SidebarVideoCard key={v.id} video={v} />
                            ))}
                        </div>
                    </aside>
                )}
            </div>
        </main>
    )
}

const SidebarVideoCard = ({ video }: { video: Video }) => {
    const date = video.date
        ? new Date(video.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : ""

    return (
        <Link
            href={`/videos/${video.slug}`}
            style={{
                display: "flex",
                gap: 14,
                textDecoration: "none",
                paddingBottom: 18,
                borderBottom: `1px solid ${T.border}`,
            }}
        >
            <div
                style={{
                    position: "relative",
                    flex: "0 0 100px",
                    width: 100,
                    aspectRatio: "16 / 9",
                    borderRadius: 10,
                    overflow: "hidden",
                    background: T.ink,
                }}
            >
                {video.thumbnail ? (
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="h-full w-full object-cover object-center static!"
                    />
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                            color: "#fff",
                        }}
                    >
                        🎬
                    </div>
                )}
                {video.isLive && (
                    <div style={{ position: "absolute", top: 6, left: 6 }}>
                        <LiveBadge />
                    </div>
                )}
            </div>
            <div style={{ minWidth: 0 }}>
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 16,
                        fontWeight: 600,
                        margin: "0 0 6px",
                        color: T.ink,
                        lineHeight: 1.3,
                    }}
                >
                    {video.title}
                </h3>
                <div style={{ fontSize: 11, color: T.muted }}>
                    {date}
                    {date && " · "}
                    {formatViewCount(video.views)} views
                </div>
            </div>
        </Link>
    )
}
