import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { completeOrderFromTransaction } from "@/src/lib/orders"
import { WcOrder, wcFetch } from "@/src/lib/woocommerce"
import { RetryPaymentButton } from "@/src/components/sections/RetryPaymentButton"
import { PaymentWindowNotifier } from "@/src/components/sections/PaymentWindowNotifier"

export const metadata = { title: "Order Status - HTW — Hope's Trendy World" }

type Params = {
    order?: string
    key?: string
    reference?: string
    popup?: string
}

// Paystack redirects here with ?reference= appended to
// our own ?order=&key=. The webhook may already have marked the order paid.
const resolveOrder = async ({ order, key, reference }: Params) => {
    const orderId = Number(order)
    if (!orderId || !key) return null

    try {
        if (reference) {
            const result = await completeOrderFromTransaction(reference)
            if (result.ok && result.order.id === orderId && result.order.order_key === key) {
                return result.order
            }
        }
        const current = await wcFetch<WcOrder>(`orders/${orderId}`)
        return current.order_key === key ? current : null
    } catch (err) {
        console.error(err)
        return null
    }
}

const CheckoutCompleteRoute = async ({ searchParams }: { searchParams: Promise<Params> }) => {
    const params = await searchParams
    const order = await resolveOrder(params)
    const paid = order && ["processing", "completed", "shipped"].includes(order.status)

    if (params.popup === "1") {
        return (
            <main>
                <PaymentWindowNotifier orderId={Number(params.order)} paid={Boolean(paid)} />
            </main>
        )
    }

    return (
        <main>
            <section style={{ maxWidth: 640, margin: "0 auto", padding: "80px 28px" }}>
                <div
                    className="flex flex-col items-center justify-center text-center"
                    style={{
                        padding: "52px 28px",
                        background: paid ? `${T.sage}12` : T.white,
                        border: `2px solid ${paid ? `${T.sage}44` : T.border}`,
                        borderRadius: 16,
                    }}
                >
                    <div style={{ fontSize: 64, marginBottom: 16 }}>{paid ? "🎉" : "⏳"}</div>
                    <h1
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 32,
                            fontWeight: 700,
                            color: T.ink,
                            marginBottom: 10,
                        }}
                    >
                        {paid ? "Order Confirmed!" : "Payment Not Completed"}
                    </h1>
                    <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.8, marginBottom: 20 }}>
                        {!order
                            ? "We couldn't find this order. If you were charged, contact us with your payment receipt."
                            : paid
                              ? `Thank you, ${order.billing.first_name}! Your order number is #${order.id}. A confirmation has been sent to ${order.billing.email}.`
                              : `Order #${order.id} is saved but hasn't been paid yet. You can try the payment again.`}
                    </p>

                    {order && !paid && (
                        <div className="mb-4 w-full">
                            <RetryPaymentButton orderId={order.id} orderKey={order.order_key} />
                        </div>
                    )}

                    <div className="flex w-full flex-col gap-3">
                        {order && (
                            <Link
                                className="btn-secondary w-full"
                                href={`/track?order=${order.id}&email=${encodeURIComponent(order.billing.email)}`}
                            >
                                Track this order
                            </Link>
                        )}
                        <Link className="btn-outline-gold w-full" href="/shop">
                            Continue Shopping →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default CheckoutCompleteRoute
