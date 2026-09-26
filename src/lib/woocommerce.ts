import "server-only"

const website_url = process.env.WORDPRESS_URL_ENDPOINT

export type WcOrder = {
    id: number
    order_key: string
    status: string
    currency: string
    total: string
    shipping_total: string
    date_created: string
    billing: { first_name: string; last_name: string; email: string; phone: string }
    shipping: { address_1: string; city: string }
    line_items: {
        name: string
        quantity: number
        total: string
        meta_data: { key: string; value: string }[]
    }[]
}

export type WcProduct = {
    id: number
    name: string
    price: string
    purchasable: boolean
    stock_status: string
}

// WooCommerce REST (wc/v3) with the server-side consumer key. Never import
// this from a client component — the key has read/write access to orders.
export const wcFetch = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    const auth = Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
    ).toString("base64")

    const res = await fetch(`${website_url}wp-json/wc/v3/${path}`, {
        ...init,
        cache: "no-store",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
            ...init.headers,
        },
    })

    if (!res.ok) {
        throw new Error(`WooCommerce ${init.method ?? "GET"} ${path} failed: ${res.status}`)
    }
    return res.json()
}

export const ORDER_STATUS_LABELS: Record<string, string> = {
    pending: "Awaiting payment",
    failed: "Payment failed",
    "on-hold": "On hold",
    processing: "Paid — being prepared",
    shipped: "Out for delivery",
    completed: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
}
