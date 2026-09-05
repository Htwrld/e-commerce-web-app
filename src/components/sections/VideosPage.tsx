"use client"

import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Video } from "@/src/action/videoController"
import { VideoCard } from "@/src/components/cards/VideoCard"
import { LiveBadge } from "@/src/components/cards/LiveBadge"
import { useSearchParams } from "next/navigation"

export const VideosPage = ({ videos, pages }: { videos: Video[]; pages: number }) => {
    const searchParams = useSearchParams()
    const activePage = parseInt(searchParams.get("page") ?? "1")
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

    const [featured, ...rest] = videos

    return (
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 28px" }}>
            <div style={{ marginBottom: 32 }}>
                <p className="section-label">Media</p>
                <h1 className="section-title" style={{ fontSize: "clamp(30px,5vw,50px)" }}>
                    Recent Videos
                </h1>
                <div className="divider" />
                <p style={{ fontSize: 15, color: T.muted, maxWidth: 460 }}>
                    Watch our latest videos featuring new collections, styling tips, behind the scenes,
                    and inspiring stories.
                </p>
            </div>

            {videos.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                    <div
                        style={{
                            fontFamily: "'Georgia',serif",
                            fontSize: 20,
                            letterSpacing: 2,
                            color: T.ink,
                            marginBottom: 12,
                        }}
                    >
                        NOTHING PUBLISHED YET.
                    </div>
                    <div
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 18,
                            color: T.muted,
                            maxWidth: 420,
                            margin: "0 auto",
                        }}
                    >
                        Check back soon for new videos from HTW.
                    </div>
                </div>
            ) : (
                <>
                    {featured && (
                        <Link
                            href={`/videos/${featured.slug}`}
                            className="card block"
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    minHeight: 340,
                                    background: T.ink,
                                    marginBottom: 48,
                                    display: "flex",
                                    alignItems: "flex-end",
                                }}
                            >
                                {featured.thumbnail && (
                                    <Image
                                        src={featured.thumbnail}
                                        alt={featured.title}
                                        fill
                                        className="h-full w-full object-cover object-center static!"
                                        style={{ opacity: 0.8 }}
                                    />
                                )}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(90deg, rgba(26,22,18,0.85) 0%, rgba(26,22,18,0.35) 55%, rgba(26,22,18,0.15) 100%)",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.94)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 22,
                                            color: T.ink,
                                        }}
                                    >
                                        ▶
                                    </div>
                                </div>
                                <div style={{ position: "relative", padding: "32px 36px", maxWidth: 480 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                                        <div
                                            style={{
                                                display: "inline-block",
                                                fontSize: 10,
                                                color: T.ink,
                                                background: T.gold,
                                                letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                fontWeight: 700,
                                                padding: "5px 10px",
                                                borderRadius: 5,
                                            }}
                                        >
                                            Featured Video
                                        </div>
                                        {featured.isLive && <LiveBadge />}
                                    </div>
                                    <h2
                                        style={{
                                            fontFamily: "'Cormorant Garamond',serif",
                                            fontSize: "clamp(24px,3vw,32px)",
                                            fontWeight: 600,
                                            color: "#fff",
                                            lineHeight: 1.2,
                                            margin: "0 0 18px",
                                        }}
                                    >
                                        {featured.title}
                                    </h2>
                                    <span
                                        className="btn-primary"
                                        style={{ display: "inline-flex" }}
                                    >
                                        ▶ {featured.isLive ? "Watch Live" : "Watch Now"}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )}

                    {rest.length > 0 && (
                        <>
                            <h2 className="section-title" style={{ fontSize: 24, marginBottom: 20 }}>
                                Latest Videos
                            </h2>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                                    gap: 22,
                                }}
                            >
                                {rest.map((v) => (
                                    <VideoCard key={v.id} video={v} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}

            {pages > 1 && (
                <div className="flex w-full justify-center items-center gap-4" style={{ marginTop: 40 }}>
                    {activePage > 1 && (
                        <Link
                            href={`/videos?page=${activePage - 1}`}
                            className="btn-outline-gold"
                            style={{ padding: "9px 20px", fontSize: 13 }}
                        >
                            Prev
                        </Link>
                    )}
                    <div className="flex items-center gap-2">
                        {pageNumbers.map((n) => (
                            <Link
                                key={n}
                                href={`/videos?page=${n}`}
                                style={{
                                    width: 34,
                                    height: 34,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    background: n === activePage ? T.gold : "none",
                                    color: n === activePage ? T.white : T.muted,
                                    border: `1px solid ${n === activePage ? T.gold : T.border}`,
                                }}
                            >
                                {n}
                            </Link>
                        ))}
                    </div>
                    {activePage < pages && (
                        <Link
                            href={`/videos?page=${activePage + 1}`}
                            className="btn-outline-gold"
                            style={{ padding: "9px 20px", fontSize: 13 }}
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}

            <div
                style={{
                    marginTop: 56,
                    background: T.warm,
                    border: `1px solid ${T.border}`,
                    borderRadius: 16,
                    padding: "28px 32px",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 24,
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            background: T.rust,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 20,
                            flexShrink: 0,
                        }}
                    >
                        🔔
                    </div>
                    <div>
                        <div
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 22,
                                fontWeight: 600,
                                color: T.ink,
                            }}
                        >
                            Never Miss an Update
                        </div>
                        <div style={{ fontSize: 13, color: T.muted }}>
                            Subscribe to our YouTube channel and turn on notifications for new videos
                            every week.
                        </div>
                    </div>
                </div>
                <a href="#" className="btn-primary" style={{ textDecoration: "none" }}>
                    ▶ Subscribe on YouTube
                </a>
            </div>
        </div>
    )
}
