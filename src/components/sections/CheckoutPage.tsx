"use client"

import { useState } from "react"
import Image from "next/image"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { WABtn } from "@/src/components/cards/WABtn"
import Link from "next/link"
import { Location } from "@/src/action/productController"
import { FaCheck, FaCopy, FaExclamationCircle } from "react-icons/fa"
import { sendMail } from "@/src/action/mailController"
import { orderNotificationTemplate, orderConfirmationTemplate } from "@/src/lib/email-templates"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const CheckoutPage = ({ locations }: { locations: Location[] }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copied, setCopied] = useState(false)
    const [fees, setFees] = useState(locations[0]?.fees ?? 0)
    const [locationName, setLocationName] = useState(locations[0]?.location ?? "")
    const { cart, cartTotal, removeFromCart, setToast } = useCart()
    const [step, setStep] = useState(1)
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

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setToast("Copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    const onConfirm = async () => {
        try {
            setLoading(true)
            setError("")

            const orderData = {
                customerName: form.name,
                customerEmail: form.email,
                customerPhone: form.phone,
                customerAddress: form.address,
                location: locationName,
                items: cart.map((c) => ({
                    name: c.name,
                    qty: c.qty,
                    selectedColor: c.selectedColor,
                    selectedSize: c.selectedSize,
                    price: c.price,
                })),
                subtotal: cartTotal,
                deliveryFee: fees,
                total: cartTotal + fees,
            }

            await Promise.all([
                sendMail({
                    to: "host",
                    subject: `New Order from ${form.name}`,
                    html: orderNotificationTemplate(orderData),
                }),
                sendMail({
                    to: form.email,
                    subject: "Your HTW Order is Confirmed!",
                    html: orderConfirmationTemplate(orderData),
                }),
            ])

            cart.forEach((c) => {
                removeFromCart({
                    id: c.id,
                    color: c.selectedColor,
                    size: c.selectedSize,
                })
            })
            setFees(0)
            setStep(3)
        } catch (err) {
            setError("Something went wrong! Please try again later.")
        } finally {
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
                                            setLocationName(l?.location ?? "")
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
                                    Payment Details
                                </h3>
                                <p className="rounded-md border border-teal-200 p-3 text-sm text-slate-500">
                                    After making payment, kindly send your payment receipt or
                                    screenshot along with your Order Reference to our official
                                    WhatsApp account for verification and order confirmation.
                                </p>
                                <div className="my-2.5 flex flex-col items-center justify-center gap-3 rounded-md border border-neutral-200 bg-white pb-6 text-center">
                                    <Image
                                        className="h-32 w-32"
                                        src={"/images/unnamed.webp"}
                                        height={200}
                                        width={200}
                                        alt=""
                                    />
                                    <h2>Business Transfer Number</h2>
                                    <span className="flex items-center gap-2 font-mono text-xl font-black text-teal-500">
                                        <span>6564330275</span>
                                        {copied ? (
                                            <FaCheck className="text-teal-400" />
                                        ) : (
                                            <FaCopy
                                                className="cursor-pointer hover:text-teal-400"
                                                onClick={() => handleCopy("6564330275")}
                                            />
                                        )}
                                    </span>
                                    <p className="text-sm text-neutral-400 uppercase">
                                        Amaeyak brown akanem
                                    </p>
                                </div>
                                <div className="w-full items-center justify-between space-y-2.5 md:flex md:gap-2.5 md:space-y-0">
                                    <button
                                        className="btn-secondary w-full"
                                        style={{ flex: 1 }}
                                        onClick={() => setStep(1)}
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        className="btn-primary w-full text-nowrap"
                                        style={{ flex: 2, justifyContent: "center" }}
                                        onClick={onConfirm}
                                    >
                                        Confirm Payment →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirmation */}
                        {step === 3 && (
                            <div
                                className="flex flex-col items-center justify-center rounded-md border border-neutral-200 bg-white pb-6 text-center"
                                style={{
                                    textAlign: "center",
                                    padding: "52px 28px",
                                    background: `${T.sage}12`,
                                    border: `2px solid ${T.sage}44`,
                                    borderRadius: 16,
                                }}
                            >
                                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                                <h2
                                    style={{
                                        fontFamily: "'Cormorant Garamond',serif",
                                        fontSize: 32,
                                        fontWeight: 700,
                                        color: T.ink,
                                        marginBottom: 10,
                                    }}
                                >
                                    Order Confirmed!
                                </h2>
                                <p
                                    style={{
                                        fontSize: 15,
                                        color: T.muted,
                                        lineHeight: 1.8,
                                        marginBottom: 20,
                                    }}
                                >
                                    Thank you for your order! We&rsquo;ll confirm via WhatsApp and
                                    send tracking details within 24 hours.
                                </p>
                                <div className="w-fit">
                                    <WABtn
                                        text="Track Order on WhatsApp"
                                        message="Hi HTW! I'd like to track my order"
                                    />
                                </div>
                                <div className="mt-5 w-full">
                                    <Link className="btn-outline-gold w-full" href="/">
                                        Continue Shopping →
                                    </Link>
                                </div>
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
