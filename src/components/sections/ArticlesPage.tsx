"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Article } from "@/src/action/articleController"
import { ArticleCard } from "@/src/components/cards/ArticleCard"
import { useSearchParams } from "next/navigation"
import { sendMail } from "@/src/action/mailController"

export const ArticlesPage = ({ articles, pages }: { articles: Article[]; pages: number }) => {
    const searchParams = useSearchParams()
    const activePage = parseInt(searchParams.get("page") ?? "1")
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)

    const [featured, ...rest] = articles
    const featuredDate = featured?.date
        ? new Date(featured.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : ""

    return (
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 28px" }}>
            <div style={{ marginBottom: 32 }}>
                <p className="section-label">Blog</p>
                <h1 className="section-title" style={{ fontSize: "clamp(30px,5vw,50px)" }}>
                    Recent Posts
                </h1>
                <div className="divider" />
                <p style={{ fontSize: 15, color: T.muted, maxWidth: 460 }}>
                    Style tips, fashion inspiration, and stories that empower you to live bold and dress
                    with purpose.
                </p>
            </div>

            {articles.length === 0 ? (
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
                        Check back soon for new stories from the HTW journal.
                    </div>
                </div>
            ) : (
                <>
                    {featured && (
                        <div
                            className="card"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 0,
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 16,
                                overflow: "hidden",
                                marginBottom: 48,
                            }}
                        >
                            <div
                                style={{
                                    padding: "40px 36px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: 10,
                                        color: T.rust,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        fontWeight: 700,
                                        marginBottom: 12,
                                    }}
                                >
                                    Featured Post
                                </div>
                                <h2
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: "clamp(24px,3vw,32px)",
                                        fontWeight: 600,
                                        color: T.ink,
                                        lineHeight: 1.2,
                                        margin: "0 0 14px",
                                    }}
                                >
                                    {featured.title}
                                </h2>
                                <p
                                    style={{
                                        fontSize: 14,
                                        color: T.muted,
                                        lineHeight: 1.7,
                                        margin: "0 0 22px",
                                    }}
                                >
                                    {featured.excerpt}
                                </p>
                                <Link
                                    href={`/articles/${featured.slug}`}
                                    className="btn-primary"
                                    style={{ alignSelf: "flex-start", marginBottom: 18 }}
                                >
                                    Read Full Post →
                                </Link>
                                <div style={{ fontSize: 12, color: T.muted }}>
                                    {featuredDate}
                                    {featuredDate && " · "}
                                    {featured.readTime} min read
                                </div>
                            </div>
                            <div style={{ position: "relative", minHeight: 320, background: T.warm }}>
                                {featured.image ? (
                                    <Image
                                        src={featured.image}
                                        alt={featured.title}
                                        fill
                                        className="h-full w-full object-cover object-center static!"
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 64,
                                        }}
                                    >
                                        📰
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {rest.length > 0 && (
                        <>
                            <h2 className="section-title" style={{ fontSize: 24, marginBottom: 20 }}>
                                Latest Posts
                            </h2>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                                    gap: 22,
                                }}
                            >
                                {rest.map((a) => (
                                    <ArticleCard key={a.id} article={a} />
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}

            {pages > 1 && (
                <div
                    className="flex w-full justify-center items-center gap-4"
                    style={{ marginTop: 40 }}
                >
                    {activePage > 1 && (
                        <Link
                            href={`/articles?page=${activePage - 1}`}
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
                                href={`/articles?page=${n}`}
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
                            href={`/articles?page=${activePage + 1}`}
                            className="btn-outline-gold"
                            style={{ padding: "9px 20px", fontSize: 13 }}
                        >
                            Next
                        </Link>
                    )}
                </div>
            )}

            <ArticlesNewsletterBox />
        </div>
    )
}

const ArticlesNewsletterBox = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)

    const onSubscribe = async () => {
        if (!email) return
        try {
            setLoading(true)
            await sendMail({
                to: "host",
                subject: "New HTW blog subscriber",
                body: `Please subscribe this email to the HTW blog newsletter: ${email}.`,
                replyTo: email,
                name: "",
            })
            setDone(true)
            setEmail("")
        } catch (e) {
            return
        } finally {
            setLoading(false)
        }
    }

    return (
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
                    ✉️
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
                        Stay Inspired
                    </div>
                    <div style={{ fontSize: 13, color: T.muted }}>
                        Get style tips, new arrivals, and exclusive offers straight to your inbox.
                    </div>
                </div>
            </div>
            {done ? (
                <div style={{ fontSize: 14, color: T.sage, fontWeight: 700 }}>
                    ✓ You&rsquo;re subscribed!
                </div>
            ) : (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            padding: "11px 16px",
                            borderRadius: 8,
                            border: `1px solid ${T.border}`,
                            fontSize: 13,
                            minWidth: 220,
                            background: T.white,
                        }}
                    />
                    <button
                        onClick={onSubscribe}
                        disabled={loading}
                        className="btn-primary"
                        style={{ border: "none", cursor: loading ? "wait" : "pointer" }}
                    >
                        {loading ? "…" : "Subscribe"}
                    </button>
                </div>
            )}
        </div>
    )
}
