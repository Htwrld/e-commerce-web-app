"use client"

import { useEffect, useState } from "react"
import { T } from "@/src/lib/tokens"
import { FaExclamationCircle } from "react-icons/fa"
import { TrackedOrder, trackOrder } from "@/src/action/orderController"

// The happy path a paid order moves through; shown as a progress bar.
const STEPS = [
    { status: "processing", label: "Paid" },
    { status: "shipped", label: "Out for delivery" },
    { status: "completed", label: "Delivered" },
]

const TrackOrderPage = ({
    initialOrder,
    initialEmail,
}: {
    initialOrder: string
    initialEmail: string
}) => {
    const [orderId, setOrderId] = useState(initialOrder)
    const [email, setEmail] = useState(initialEmail)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [order, setOrder] = useState<TrackedOrder | null>(null)

    const lookup = async (id: string, mail: string) => {
        setLoading(true)
        setError("")
        setOrder(null)
        const result = await trackOrder(Number(id.replace(/[^\d]/g, "")), mail)
        if (result.ok) setOrder(result.order)
        else setError(result.error)
        setLoading(false)
    }

    useEffect(() => {
        if (initialOrder && initialEmail) lookup(initialOrder, initialEmail)
    }, [initialOrder, initialEmail])

    const stepIndex = order ? STEPS.findIndex((s) => s.status === order.status) : -1

    const inputStyle = {
        width: "100%",
        background: T.warm,
        border: `1.5px solid ${T.border}`,
        color: T.ink,
        padding: "12px 16px",
        fontSize: 14,
        borderRadius: 8,
    }
    const labelStyle = {
        fontSize: 12,
        color: T.gold,
        fontWeight: 700,
        letterSpacing: "0.07em",
        display: "block",
        marginBottom: 5,
    }

    return (
        <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 28px" }}>
            <div style={{ marginBottom: 32 }}>
                <p className="section-label">ORDERS</p>
                <h1 className="section-title" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
                    Track Your Order
                </h1>
                <div className="divider" />
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    lookup(orderId, email)
                }}
                style={{
                    background: T.white,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    padding: "28px 24px",
                    marginBottom: 28,
                }}
            >
                {error && (
                    <div className="mb-5 flex items-center gap-2 rounded-md border border-amber-600 bg-red-300 p-3">
                        <FaExclamationCircle className="text-amber-900" />
                        <p className="text-sm text-amber-900">{error}</p>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label style={labelStyle}>Order Number</label>
                        <input
                            required
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="e.g. 1042"
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Email</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="The email you ordered with"
                            style={inputStyle}
                        />
                    </div>
                </div>
                <button
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", marginTop: 20 }}
                    disabled={loading}
                >
                    {loading ? "Looking up…" : "Track Order →"}
                </button>
            </form>

            {order && (
                <div
                    style={{
                        background: T.white,
                        border: `1px solid ${T.border}`,
                        borderRadius: 14,
                        padding: "28px 24px",
                    }}
                >
                    <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                        <h2
                            style={{
                                fontFamily: "'Cormorant Garamond',serif",
                                fontSize: 24,
                                fontWeight: 600,
                            }}
                        >
                            Order #{order.id}
                        </h2>
                        <span style={{ fontSize: 13, color: T.muted }}>
                            {new Date(order.date).toLocaleDateString("en-NG", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <p style={{ fontSize: 13, color: T.muted, marginBottom: 6 }}>Status</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: T.rust, marginBottom: 20 }}>
                        {order.statusLabel}
                    </p>

                    {stepIndex >= 0 && (
                        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
                            {STEPS.map((s, i) => (
                                <div key={s.status} style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            height: 6,
                                            borderRadius: 3,
                                            background: i <= stepIndex ? T.sage : T.border,
                                            marginBottom: 6,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: 11,
                                            fontWeight: 700,
                                            letterSpacing: "0.06em",
                                            color: i <= stepIndex ? T.sage : T.muted,
                                        }}
                                    >
                                        {s.label.toUpperCase()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {order.notes.length > 0 && (
                        <div className="mb-6 space-y-3">
                            {order.notes.map((n, i) => (
                                <div
                                    key={i}
                                    className="rounded-md border border-teal-200 p-3 text-sm text-slate-600"
                                >
                                    <p className="mb-1 text-xs text-slate-400">
                                        {new Date(n.date).toLocaleString("en-NG")}
                                    </p>
                                    <p>{n.note}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {order.items.map((item, i) => (
                        <div
                            key={i}
                            className="flex justify-between gap-4"
                            style={{
                                paddingBottom: 12,
                                marginBottom: 12,
                                borderBottom: `1px solid ${T.sand}`,
                            }}
                        >
                            <div>
                                <p style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>
                                    {item.name} × {item.qty}
                                </p>
                                {item.options && (
                                    <p className="text-xs text-slate-400">{item.options}</p>
                                )}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 700 }}>
                                ₦{Number(item.total).toLocaleString()}
                            </span>
                        </div>
                    ))}
                    <div className="flex justify-between" style={{ fontSize: 13, marginBottom: 6 }}>
                        <span style={{ color: T.muted }}>Delivery — {order.location}</span>
                        <span>₦{Number(order.deliveryFee).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: 16, fontWeight: 700 }}>
                        <span>Total</span>
                        <span style={{ color: T.rust }}>₦{Number(order.total).toLocaleString()}</span>
                    </div>
                </div>
            )}
        </section>
    )
}

export { TrackOrderPage }
