import { T } from "@/src/lib/tokens"
import { Dashicon } from '@wordpress/components'

interface TrustBarProps {
    icon: string
    title: string
    description: string
}

const TrustBar = ({ trustBar }: { trustBar: TrustBarProps[] }) => {
    return (
        <section style={{ background: T.ink, padding: "28px 24px" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                <p
                    style={{
                        textAlign: "center",
                        fontSize: 10,
                        letterSpacing: "0.22em",
                        color: T.gold,
                        fontWeight: 700,
                        marginBottom: 16,
                        textTransform: "uppercase",
                    }}
                >
                    Why Shop With HTW
                </p>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
                        gap: 12,
                    }}
                >
                    {trustBar.map(({ icon, title, description }, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                padding: "12px 16px",
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: 8,
                                border: "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            <span style={{ fontSize: 22, flexShrink: 0 }}>
                                <Dashicon icon={icon as any} />
                            </span>
                            <div>
                                <div
                                    style={{
                                        fontSize: 12,
                                        fontWeight: 700,
                                        color: "#FFF",
                                        letterSpacing: "0.03em",
                                    }}
                                >
                                    {title}
                                </div>
                                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                                    {description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TrustBar
