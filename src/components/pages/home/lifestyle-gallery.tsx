import { Style } from "@/src/action/styleController"
import { T } from "@/src/lib/tokens"
import Image from "next/image"
import { FaFacebook, FaInstagram } from "react-icons/fa"

const LifestyleGallery = ({
    title,
    description,
    hashtag,
    styles,
    facebookLink,
    instagramLink,
}: {
    title: string
    description: string
    hashtag: string
    facebookLink: string
    instagramLink: string
    styles: Style[]
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
                    {styles.map((shot, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                borderRadius: 12,
                                overflow: "hidden",
                                position: "relative",
                                aspectRatio: "3/4",
                                background: shot.color,
                            }}
                        >
                            <Image
                                src={shot.image}
                                alt={shot.title}
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
                                    {shot.title}
                                </div>
                                <div
                                    style={{
                                        fontSize: 11,
                                        color: "rgba(255,255,255,0.65)",
                                        marginTop: 2,
                                    }}
                                >
                                    {`${shot.handle} — ${shot.city}`}
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
                            href={facebookLink ?? 'https://www.facebook.com/61579532297521/'}
                            target="_blank"
                            className="flex items-center gap-2 rounded-md bg-linear-to-r from-blue-800 to-blue-700 px-4 py-2 text-white"
                        >
                            <FaFacebook style={{ fontSize: 20 }} /> Facebook
                        </a>
                        <a
                            href={instagramLink ?? 'https://www.instagram.com/hopestrendyworld/'}
                            target="_blank"
                            className="flex items-center gap-2 rounded-md bg-linear-to-r from-amber-700 to-amber-800 px-4 py-2 text-white"
                        >
                            <FaInstagram style={{ fontSize: 20 }} /> Instagram
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LifestyleGallery
