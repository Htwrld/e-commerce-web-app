"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import type { FashionPageContent } from "@/src/action/pageController"
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa"

export const MagazineReader = ({ pageContent }: { pageContent?: FashionPageContent }) => {
    const magazineUrl = pageContent?.magazine_download_url
    const magazineTitle = pageContent?.magazine_title || "HTW Fashion Magazine"
    const magazineCoverImage = pageContent?.magazine_cover_image || "/images/hoodie_lifestyle.png"
    const [loaded, setLoaded] = useState(false)

    return (
        <div style={{ background: T.ink, minHeight: "100vh" }}>
            <style>{`@keyframes magazine-spin{to{transform:rotate(360deg)}}`}</style>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "16px 20px",
                    background: T.charcoal,
                    borderBottom: `1px solid ${T.border}33`,
                    flexWrap: "wrap",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                    <Link
                        href="/fashion"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            color: T.white,
                            fontSize: 13,
                            fontWeight: 700,
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        <FaArrowLeft /> Back
                    </Link>
                    <div style={{ width: 1, height: 24, background: `${T.border}33`, flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                        <p
                            style={{
                                fontSize: 10,
                                letterSpacing: "0.1em",
                                color: T.goldLt,
                                margin: 0,
                                textTransform: "uppercase",
                            }}
                        >
                            HTW Fashion Magazine
                        </p>
                        <h1
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 18,
                                fontWeight: 700,
                                color: T.white,
                                margin: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "60vw",
                            }}
                        >
                            {magazineTitle}
                        </h1>
                    </div>
                </div>

                {magazineUrl && (
                    <a
                        href={magazineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 12,
                            fontWeight: 700,
                            color: T.goldLt,
                            textDecoration: "none",
                            flexShrink: 0,
                        }}
                    >
                        Open in New Tab <FaExternalLinkAlt size={11} />
                    </a>
                )}
            </div>

            {magazineUrl ? (
                <div style={{ position: "relative", height: "calc(100vh - 65px)" }}>
                    {!loaded && (
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 14,
                                color: T.white,
                            }}
                        >
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    border: `3px solid ${T.border}33`,
                                    borderTopColor: T.gold,
                                    animation: "magazine-spin 0.9s linear infinite",
                                }}
                            />
                            <p style={{ fontSize: 13, color: T.muted }}>Loading the magazine&hellip;</p>
                        </div>
                    )}
                    <iframe
                        src={`${magazineUrl}#toolbar=1&view=FitH`}
                        title={magazineTitle}
                        onLoad={() => setLoaded(true)}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            opacity: loaded ? 1 : 0,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                </div>
            ) : (
                <div
                    style={{
                        minHeight: "calc(100vh - 65px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 16,
                        padding: 40,
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: 160,
                            aspectRatio: "3/4",
                            borderRadius: 8,
                            overflow: "hidden",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
                        }}
                    >
                        <Image src={magazineCoverImage} alt={magazineTitle} fill style={{ objectFit: "cover" }} />
                    </div>
                    <p style={{ color: T.white, fontSize: 15, maxWidth: 360, lineHeight: 1.7 }}>
                        This issue isn&rsquo;t available to read online just yet. Please check back soon.
                    </p>
                    <Link className="btn-primary" href="/fashion" style={{ fontSize: 13, padding: "12px 24px" }}>
                        Back to Fashion
                    </Link>
                </div>
            )}
        </div>
    )
}
