import { AMBASSADORS } from "@/src/lib/data"
import { T } from "@/src/lib/tokens"
import Link from "next/link"

const AmbassadorsStrip = ({ title, tagline }: { title: string; tagline: string }) => {
    return (
        <section style={{ background: T.warm, padding: "64px 28px" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <p className="section-label">REPRESENTING THE KINGDOM</p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 8 }}
                    >
                        {title}
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                    <p style={{ fontSize: 14, color: T.muted }}>
                        {tagline}
                    </p>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: 12,
                        marginBottom: 28,
                    }}
                >
                    {AMBASSADORS.map((a, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                background: `${a.color}12`,
                                border: `2px solid ${a.color}33`,
                                borderRadius: 14,
                                padding: "22px 18px",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ fontSize: 44, marginBottom: 10 }}>{a.emoji}</div>
                            <div
                                style={{
                                    fontSize: 16,
                                    fontFamily: "'Cormorant Garamond',serif",
                                    color: T.ink,
                                    marginBottom: 3,
                                    fontWeight: 600,
                                }}
                            >
                                {a.name}
                            </div>
                            <div
                                style={{
                                    fontSize: 12,
                                    color: a.color,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                }}
                            >
                                {a.handle}
                            </div>
                            <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>
                                {a.city}
                            </div>
                            <p
                                style={{
                                    fontSize: 12,
                                    fontStyle: "italic",
                                    color: T.charcoal,
                                    margin: 0,
                                    lineHeight: 1.6,
                                }}
                            >
                                {a.quote}
                            </p>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center" }}>
                    <Link href="/ambassadors" className="btn-primary">
                        Join the Ambassador Family →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default AmbassadorsStrip
