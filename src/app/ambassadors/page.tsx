"use client"

import { useEffect, useState } from "react"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { Navbar } from "@/src/components/layouts/Navbar"
import { Ticker } from "@/src/components/layouts/Ticker"
import { CartDrawer } from "@/src/components/layouts/CartDrawer"
import { Footer } from "@/src/components/layouts/Footer"
import { ContactPage } from "@/src/components/sections/ContactPage"
import { AmbassadorsPage } from "@/src/components/sections/AmbassadorsPage"

export default function HTWContactApp() {
    const { toast } = useCart()
    const [heroIdx, setHeroIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 5000)
        return () => clearInterval(t)
    }, [])

    return (
        <div
            style={{
                fontFamily: "'Georgia','Times New Roman',serif",
                background: T.cream,
                color: T.ink,
                minHeight: "100vh",
                overflowX: "hidden",
            }}
        >
            {/* Floating WhatsApp */}
            <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="wa-float"
                title="Chat with us"
            >
                💬
            </a>

            {/* Toast */}
            {toast && (
                <div
                    style={{
                        position: "fixed",
                        top: 80,
                        right: 20,
                        zIndex: 1001,
                        background: T.sage,
                        color: "#fff",
                        padding: "11px 20px",
                        borderRadius: 9,
                        fontSize: 13,
                        fontWeight: 700,
                        animation: "slideUp .3s ease",
                        boxShadow: "0 4px 20px rgba(59,122,87,.35)",
                    }}
                >
                    ✓ {toast}
                </div>
            )}

            <CartDrawer />
            <Navbar />
            <Ticker />

            <main>
                <AmbassadorsPage />
            </main>

            <Footer />
        </div>
    )
}
