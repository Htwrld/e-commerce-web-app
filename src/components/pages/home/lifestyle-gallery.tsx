import { T } from "@/src/lib/tokens"
import Image from "next/image"

const LIFESTYLE_SHOTS = [
    {
        img: "/images/hoodie_lifestyle.png",
        label: "Street Style",
        tag: "@tunde.w — London",
        col: T.ink,
    },
    {
        img: "/images/tee_walkbyfaith.png",
        label: "Walk By Faith",
        tag: "@emeka.t — Abuja",
        col: "#1A1612",
    },
    {
        img: "/images/tee_she.png",
        label: "She Prays. She Wins.",
        tag: "@chisom.b — Port Harcourt",
        col: "#7BA8C9",
    },
    {
        img: "/images/polo_twopiece.jpg",
        label: "Kingdom Living",
        tag: "@adaeze.k — Lagos",
        col: T.gold,
    },
    {
        img: "/images/twopiece_black.jpg",
        label: "Prestige Set",
        tag: "@pastor_c — Enugu",
        col: "#1A1612",
    },
    {
        img: "/images/hoodie_mockup.jpg",
        label: "Trust God Bro",
        tag: "@blessing.a — Lagos",
        col: T.ink,
    },
]

const LifestyleGallery = ({
    title,
    description,
    hashtag,
}: {
    title: string
    description: string
    hashtag: string
}) => {
    return (
        <section style={{ background: T.sand, padding: "80px 28px" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <p className="section-label">STYLED BY THE COMMUNITY</p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 10 }}
                    >
                        {title}
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                    <p
                        style={{
                            fontSize: 14,
                            color: T.muted,
                            maxWidth: 520,
                            margin: "0 auto",
                        }}
                    >
                        {description}
                    </p>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
                        gap: 10,
                        marginBottom: 24,
                    }}
                >
                    {LIFESTYLE_SHOTS.map((shot, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                borderRadius: 12,
                                overflow: "hidden",
                                position: "relative",
                                aspectRatio: "3/4",
                                background: shot.col,
                            }}
                        >
                            <Image
                                src={shot.img}
                                alt={shot.label}
                                fill
                                style={{ objectFit: "cover", objectPosition: "center top" }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "linear-gradient(transparent 40%,rgba(0,0,0,0.8))",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    padding: 12,
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#fff",
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {shot.label}
                                </div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "rgba(255,255,255,0.65)",
                                        marginTop: 2,
                                    }}
                                >
                                    {shot.tag}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, color: T.muted, marginBottom: 6 }}>
                        Share your HTW look and get featured:
                    </div>
                    <div
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 26,
                            color: T.rust,
                            fontWeight: 700,
                            marginBottom: 16,
                        }}
                    >
                        #{hashtag}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <a
                            href="#"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                background:
                                    "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                                color: "#fff",
                                padding: "9px 20px",
                                borderRadius: 8,
                                textDecoration: "none",
                                fontSize: 13,
                                fontWeight: 700,
                            }}
                        >
                            📸 Instagram
                        </a>
                        <a
                            href="#"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                background: "#000",
                                color: "#fff",
                                padding: "9px 20px",
                                borderRadius: 8,
                                textDecoration: "none",
                                fontSize: 13,
                                fontWeight: 700,
                            }}
                        >
                            🎵 TikTok
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LifestyleGallery
