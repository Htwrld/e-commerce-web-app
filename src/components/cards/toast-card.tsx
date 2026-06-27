"use client"

import { useCart } from "@/src/lib/cart-context"
import { T } from "@/src/lib/tokens"
import { useEffect } from "react"

const ToastCard = () => {
    const { toast, setToast } = useCart()

    useEffect(() => {
        if (toast) {
            setTimeout(() => setToast(null), 3000)
        }
    }, [toast])

    return (
        toast && (
            <div
                style={{
                    position: "fixed",
                    bottom: 20,
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
        )
    )
}

export default ToastCard
