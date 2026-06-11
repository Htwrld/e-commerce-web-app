import { T } from "@/src/lib/tokens"

const BrandSection = () => {
    return (
        <section style={{ background: T.white, padding: "72px 28px", textAlign: "center" }}>
            <div style={{ maxWidth: 780, margin: "0 auto" }}>
                <p className="section-label" style={{ textAlign: "center" }}>
                    OUR MISSION
                </p>
                <h2
                    className="section-title"
                    style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 16 }}
                >
                    Fashion with Purpose
                </h2>
                <div className="divider" style={{ margin: "14px auto 24px" }} />
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(18px,3vw,26px)",
                        fontStyle: "italic",
                        color: T.charcoal,
                        lineHeight: 1.75,
                        marginBottom: 20,
                    }}
                >
                    What you wear should say something — before you even speak.
                </p>
                <p
                    style={{
                        fontSize: "clamp(14px,2vw,17px)",
                        color: T.muted,
                        lineHeight: 1.9,
                        marginBottom: 32,
                        maxWidth: 640,
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    At Hope&rsquo;s Trendy World, we create more than clothing. We create pieces
                    that reflect identity, ignite confidence, and carry a message of faith into
                    everyday life.
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 40,
                        flexWrap: "wrap",
                    }}
                >
                    {[
                        ["500+", "Happy Customers"],
                        ["12+", "Pieces in Store"],
                        ["4", "Seasonal Drops"],
                        ["100%", "Faith-Driven"],
                    ].map(([num, lbl]) => (
                        <div key={lbl} style={{ textAlign: "center" }}>
                            <div
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: "clamp(28px,5vw,44px)",
                                    fontWeight: 700,
                                    color: T.rust,
                                }}
                            >
                                {num}
                            </div>
                            <div
                                style={{
                                    fontSize: 11,
                                    color: T.muted,
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    marginTop: 2,
                                }}
                            >
                                {lbl}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default BrandSection
