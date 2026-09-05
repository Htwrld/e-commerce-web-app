import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Video } from "@/src/action/videoController"

export function VideoCard({ video }: { video: Video }) {
    const date = video.date
        ? new Date(video.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : ""

    return (
        <Link href={`/videos/${video.slug}`} className="card block" style={{ textDecoration: "none" }}>
            <div
                style={{
                    background: T.white,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        height: 160,
                        position: "relative",
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
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 40,
                                color: T.white,
                            }}
                        >
                            🎬
                        </div>
                    )}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(26,22,18,0.18)",
                        }}
                    >
                        <div
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.92)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 14,
                                color: T.ink,
                            }}
                        >
                            ▶
                        </div>
                    </div>
                    {video.duration && (
                        <div
                            style={{
                                position: "absolute",
                                bottom: 8,
                                right: 8,
                                background: "rgba(26,22,18,0.85)",
                                color: "#fff",
                                fontSize: 10,
                                fontWeight: 700,
                                padding: "3px 6px",
                                borderRadius: 4,
                            }}
                        >
                            {video.duration}
                        </div>
                    )}
                </div>
                <div className="px-4 pt-4 pb-5">
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 19,
                            fontWeight: 600,
                            margin: "0 0 8px",
                            color: T.ink,
                            lineHeight: 1.25,
                        }}
                    >
                        {video.title}
                    </h3>
                    {video.description && (
                        <p
                            style={{
                                fontSize: 13,
                                color: T.muted,
                                lineHeight: 1.6,
                                margin: "0 0 12px",
                            }}
                        >
                            {video.description}
                        </p>
                    )}
                    <div style={{ fontSize: 11, color: T.muted }}>
                        {date}
                        {date && video.views && " · "}
                        {video.views && `${video.views} views`}
                    </div>
                </div>
            </div>
        </Link>
    )
}
