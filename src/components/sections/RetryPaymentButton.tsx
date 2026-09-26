"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { resumePayment } from "@/src/action/orderController"
import {
    PAYMENT_CHANNEL,
    PaymentMessage,
    openPaymentWindow,
    waitForPayment,
} from "@/src/lib/payment-window"

const RetryPaymentButton = ({ orderId, orderKey }: { orderId: number; orderKey: string }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [waiting, setWaiting] = useState(false)
    const [error, setError] = useState("")
    const cancelPayment = useRef<() => void>(() => {})

    // A late "paid" after we stopped waiting, e.g. the browser reported the
    // payment window closed while it was still open.
    useEffect(() => {
        if (waiting) return
        const channel = new BroadcastChannel(PAYMENT_CHANNEL)
        channel.onmessage = (e: MessageEvent<PaymentMessage>) => {
            if (e.data?.orderId === orderId && e.data.paid) router.refresh()
        }
        return () => channel.close()
    }, [waiting, orderId, router])

    const onRetry = async () => {
        // Opened before any await so the popup blocker allows it.
        const win = openPaymentWindow()
        setLoading(true)
        setError("")

        const result = await resumePayment(orderId, orderKey, !!win)
        if (!result.ok) {
            win?.close()
            setError(result.error)
            setLoading(false)
            return
        }
        if (!win) {
            window.location.href = result.paymentLink
            return
        }

        win.location.href = result.paymentLink
        win.focus()
        setWaiting(true)
        const payment = waitForPayment(win, orderId, orderKey)
        cancelPayment.current = payment.cancel
        const { paid } = await payment.result
        setWaiting(false)
        setLoading(false)

        if (paid) router.refresh()
        else setError("Payment wasn't completed.")
    }

    return (
        <div>
            {error && <p className="mb-3 text-sm text-amber-900">{error}</p>}
            <button
                className="btn-primary w-full"
                style={{ justifyContent: "center" }}
                disabled={loading}
                onClick={onRetry}
            >
                {waiting
                    ? "Waiting for payment…"
                    : loading
                      ? "Opening payment…"
                      : "Try Payment Again →"}
            </button>
            {waiting && (
                <p className="mt-3 text-sm text-slate-500">
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
    )
}

export { RetryPaymentButton }
