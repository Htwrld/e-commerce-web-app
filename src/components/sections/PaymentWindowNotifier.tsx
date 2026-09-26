"use client"

import { useEffect, useState } from "react"
import { T } from "@/src/lib/tokens"
import { PAYMENT_CHANNEL, PaymentMessage } from "@/src/lib/payment-window"

// Rendered by /checkout/complete when it loads inside the payment window:
// report the result to the checkout tab, then close.
const PaymentWindowNotifier = ({ orderId, paid }: PaymentMessage) => {
    const [stillOpen, setStillOpen] = useState(false)

    useEffect(() => {
        const channel = new BroadcastChannel(PAYMENT_CHANNEL)
        channel.postMessage({ orderId, paid } satisfies PaymentMessage)
        channel.close()
        window.close()
        // window.close() is ignored if the browser no longer treats this as a
        // script-opened window.
        const t = setTimeout(() => setStillOpen(true), 500)
        return () => clearTimeout(t)
    }, [orderId, paid])

    return (
        <p style={{ textAlign: "center", padding: "30vh 28px", color: T.muted, fontSize: 15 }}>
            {stillOpen
                ? `${paid ? "Payment received." : "Payment not completed."} You can close this window.`
                : "Returning to the shop…"}
        </p>
    )
}

export { PaymentWindowNotifier }
