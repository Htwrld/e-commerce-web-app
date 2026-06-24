"use client"

import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { WABtn } from "@/src/components/cards/WABtn"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function CartDrawer() {
    const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartCount, cartTotal } =
        useCart()
    const router = useRouter()

    if (!cartOpen) return null

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 998, display: "flex" }}>
            <div
                onClick={() => setCartOpen(false)}
                style={{ flex: 1, background: "rgba(0,0,0,0.45)" }}
            />
            <div
                style={{
                    width: 360,
                    background: T.white,
                    padding: 28,
                    overflowY: "auto",
                    animation: "slideUp .3s ease",
                    boxShadow: "-8px 0 48px rgba(0,0,0,0.15)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 22,
                        paddingBottom: 14,
                        borderBottom: `1px solid ${T.border}`,
                    }}
                >
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 22,
                            fontWeight: 600,
                        }}
                    >
                        Your Cart ({cartCount})
                    </h3>
                    <button
                        onClick={() => setCartOpen(false)}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: 22,
                            cursor: "pointer",
                            color: T.muted,
                        }}
                    >
                        ✕
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div style={{ textAlign: "center", paddingTop: 60, color: T.muted }}>
                        <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
                        <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18 }}>
                            Your cart is empty
                        </p>
                        <p style={{ fontSize: 13, marginTop: 6 }}>
                            Add some pieces to get started.
                        </p>
                    </div>
                ) : (
                    <>
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    marginBottom: 16,
                                    paddingBottom: 16,
                                    borderBottom: `1px solid ${T.sand}`,
                                }}
                            >
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 10,
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
                                                fontSize: 26,
                                            }}
                                        >
                                            👕
                                        </div>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 700,
                                            color: T.ink,
                                            marginBottom: 1,
                                        }}
                                    >
                                        {item.name}
                                    </div>
                                    <div style={{ fontSize: 12, color: T.muted, marginBottom: 3 }}>
                                        {item.description}
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{ fontSize: 15, color: T.rust, fontWeight: 700 }}
                                        >
                                            {item.price}
                                        </span>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    updateQty({
                                                        id: item.id,
                                                        qty: item.qty - 1,
                                                        color: item.selectedColor,
                                                        size: item.selectedSize,
                                                    })
                                                }
                                                style={{
                                                    background: T.sand,
                                                    border: "none",
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: 4,
                                                    cursor: "pointer",
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                −
                                            </button>
                                            <span style={{ fontSize: 13, fontWeight: 700 }}>
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQty({
                                                        id: item.id,
                                                        qty: item.qty + 1,
                                                        color: item.selectedColor,
                                                        size: item.selectedSize,
                                                    })
                                                }
                                                style={{
                                                    background: T.sand,
                                                    border: "none",
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: 4,
                                                    cursor: "pointer",
                                                    fontSize: 14,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        removeFromCart({
                                            id: item.id,
                                            color: item.selectedColor,
                                            size: item.selectedSize,
                                        })
                                    }
                                    style={{
                                        background: "none",
                                        border: "none",
                                        color: "#CCC",
                                        cursor: "pointer",
                                        fontSize: 18,
                                        alignSelf: "flex-start",
                                        padding: "0 4px",
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        <div
                            style={{
                                borderTop: `2px solid ${T.border}`,
                                paddingTop: 16,
                                marginTop: 8,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginBottom: 16,
                                }}
                            >
                                <span style={{ fontSize: 15, fontWeight: 600 }}>Subtotal</span>
                                <span style={{ fontSize: 16, fontWeight: 700, color: T.rust }}>
                                    ₦{cartTotal.toLocaleString()}
                                </span>
                            </div>
                            <Link
                                href="/checkout"
                                className="btn-primary"
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    marginBottom: 10,
                                }}
                            >
                                Proceed to Checkout →
                            </Link>
                            <WABtn
                                text="Complete via WhatsApp"
                                product={cart.map((c) => `${c.name} x${c.qty}`).join(", ")}
                            />
                            <p
                                style={{
                                    fontSize: 11,
                                    color: T.muted,
                                    marginTop: 10,
                                    lineHeight: 1.6,
                                }}
                            >
                                🔒 Secure checkout · Paystack · Flutterwave · Bank Transfer
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
