"use client"

import { useEffect, useState } from "react"
import { T } from "@/src/lib/tokens"
import { useCart } from "@/src/lib/cart-context"
import { Navbar } from "@/src/components/layouts/Navbar"
import { Ticker } from "@/src/components/layouts/Ticker"
import { CartDrawer } from "@/src/components/layouts/CartDrawer"
import { Footer } from "@/src/components/layouts/Footer"
import { ContactPage } from "@/src/components/sections/ContactPage"
import { ShopPage } from "@/src/components/sections/ShopPage"

export default function HTWContactApp() {
    const { toast } = useCart()
    const [heroIdx, setHeroIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 5000)
        return () => clearInterval(t)
    }, [])

    return (
        <main>
            <ShopPage />
        </main>
    )
}
