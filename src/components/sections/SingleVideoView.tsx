import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Video } from "@/src/action/videoController"
import { VideoCard } from "@/src/components/cards/VideoCard"
import { getEmbedUrl, isDirectVideoFile } from "@/src/lib/video"

export const SingleVideoView = ({ video, videos }: { video: Video; videos: Video[] }) => {
    const date = video.date
        ? new Date(video.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : ""
    const related = videos.filter((v) => v.id !== video.id).slice(0, 3)
    const embedUrl = getEmbedUrl(video.videoUrl)
    const isDirectFile = !embedUrl && isDirectVideoFile(video.videoUrl)

    return (
        <main>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "44px 28px" }}>
                <Link
                    href="/videos"
                    style={{
                        fontSize: 12,
                        color: T.gold,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        textDecoration: "none",
                    }}
                >
                    ← All Videos
                </Link>

                <div style={{ margin: "20px 0" }}>
                    {video.category && (
                        <div
                            style={{
                                fontSize: 10,
                                color: T.gold,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontWeight: 700,
                                marginBottom: 10,
                            }}
                        >
                            {video.category}
                        </div>
                    )}
                    <h1
                        className="section-title"
                        style={{ fontSize: "clamp(28px,4.5vw,42px)", marginBottom: 12 }}
                    >
                        {video.title}
                    </h1>
                    <div style={{ fontSize: 13, color: T.muted }}>
                        {date}
                        {date && video.views && " · "}
                        {video.views && `${video.views} views`}
                        {video.duration && ` · ${video.duration}`}
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
                            src={video.videoUrl}
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

                {video.description && (
                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 19,
                            lineHeight: 1.8,
                            color: T.charcoal,
                        }}
                    >
                        {video.description}
                    </p>
                )}
            </div>

            {related.length > 0 && (
                <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px 60px" }}>
                    <div className="divider" style={{ margin: "40px 0 24px" }} />
                    <h2 className="section-title" style={{ fontSize: 26, marginBottom: 20 }}>
                        More Videos
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                            gap: 22,
                        }}
                    >
                        {related.map((v) => (
                            <VideoCard key={v.id} video={v} />
                        ))}
                    </div>
                </div>
            )}
        </main>
    )
}
