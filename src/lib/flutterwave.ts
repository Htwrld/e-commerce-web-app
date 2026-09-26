import "server-only"

const FLW_API = "https://api.flutterwave.com/v3"

const flwFetch = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${FLW_API}/${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            ...init.headers,
        },
    })
    const body = await res.json()
    if (!res.ok || body.status !== "success") {
        throw new Error(`Flutterwave ${path} failed: ${body.message ?? res.status}`)
    }
    return body.data
}

// The WooCommerce order id is embedded in tx_ref so a verified transaction
// can be matched back to its order. The timestamp keeps retries unique.
export const txRefForOrder = (orderId: number) => `HTW-${orderId}-${Date.now()}`

export const orderIdFromTxRef = (txRef: string) => {
    const match = /^HTW-(\d+)-\d+$/.exec(txRef)
    return match ? Number(match[1]) : null
}

export const createPaymentLink = async (payment: {
    txRef: string
    amount: string
    currency: string
    redirectUrl: string
    orderId: number
    customer: { email: string; name: string; phone: string }
}) => {
    const data = await flwFetch<{ link: string }>("payments", {
        method: "POST",
        body: JSON.stringify({
            tx_ref: payment.txRef,
            amount: payment.amount,
            currency: payment.currency,
            redirect_url: payment.redirectUrl,
            customer: {
                email: payment.customer.email,
                name: payment.customer.name,
                phonenumber: payment.customer.phone,
            },
            customizations: {
                title: "Hope's Trendy World",
                description: `Order #${payment.orderId}`,
            },
            meta: { order_id: payment.orderId },
        }),
    })
    return data.link
}

export type FlwTransaction = {
    id: number
    tx_ref: string
    status: string
    amount: number
    currency: string
}

export const verifyTransaction = (transactionId: string | number) =>
    flwFetch<FlwTransaction>(`transactions/${encodeURIComponent(transactionId)}/verify`)
