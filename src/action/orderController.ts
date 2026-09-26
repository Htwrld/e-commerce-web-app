"use server"

import { createPaymentLink, txRefForOrder } from "../lib/flutterwave"
import { ORDER_STATUS_LABELS, WcOrder, WcProduct, wcFetch } from "../lib/woocommerce"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const site_url = process.env.SITE_URL ?? "https://hopestrendyworld.com"

export type CheckoutInput = {
    customer: { name: string; email: string; phone: string; address: string }
    locationId: number
    items: { id: number; qty: number; color: string; size: string }[]
    // Paying in a separate window: /checkout/complete then tells the checkout
    // tab the result and closes itself instead of showing the full page.
    popup?: boolean
}

type PaymentStart = { paymentLink: string; orderId: number; orderKey: string }

type ActionResult<T> = ({ ok: true } & T) | { ok: false; error: string }

const startPayment = async (order: WcOrder, popup = false): Promise<PaymentStart> => ({
    orderId: order.id,
    orderKey: order.order_key,
    paymentLink: await createPaymentLink({
        txRef: txRefForOrder(order.id),
        amount: order.total,
        currency: order.currency,
        orderId: order.id,
        redirectUrl: `${site_url}/checkout/complete?order=${order.id}&key=${order.order_key}${popup ? "&popup=1" : ""}`,
        customer: {
            email: order.billing.email,
            name: `${order.billing.first_name} ${order.billing.last_name}`.trim(),
            phone: order.billing.phone,
        },
    }),
})

// Prices and the delivery fee are looked up on the server; only product ids,
// quantities and options come from the browser.
export const createOrder = async (
    input: CheckoutInput
): Promise<ActionResult<PaymentStart>> => {
    try {
        const { customer, locationId, items, popup } = input
        const name = customer.name.trim()
        const email = customer.email.trim()
        const phone = customer.phone.trim()
        const address = customer.address.trim()

        if (!name || !phone || !address || !/^\S+@\S+\.\S+$/.test(email)) {
            return { ok: false, error: "Please fill in all delivery details." }
        }
        if (
            items.length === 0 ||
            items.some((i) => !Number.isInteger(i.qty) || i.qty < 1 || i.qty > 50)
        ) {
            return { ok: false, error: "Your cart is empty or has an invalid quantity." }
        }

        const ids = [...new Set(items.map((i) => i.id))]
        const products = await wcFetch<WcProduct[]>(
            `products?include=${ids.join(",")}&per_page=100`
        )
        for (const id of ids) {
            const p = products.find((p) => p.id === id)
            if (!p || !p.purchasable || !(Number(p.price) > 0)) {
                return { ok: false, error: "An item in your cart is no longer available." }
            }
            if (p.stock_status === "outofstock") {
                return { ok: false, error: `${p.name} is out of stock.` }
            }
        }

        const locRes = await fetch(
            `${website_url}wp-json/wp/v2/locations/${locationId}?acf_format=standard`,
            { cache: "no-store" }
        )
        if (!locRes.ok) return { ok: false, error: "Please choose a delivery location." }
        const loc = await locRes.json()
        const fee = loc.acf.fees ? parseInt(loc.acf.fees) : 0

        const [firstName, ...rest] = name.split(/\s+/)
        const contact = { first_name: firstName, last_name: rest.join(" "), address_1: address }

        const order = await wcFetch<WcOrder>("orders", {
            method: "POST",
            body: JSON.stringify({
                status: "pending",
                set_paid: false,
                payment_method: "flutterwave",
                payment_method_title: "Flutterwave",
                billing: { ...contact, email, phone, city: loc.acf.location, country: "NG" },
                shipping: { ...contact, phone, city: loc.acf.location, country: "NG" },
                line_items: items.map((i) => ({
                    product_id: i.id,
                    quantity: i.qty,
                    meta_data: [
                        ...(i.color ? [{ key: "Color", value: i.color }] : []),
                        ...(i.size ? [{ key: "Size", value: i.size }] : []),
                    ],
                })),
                shipping_lines: [
                    {
                        method_id: "flat_rate",
                        method_title: `Delivery — ${loc.acf.location}`,
                        total: String(fee),
                    },
                ],
            }),
        })

        return { ok: true, ...(await startPayment(order, popup)) }
    } catch (err) {
        console.error(err)
        return { ok: false, error: "Something went wrong! Please try again later." }
    }
}

// For a customer who cancelled or failed on the Flutterwave page: pay for the
// same order again instead of rebuilding the cart.
export const resumePayment = async (
    orderId: number,
    orderKey: string,
    popup = false
): Promise<ActionResult<PaymentStart>> => {
    try {
        const order = await wcFetch<WcOrder>(`orders/${orderId}`)
        if (order.order_key !== orderKey) return { ok: false, error: "Order not found." }
        if (!["pending", "failed"].includes(order.status)) {
            return { ok: false, error: "This order has already been paid." }
        }
        return { ok: true, ...(await startPayment(order, popup)) }
    } catch (err) {
        console.error(err)
        return { ok: false, error: "Something went wrong! Please try again later." }
    }
}

// Polled by the checkout tab while the payment window is open, which also
// catches payments the webhook confirmed before the window reported back.
export const getPaymentStatus = async (
    orderId: number,
    orderKey: string
): Promise<{ paid: boolean }> => {
    try {
        const order = await wcFetch<WcOrder>(`orders/${orderId}`)
        if (order.order_key !== orderKey) return { paid: false }
        return { paid: !["pending", "failed", "cancelled"].includes(order.status) }
    } catch {
        return { paid: false }
    }
}

export type TrackedOrder = {
    id: number
    status: string
    statusLabel: string
    date: string
    total: string
    deliveryFee: string
    location: string
    items: { name: string; qty: number; total: string; options: string }[]
    notes: { date: string; note: string }[]
}

export const trackOrder = async (
    orderId: number,
    email: string
): Promise<ActionResult<{ order: TrackedOrder }>> => {
    const notFound = { ok: false as const, error: "No order matches that number and email." }
    if (!Number.isInteger(orderId) || orderId < 1) return notFound

    let order: WcOrder
    try {
        order = await wcFetch<WcOrder>(`orders/${orderId}`)
    } catch {
        return notFound
    }
    // Same answer for "wrong email" and "no such order" so order numbers
    // can't be probed.
    if (order.billing.email.toLowerCase() !== email.trim().toLowerCase()) return notFound

    const notes = await wcFetch<{ date_created: string; note: string; customer_note: boolean }[]>(
        `orders/${orderId}/notes?type=customer`
    ).catch(() => [])

    return {
        ok: true,
        order: {
            id: order.id,
            status: order.status,
            statusLabel: ORDER_STATUS_LABELS[order.status] ?? order.status,
            date: order.date_created,
            total: order.total,
            deliveryFee: order.shipping_total,
            location: order.shipping.city,
            items: order.line_items.map((li) => ({
                name: li.name,
                qty: li.quantity,
                total: li.total,
                options: li.meta_data
                    .filter((m) => m.key === "Color" || m.key === "Size")
                    .map((m) => `${m.key}: ${m.value}`)
                    .join(" · "),
            })),
            notes: notes.map((n) => ({ date: n.date_created, note: n.note })),
        },
    }
}
