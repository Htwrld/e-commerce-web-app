import "server-only"

import { orderIdFromTxRef, toMinorUnits, verifyTransaction } from "./paystack"
import { WcOrder, wcFetch } from "./woocommerce"

// Called from both the post-payment redirect and the Paystack webhook, so it
// has to be idempotent: whichever arrives second finds the order already paid.
export const completeOrderFromTransaction = async (
    reference: string
): Promise<{ ok: true; order: WcOrder } | { ok: false; reason: string }> => {
    const tx = await verifyTransaction(reference)

    const orderId = orderIdFromTxRef(tx.reference)
    if (!orderId) return { ok: false, reason: "Unknown transaction reference" }

    const order = await wcFetch<WcOrder>(`orders/${orderId}`)

    if (
        tx.reference !== reference ||
        order.payment_method !== "paystack" ||
        !order.meta_data.some(
            (m) => m.key === `_htw_paystack_${reference}` && m.value === reference
        ) ||
        tx.customer.email.toLowerCase() !== order.billing.email.toLowerCase()
    )
        return { ok: false, reason: "Payment does not belong to this order" }

    if (tx.status !== "success") {
        return { ok: false, reason: "Payment was not successful" }
    }

    // Never trust the redirect alone: the verified amount and currency must
    // cover what WooCommerce says the order costs.
    if (tx.currency !== order.currency || tx.amount !== toMinorUnits(order.total)) {
        await wcFetch(`orders/${orderId}/notes`, {
            method: "POST",
            body: JSON.stringify({
                note: `Paystack transaction ${tx.id} paid ${tx.currency} ${tx.amount / 100}, expected ${order.currency} ${order.total}. Not marked as paid.`,
            }),
        })
        return { ok: false, reason: "Payment amount did not match the order" }
    }

    if (["processing", "completed"].includes(order.status)) return { ok: true, order }
    if (!["pending", "failed"].includes(order.status)) {
        return { ok: false, reason: "Order cannot accept payment in its current status" }
    }

    // set_paid runs WooCommerce's payment_complete(): status -> processing,
    // stock reduced, and the customer + admin order emails sent.
    const paid = await wcFetch<WcOrder>(`orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ set_paid: true, transaction_id: tx.reference }),
    })
    return { ok: true, order: paid }
}
