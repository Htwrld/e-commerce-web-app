"use client"

import { useState } from "react"
import { resumePayment } from "@/src/action/orderController"

const RetryPaymentButton = ({ orderId, orderKey }: { orderId: number; orderKey: string }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const onRetry = async () => {
        setLoading(true)
        setError("")
        const result = await resumePayment(orderId, orderKey)
        if (!result.ok) {
            setError(result.error)
            setLoading(false)
            return
        }
        window.location.href = result.paymentLink
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
                {loading ? "Redirecting to payment…" : "Try Payment Again →"}
            </button>
        </div>
    )
}

export { RetryPaymentButton }
