import "server-only"

import { orderIdFromTxRef, verifyTransaction } from "./flutterwave"
import { WcOrder, wcFetch } from "./woocommerce"

// Called from both the post-payment redirect and the Flutterwave webhook, so it
// has to be idempotent: whichever arrives second finds the order already paid.
export const completeOrderFromTransaction = async (
    transactionId: string | number
): Promise<{ ok: true; order: WcOrder } | { ok: false; reason: string }> => {
    const tx = await verifyTransaction(transactionId)

    const orderId = orderIdFromTxRef(tx.tx_ref)
    if (!orderId) return { ok: false, reason: "Unknown transaction reference" }

    const order = await wcFetch<WcOrder>(`orders/${orderId}`)

    if (!["pending", "failed"].includes(order.status)) return { ok: true, order }

    if (tx.status !== "successful") {
        return { ok: false, reason: "Payment was not successful" }
    }

    // Never trust the redirect alone: the verified amount and currency must
    // cover what WooCommerce says the order costs.
    if (tx.currency !== order.currency || tx.amount < Number(order.total)) {
        await wcFetch(`orders/${orderId}/notes`, {
            method: "POST",
            body: JSON.stringify({
                note: `Flutterwave transaction ${tx.id} paid ${tx.currency} ${tx.amount}, expected ${order.currency} ${order.total}. Not marked as paid.`,
            }),
        })
        return { ok: false, reason: "Payment amount did not match the order" }
    }

    // set_paid runs WooCommerce's payment_complete(): status -> processing,
    // stock reduced, and the customer + admin order emails sent.
    const paid = await wcFetch<WcOrder>(`orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ set_paid: true, transaction_id: String(tx.id) }),
    })
    return { ok: true, order: paid }
}
