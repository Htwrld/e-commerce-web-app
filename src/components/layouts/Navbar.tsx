"use client"

import { useEffect, useRef, useState } from "react"
import { T } from "@/src/lib/tokens"
import { NAV_ITEMS } from "@/src/lib/data"
import { useCart } from "@/src/lib/cart-context"
import { WABtn } from "@/src/components/cards/WABtn"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavbarandFooter } from "@/src/action/pageController"

export function Navbar({ footerandnavbar }: { footerandnavbar: NavbarandFooter }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const { cartCount } = useCart()
    const pathname = usePathname()
    const navRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (navRef.current) {
            navRef.current.scrollIntoView({ behavior: "smooth" })
        }

        function onDocClick(e: MouseEvent) {
            if (!navRef.current?.contains(e.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", onDocClick)
        return () => document.removeEventListener("mousedown", onDocClick)
    }, [])

    return (
        <nav
            style={{
                position: "sticky",
                top: 0,
                zIndex: 90,
                background: "rgba(253,248,242,0.97)",
                backdropFilter: "blur(14px)",
                borderBottom: `1px solid ${T.border}`,
            }}
        >
            <div
                style={{
                    maxWidth: 1160,
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 64,
                    padding: "0 20px",
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ cursor: "pointer", flexShrink: 0, minWidth: 0 }}>
                    <div
                        style={{
                            fontSize: 8,
                            letterSpacing: "0.2em",
                            color: T.gold,
                            textTransform: "uppercase",
                            fontWeight: 700,
                            fontFamily: "monospace",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {footerandnavbar.site_description}
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            fontFamily: "'Cormorant Garamond',serif",
                            fontWeight: 700,
                            color: T.ink,
                            lineHeight: 1,
                        }}
                    >
                        {footerandnavbar.site_title}
                    </div>
                </Link>

                {/* Desktop nav */}
                <div
                    className="desktop-nav"
                    style={{
                        display: "flex",
                        gap: 20,
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "center",
                        overflow: "hidden",
                    }}
                >
                    {NAV_ITEMS.map((n) => (
                        <Link
                            key={n.id}
                            className={`nav-link${pathname === n.id ? "active" : ""}`}
                            href={n.id}
                            style={{
                                fontSize: 12,
                                letterSpacing: "0.04em",
                                color: pathname === n.id ? T.rust : T.charcoal,
                                fontWeight: pathname === n.id ? 700 : 400,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                            }}
                        >
                            {n.label}
                        </Link>
                    ))}
                </div>

                {/* Right: cart + hamburger */}
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
                    <Link
                        href="/checkout"
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: 20,
                            position: "relative",
                            padding: 4,
                            color: pathname === "/checkout" ? T.rust : T.charcoal,
                        }}
                    >
                        🛒
                        {cartCount > 0 && (
                            <span
                                style={{
                                    position: "absolute",
                                    top: -2,
                                    right: -4,
                                    background: T.rust,
                                    color: "#fff",
                                    borderRadius: "50%",
                                    width: 18,
                                    height: 18,
                                    fontSize: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                }}
                            >
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button
                        className="bg-none md:hidden!"
                        onClick={() => setMenuOpen((o) => !o)}
                        style={{
                            background: "none",
                            border: `1.5px solid ${T.border}`,
                            borderRadius: 6,
                            width: 36,
                            height: 36,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 4,
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                style={{
                                    width: 16,
                                    height: 2,
                                    background: T.charcoal,
                                    borderRadius: 2,
                                    display: "block",
                                }}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    style={{
                        background: T.white,
                        borderTop: `1px solid ${T.border}`,
                        animation: "slideUp .2s ease",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }}
                >
                    {NAV_ITEMS.map((n) => (
                        <Link
                            key={n.id}
                            href={n.id}
                            style={{
                                padding: "14px 24px",
                                fontSize: 16,
                                fontFamily: "'Cormorant Garamond',serif",
                                color: pathname === n.id ? T.rust : T.ink,
                                cursor: "pointer",
                                borderBottom: `1px solid ${T.sand}`,
                                fontWeight: pathname === n.id ? 700 : 400,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            {n.label}
                            <span style={{ color: T.muted, fontSize: 14 }}>→</span>
                        </Link>
                    ))}
                    <div style={{ padding: "14px 24px", borderTop: `2px solid ${T.border}` }}>
                        <WABtn text="Order via WhatsApp" />
                    </div>
                </div>
            )}
        </nav>
    )
}
