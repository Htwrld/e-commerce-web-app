"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { Location } from "@/src/action/productController"
import { FaExclamationCircle } from "react-icons/fa"
import { createOrder, resumePayment } from "@/src/action/orderController"
import {
    PAYMENT_CHANNEL,
    PaymentMessage,
    openPaymentWindow,
    waitForPayment,
} from "@/src/lib/payment-window"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const CheckoutPage = ({ locations }: { locations: Location[] }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fees, setFees] = useState(locations[0]?.fees ?? 0)
    const [locationId, setLocationId] = useState(locations[0]?.id ?? 0)
    const { cart, cartTotal, removeFromCart, setToast } = useCart()
    const [step, setStep] = useState(1)
    const router = useRouter()
    const [waiting, setWaiting] = useState(false)
    const cancelPayment = useRef<() => void>(() => {})
    // An order that was created but not paid, so trying again pays for it
    // instead of creating a duplicate. Dropped if the cart changes.
    const [unpaidOrder, setUnpaidOrder] = useState<{ id: number; key: string } | null>(null)
    useEffect(() => setUnpaidOrder(null), [cart])

    const onPaid = (order: { id: number; key: string }) => {
        cart.forEach((c) =>
            removeFromCart({ id: c.id, color: c.selectedColor, size: c.selectedSize })
        )
        router.push(`/checkout/complete?order=${order.id}&key=${order.key}`)
    }

    // A late "paid" after we stopped waiting, e.g. the browser reported the
    // payment window closed while it was still open.
    useEffect(() => {
        if (!unpaidOrder || waiting) return
        const channel = new BroadcastChannel(PAYMENT_CHANNEL)
        channel.onmessage = (e: MessageEvent<PaymentMessage>) => {
            if (e.data?.orderId === unpaidOrder.id && e.data.paid) onPaid(unpaidOrder)
        }
        return () => channel.close()
    })
    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        email: "",
    })

    const DELIVERY_FIELDS = [
        {
            k: "name",
            l: "Full Name",
            p: "Your full name",
            t: "text",
        },
        {
            k: "email",
            l: "Email",
            p: "Your email address",
            t: "email",
        },
        {
            k: "address",
            l: "Delivery Address",
            p: "Street, City, State",
            t: "text",
        },
        {
            k: "phone",
            l: "Phone Number",
            p: "+234 000 000 0000",
            t: "tel",
        },
    ] as const

    const onPay = async () => {
        // Opened before any await so the popup blocker allows it.
        const win = openPaymentWindow()
        try {
            setLoading(true)
            setError("")

            const result = unpaidOrder
                ? await resumePayment(unpaidOrder.id, unpaidOrder.key, !!win)
                : await createOrder({
                      customer: form,
                      locationId,
                      popup: !!win,
                      items: cart.map((c) => ({
                          id: c.id,
                          qty: c.qty,
                          color: c.selectedColor,
                          size: c.selectedSize,
                      })),
                  })
            if (!result.ok) {
                win?.close()
                setError(result.error)
                setLoading(false)
                return
            }

            // Popup blocked: fall back to paying in this tab.
            if (!win) {
                window.location.href = result.paymentLink
                return
            }

            setUnpaidOrder({ id: result.orderId, key: result.orderKey })
            win.location.href = result.paymentLink
            win.focus()

            setWaiting(true)
            const payment = waitForPayment(win, result.orderId, result.orderKey)
            cancelPayment.current = payment.cancel
            const { paid } = await payment.result
            setWaiting(false)

            if (!paid) {
                setError("Payment wasn't completed. Your order is saved — you can try again.")
                setLoading(false)
                return
            }

            onPaid({ id: result.orderId, key: result.orderKey })
        } catch (err) {
            win?.close()
            setWaiting(false)
            setError("Something went wrong! Please try again later.")
            setLoading(false)
        }
    }

    return (
        <div>
            <section style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 28px" }}>
                <div style={{ marginBottom: 32 }}>
                    <p className="section-label">CHECKOUT</p>
                    <h1 className="section-title" style={{ fontSize: "clamp(26px,4vw,40px)" }}>
                        Complete Your Order
                    </h1>
                    <div className="divider" />
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-[2fr_1fr] md:gap-y-24">
                    <div className="rounded-2xl border pt-4">
                        {/* Steps */}
                        <div style={{ display: "flex", gap: 0, marginBottom: 36 }}>
                            {["Delivery Details", "Payment", "Confirmation"].map((s, i) => (
                                <div
                                    key={s}
                                    style={{ flex: 1, textAlign: "center", position: "relative" }}
                                >
                                    <div
                                        style={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: "50%",
                                            background:
                                                step > i
                                                    ? T.sage
                                                    : step === i + 1
                                                      ? T.gold
                                                      : T.border,
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 14,
                                            fontWeight: 700,
                                            margin: "0 auto 6px",
                                        }}
                                    >
                                        {step > i ? "✓" : i + 1}
                                    </div>
                                    <div
                                        style={{
                                            fontSize: 11,
                                            color:
                                                step === i + 1
                                                    ? T.gold
                                                    : step > i
                                                      ? T.sage
                                                      : T.muted,
                                            fontWeight: 700,
                                            letterSpacing: "0.06em",
                                        }}
                                    >
                                        {s.toUpperCase()}
                                    </div>
                                    {i < 2 && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 16,
                                                left: "50%",
                                                right: 0,
                                                height: 2,
                                                background: step > i + 1 ? T.sage : T.border,
                                                zIndex: -1,
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* Step 1: Delivery */}
                        {step === 1 && (
                            <div
                                style={{
                                    background: T.white,
                                    border: `1px solid ${T.border}`,
                                    borderRadius: 14,
                                    padding: "28px 24px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: 22,
                                        fontWeight: 600,
                                        marginBottom: 20,
                                    }}
                                >
                                    Delivery Details
                                </h3>
                                {error && (
                                    <div className="mb-5 flex items-center gap-2 rounded-md border border-amber-600 bg-red-300 p-3">
                                        <FaExclamationCircle className="text-amber-900" />
                                        <p className="text-sm text-amber-900">{error}</p>
                                    </div>
                                )}
                                {DELIVERY_FIELDS.map((f) => (
                                    <div key={f.k} style={{ marginBottom: 16 }}>
                                        <label
                                            style={{
                                                fontSize: 12,
                                                color: T.gold,
                                                fontWeight: 700,
                                                letterSpacing: "0.07em",
                                                display: "block",
                                                marginBottom: 5,
                                            }}
                                        >
                                            {f.l}
                                        </label>
                                        <input
                                            type={f.t}
                                            value={form[f.k]}
                                            onChange={(e) =>
                                                setForm((p) => ({ ...p, [f.k]: e.target.value }))
                                            }
                                            placeholder={f.p}
                                            style={{
                                                width: "100%",
                                                background: T.warm,
                                                border: `1.5px solid ${T.border}`,
                                                color: T.ink,
                                                padding: "12px 16px",
                                                fontSize: 14,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </div>
                                ))}
                                <div className="mb-4">
                                    <label
                                        style={{
                                            fontSize: 12,
                                            color: T.gold,
                                            fontWeight: 700,
                                            letterSpacing: "0.07em",
                                            display: "block",
                                            marginBottom: 5,
                                        }}
                                    >
                                        Location
                                    </label>
                                    <Select
                                        defaultValue={locations[0]?.id.toString()}
                                        onValueChange={(e) => {
                                            const l = locations.find((l) => l.id === Number(e))
                                            setFees(l?.fees ?? 0)
                                            setLocationId(l?.id ?? 0)
                                        }}
                                    >
                                        <SelectTrigger className="w-full rounded-md border border-[#E4D8C4] p-4 text-[#1A1612]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((l) => (
                                                <SelectItem key={l.id} value={l.id.toString()}>
                                                    <span className="flex items-center gap-2">
                                                        <span className="text-sm font-medium text-neutral-400">
                                                            ₦{l.fees.toLocaleString()}
                                                        </span>
                                                        <span className="text-sm font-medium text-neutral-400">
                                                            {l.location}
                                                        </span>
                                                    </span>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <button
                                    className="btn-primary"
                                    style={{
                                        width: "100%",
                                        justifyContent: "center",
                                        marginTop: 8,
                                    }}
                                    onClick={() => {
                                        if (cart.length === 0) {
                                            setToast("Please add items to cart!")
                                            setError("Please add items to cart first!")
                                            return
                                        }
                                        if (
                                            !form.name.trim() ||
                                            !form.address.trim() ||
                                            !form.phone.trim() ||
                                            !/^\S+@\S+\.\S+$/.test(form.email.trim())
                                        ) {
                                            setError("Please fill in all delivery details.")
                                            return
                                        }

                                        setError("")
                                        setStep(2)
                                    }}
                                >
                                    Continue to Payment →
                                </button>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div
                                style={{
                                    background: T.white,
                                    border: `1px solid ${T.border}`,
                                    borderRadius: 14,
                                    padding: "28px 24px",
                                }}
                            >
                                <h3
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: 22,
                                        fontWeight: 600,
                                        marginBottom: 10,
                                    }}
                                >
                                    Review &amp; Pay
                                </h3>
                                {error && (
                                    <div className="mb-5 flex items-center gap-2 rounded-md border border-amber-600 bg-red-300 p-3">
                                        <FaExclamationCircle className="text-amber-900" />
                                        <p className="text-sm text-amber-900">{error}</p>
                                    </div>
                                )}
                                <div className="mb-5 space-y-1 rounded-md border border-neutral-200 p-4 text-sm text-slate-600">
                                    <p className="font-semibold text-slate-800">{form.name}</p>
                                    <p>{form.email}</p>
                                    <p>{form.phone}</p>
                                    <p>{form.address}</p>
                                    <p>{locations.find((l) => l.id === locationId)?.location}</p>
                                </div>
                                <p className="mb-5 rounded-md border border-teal-200 p-3 text-sm text-slate-500">
                                    A secure Flutterwave window will open so you can pay by card,
                                    bank transfer or USSD. Your order is confirmed as soon as the
                                    payment goes through.
                                </p>
                                <div className="w-full items-center justify-between space-y-2.5 md:flex md:gap-2.5 md:space-y-0">
                                    <button
                                        className="btn-secondary w-full"
                                        style={{ flex: 1 }}
                                        disabled={loading}
                                        onClick={() => setStep(1)}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        className="btn-primary w-full text-nowrap"
                                        style={{ flex: 2, justifyContent: "center" }}
                                        disabled={loading}
                                        onClick={onPay}
                                    >
                                        {waiting
                                            ? "Waiting for payment…"
                                            : loading
                                              ? "Opening payment…"
                                              : `Pay ₦${(cartTotal + fees).toLocaleString()} →`}
                                    </button>
                                </div>
                                {waiting && (
                                    <p className="mt-3 text-center text-sm text-slate-500">
                                        Complete the payment in the Flutterwave window.{" "}
                                        <button
                                            className="cursor-pointer underline"
                                            onClick={() => cancelPayment.current()}
                                        >
                                            Cancel
                                        </button>
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div
                            style={{
                                background: T.white,
                                border: `1px solid ${T.border}`,
                                borderRadius: 14,
                                padding: "22px 20px",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontSize: 20,
                                    fontWeight: 600,
                                    marginBottom: 18,
                                    borderBottom: `1px solid ${T.border}`,
                                    paddingBottom: 12,
                                }}
                            >
                                Order Summary
                            </h3>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        gap: 10,
                                        marginBottom: 12,
                                        paddingBottom: 12,
                                        borderBottom: `1px solid ${T.sand}`,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 8,
                                            overflow: "hidden",
                                            flexShrink: 0,
                                            position: "relative",
                                        }}
                                    >
                                        {item.photo ? (
                                            <Image
                                                src={item.photo}
                                                alt={item.name}
                                                fill
                                                style={{
                                                    objectFit: "cover",
                                                    objectPosition: "center top",
                                                }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                                👕
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1.5" style={{ flex: 1 }}>
                                        <div
                                            style={{ fontSize: 13, fontWeight: 700, color: T.ink }}
                                        >
                                            {item.name}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-medium text-slate-400">
                                                Color:{" "}
                                                <span
                                                    style={{
                                                        color: item.selectedColor ?? T.muted,
                                                    }}
                                                >
                                                    {item.selectedColor ?? "any"}
                                                </span>
                                            </span>
                                            <span className="text-xs font-medium text-slate-400">
                                                Size: {item.selectedSize}
                                            </span>
                                            <span className="text-xs font-medium text-slate-400">
                                                Qty: {item.qty}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between space-y-2">
                                        <div
                                            style={{ fontSize: 13, fontWeight: 700, color: T.rust }}
                                        >
                                            ₦{Number(item.price).toLocaleString()}
                                        </div>
                                        <button
                                            className="cursor-pointer rounded-sm border border-amber-800 px-3 py-0.5 text-xs text-amber-800"
                                            onClick={() =>
                                                removeFromCart({
                                                    id: item.id,
                                                    color: item.selectedColor,
                                                    size: item.selectedSize,
                                                })
                                            }
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 6,
                                    }}
                                >
                                    <span style={{ fontSize: 13, color: T.muted }}>Subtotal</span>
                                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                                        ₦{cartTotal.toLocaleString()}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 6,
                                    }}
                                >
                                    <span style={{ fontSize: 13, color: T.muted }}>Delivery</span>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: T.sage }}>
                                        ₦{fees.toLocaleString()}
                                    </span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        borderTop: `2px solid ${T.border}`,
                                        paddingTop: 10,
                                        marginTop: 4,
                                    }}
                                >
                                    <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                                    <span style={{ fontSize: 16, fontWeight: 700, color: T.rust }}>
                                        ₦{(cartTotal + fees).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export { CheckoutPage }
