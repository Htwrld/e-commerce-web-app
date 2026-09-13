"use client"

import { useEffect, useState } from "react"
import { T } from "@/src/lib/tokens"
import { addComment, Comment, getComments } from "@/src/action/commentController"
import { FaSpinner } from "react-icons/fa"

const inputStyle: React.CSSProperties = {
    background: T.white,
    border: `1.5px solid ${T.border}`,
    color: T.ink,
    padding: "10px 14px",
    fontSize: 14,
    borderRadius: 7,
}

export const CommentsSection = ({ postId }: { postId: number }) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [content, setContent] = useState("")
    const [notRobot, setNotRobot] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")
    const [notice, setNotice] = useState("")

    useEffect(() => {
        let active = true
        setLoading(true)
        getComments(postId).then((c) => {
            if (active) {
                setComments(c)
                setLoading(false)
            }
        })
        return () => {
            active = false
        }
    }, [postId])

    const onSubmit = async () => {
        setError("")
        setNotice("")
        if (!notRobot) {
            setError("Please confirm you're not a robot.")
            return
        }

        setSubmitting(true)
        const result = await addComment({ postId, name, email, content, verifiedHuman: notRobot })
        setSubmitting(false)

        if (!result.success) {
            setError(result.error ?? "Could not post comment.")
            return
        }

        if (result.pending) {
            setNotice("Thanks! Your comment is awaiting moderation.")
        } else if (result.comment) {
            setComments((prev) => [...prev, result.comment!])
        }
        setName("")
        setEmail("")
        setContent("")
        setNotRobot(false)
    }

    return (
        <section style={{ marginTop: 40 }}>
            <h2 className="section-title" style={{ fontSize: 24, marginBottom: 20 }}>
                Comments{comments.length > 0 && ` (${comments.length})`}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                {loading ? (
                    <p style={{ fontSize: 13, color: T.muted }}>Loading comments…</p>
                ) : comments.length === 0 ? (
                    <p style={{ fontSize: 13, color: T.muted }}>Be the first to comment.</p>
                ) : (
                    comments.map((c) => (
                        <div key={c.id} style={{ display: "flex", gap: 12 }}>
                            <div
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    background: T.warm,
                                    flexShrink: 0,
                                }}
                            >
                                {c.avatar && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={c.avatar} alt={c.author} width={40} height={40} />
                                )}
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                    background: T.white,
                                    border: `1px solid ${T.border}`,
                                    borderRadius: 10,
                                    padding: "12px 14px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 10,
                                        marginBottom: 4,
                                    }}
                                >
                                    <span style={{ fontWeight: 700, fontSize: 13, color: T.ink }}>
                                        {c.author}
                                    </span>
                                    <span style={{ fontSize: 11, color: T.muted, flexShrink: 0 }}>
                                        {c.date &&
                                            new Date(c.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                    </span>
                                </div>
                                <p style={{ fontSize: 14, color: T.charcoal, lineHeight: 1.6, margin: 0 }}>
                                    {c.content}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div
                style={{
                    background: T.warm,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    padding: 20,
                }}
            >
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 20,
                        fontWeight: 600,
                        marginBottom: 14,
                    }}
                >
                    Leave a Comment
                </h3>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                    <input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ ...inputStyle, flex: "1 1 200px" }}
                    />
                    <input
                        placeholder="Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ ...inputStyle, flex: "1 1 200px" }}
                    />
                </div>
                <textarea
                    placeholder="Write your comment…"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{ ...inputStyle, width: "100%", resize: "vertical", marginBottom: 12 }}
                />
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        color: T.charcoal,
                        marginBottom: 14,
                        cursor: "pointer",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={notRobot}
                        onChange={(e) => setNotRobot(e.target.checked)}
                    />
                    I&rsquo;m not a robot
                </label>
                {error && <p style={{ color: T.rust, fontSize: 13, marginBottom: 10 }}>{error}</p>}
                {notice && <p style={{ color: T.sage, fontSize: 13, marginBottom: 10 }}>{notice}</p>}
                <button
                    className="btn-primary"
                    disabled={submitting || !notRobot}
                    onClick={onSubmit}
                    style={{
                        justifyContent: "center",
                        opacity: !notRobot ? 0.5 : 1,
                        cursor: !notRobot ? "not-allowed" : "pointer",
                    }}
                >
                    {submitting && <FaSpinner className="animate-spin" />} Post Comment
                </button>
            </div>
        </section>
    )
}
