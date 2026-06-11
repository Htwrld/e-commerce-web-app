import { T } from "@/src/lib/tokens"
import { Stars } from "../../cards/Stars"
import { TESTIMONIALS } from "@/src/lib/data"

const Testimonials = ({title}: {title: string}) => {
    return (
        <section style={{ background: T.white, padding: "80px 28px" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 44 }}>
                    <p className="section-label">SOCIAL PROOF</p>
                    <h2
                        className="section-title"
                        style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 8 }}
                    >
                        {title}
                    </h2>
                    <div className="divider" style={{ margin: "14px auto" }} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                        gap: 16,
                        marginBottom: 48,
                    }}
                >
                    {TESTIMONIALS.map((t, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                background: T.warm,
                                border: `1px solid ${T.border}`,
                                borderRadius: 14,
                                padding: "24px 22px",
                            }}
                        >
                            <Stars n={t.stars} />
                            <p
                                style={{
                                    fontFamily: "'EB Garamond',serif",
                                    fontSize: 16,
                                    fontStyle: "italic",
                                    color: T.charcoal,
                                    lineHeight: 1.8,
                                    margin: "12px 0 16px",
                                }}
                            >
                                &ldquo;{t.text}&rdquo;
                            </p>
                            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>
                                {t.name}
                            </div>
                            <div style={{ fontSize: 12, color: T.muted }}>{t.city}</div>
                        </div>
                    ))}
                </div>

                {/* Community posts */}
                <div style={{ textAlign: "center", margin: "56px 0 28px" }}>
                    <p className="section-label">COMMUNITY POSTS</p>
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: "clamp(22px,3vw,32px)",
                            fontWeight: 400,
                            color: T.ink,
                            margin: "0 0 8px",
                        }}
                    >
                        #WearHopeLiveBold
                    </h3>
                    <div className="divider" style={{ margin: "12px auto 0" }} />
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                        gap: 10,
                    }}
                >
                    {[
                        {
                            e: "🤩",
                            n: "Blessing A.",
                            c: "Wore the Royal Cord set to Easter service — 40 compliments 🙏",
                            h: 312,
                            col: T.rust,
                        },
                        {
                            e: "🥰",
                            n: "Ngozi E.",
                            c: "HTW puts a verse on every piece. I cry every time I read them 💛",
                            h: 204,
                            col: T.gold,
                        },
                        {
                            e: "✨",
                            n: "Femi J.",
                            c: "Arrived in 2 days to the UK! Quality is insane for the price",
                            h: 187,
                            col: T.sage,
                        },
                        {
                            e: "👑",
                            n: "Amara O.",
                            c: "The Crowned Sweatshirt is giving EXACTLY what it's supposed to give",
                            h: 445,
                            col: T.cobalt,
                        },
                        {
                            e: "🙌🏾",
                            n: "Pastor C.",
                            c: "My whole family wore HTW sets for Christmas. Best decision!",
                            h: 289,
                            col: T.gold,
                        },
                        {
                            e: "🔥",
                            n: "Temi R.",
                            c: "The He Wore It First Zip Hoodie had the whole church talking",
                            h: 521,
                            col: T.rust,
                        },
                    ].map((post, i) => (
                        <div
                            key={i}
                            className="card"
                            style={{
                                background: T.cream,
                                border: `1px solid ${T.border}`,
                                borderRadius: 12,
                                padding: 14,
                                borderTop: `3px solid ${post.col}`,
                            }}
                        >
                            <div style={{ fontSize: 32, marginBottom: 8 }}>{post.e}</div>
                            <div
                                style={{
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: T.ink,
                                    marginBottom: 4,
                                }}
                            >
                                {post.n}
                            </div>
                            <p
                                style={{
                                    fontSize: 12,
                                    color: T.muted,
                                    lineHeight: 1.6,
                                    margin: "0 0 8px",
                                }}
                            >
                                {post.c}
                            </p>
                            <div style={{ fontSize: 11, color: post.col, fontWeight: 700 }}>
                                ❤ {post.h}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
