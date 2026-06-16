import { Ambassador } from "@/src/action/ambassadorController"
import { T } from "@/src/lib/tokens"
import Image from "next/image"
import Link from "next/link"

const AmbassadorsStrip = ({
    title,
    tagline,
    ambassadors,
}: {
    title: string
    tagline: string
    ambassadors: Ambassador[]
}) => {
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
                    <p style={{ fontSize: 14, color: T.muted }}>{tagline}</p>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                        gap: 12,
                        marginBottom: 28,
                    }}
                >
                    {ambassadors.slice(0, 4).map((a, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                background: `${a.color}12`,
                                border: `2px solid ${a.color}33`,
                                borderRadius: 14,
                                padding: "22px 18px",
                            }}
                        >
                            <div className="h-12 w-12 overflow-hidden rounded-sm border p-1">
                                <Image
                                    src={a.photo}
                                    alt={a.name}
                                    height={120}
                                    width={120}
                                    className="h-full w-full rounded-sm object-cover object-center"
                                />
                            </div>
                            <h3
                                className="text-start"
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    color: T.ink,
                                    marginBottom: 2,
                                }}
                            >
                                {a.name}
                            </h3>
                            <div className="flex items-center justify-between">
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: a.color,
                                        fontWeight: 700,
                                        marginBottom: 4,
                                    }}
                                >
                                    @{a.social_handle}
                                </div>
                                <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>
                                    {a.city}
                                </div>
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
