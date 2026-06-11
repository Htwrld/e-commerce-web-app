import { WHY_HTW } from "@/src/lib/data"
import { T } from "@/src/lib/tokens"

const WhyHTW = () => {
    return (
        <section style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <p className="section-label">OUR DIFFERENCE</p>
                <h2
                    className="section-title"
                    style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: 8 }}
                >
                    Why Hope&rsquo;s Trendy World?
                </h2>
                <div className="divider" style={{ margin: "14px auto" }} />
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
                    gap: 20,
                }}
            >
                {WHY_HTW.map((w, i) => (
                    <div
                        key={i}
                        className="card"
                        style={{
                            background: T.white,
                            border: `1px solid ${T.border}`,
                            borderRadius: 14,
                            padding: "28px 24px",
                            textAlign: "center",
                        }}
                    >
                        <div style={{ fontSize: 42, marginBottom: 14 }}>{w.icon}</div>
                        <h3
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 20,
                                fontWeight: 600,
                                margin: "0 0 10px",
                                color: T.ink,
                            }}
                        >
                            {w.title}
                        </h3>
                        <p
                            style={{
                                fontSize: 14,
                                color: T.muted,
                                lineHeight: 1.75,
                                margin: 0,
                            }}
                        >
                            {w.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WhyHTW
