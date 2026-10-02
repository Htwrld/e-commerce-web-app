import "server-only"
import { randomUUID } from "node:crypto"

const paystackFetch = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const secret = process.env.PAYSTACK_SECRET_KEY
    if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not configured")
    const res = await fetch(`https://api.paystack.co/${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secret}`,
            ...init.headers,
        },
    })
    const body = await res.json()
    if (!res.ok || body.status !== true) {
        throw new Error(`Paystack ${path} failed: ${body.message ?? res.status}`)
    }
    return body.data
}

export const txRefForOrder = (orderId: number) => `HTW-${orderId}-${randomUUID()}`
export const orderIdFromTxRef = (reference: string) => {
    const match = /^HTW-(\d+)-[a-f0-9-]{36}$/.exec(reference)
    return match ? Number(match[1]) : null
}

// Paystack expects amounts in the currency's smallest unit (kobo for NGN).
export const toMinorUnits = (amount: string) => {
    if (!/^\d+(?:\.\d{1,2})?$/.test(amount)) throw new Error("Invalid payment amount")
    const [whole, fraction = ""] = amount.split(".")
    const value = Number(whole) * 100 + Number(fraction.padEnd(2, "0"))
    if (!Number.isSafeInteger(value) || value <= 0) throw new Error("Invalid payment amount")
    return value
}

export const createPaymentLink = async (payment: {
    txRef: string
    amount: string
    currency: string
    redirectUrl: string
    orderId: number
    customer: { email: string; name: string; phone: string }
}) => {
    const data = await paystackFetch<{ authorization_url: string }>("transaction/initialize", {
        method: "POST",
        body: JSON.stringify({
            reference: payment.txRef,
            amount: toMinorUnits(payment.amount),
            currency: payment.currency,
            callback_url: payment.redirectUrl,
            email: payment.customer.email,
            metadata: {
                order_id: payment.orderId,
                customer_name: payment.customer.name,
                phone: payment.customer.phone,
            },
        }),
    })
    return data.authorization_url
}

export type PaystackTransaction = {
    id: number
    reference: string
    status: string
    amount: number
    currency: string
    customer: { email: string }
}

export const verifyTransaction = (reference: string) =>
    paystackFetch<PaystackTransaction>(`transaction/verify/${encodeURIComponent(reference)}`)
