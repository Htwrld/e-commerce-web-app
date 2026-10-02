import { createHmac, timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"
import { completeOrderFromTransaction } from "@/src/lib/orders"
import { orderIdFromTxRef } from "@/src/lib/paystack"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
    const secret = process.env.PAYSTACK_SECRET_KEY
    if (!secret) return NextResponse.json({ received: false }, { status: 503 })
    const rawBody = await req.text()
    const signature = req.headers.get("x-paystack-signature") ?? ""
    const expected = createHmac("sha512", secret).update(rawBody).digest()
    if (
        !/^[a-f0-9]{128}$/i.test(signature) ||
        !timingSafeEqual(Buffer.from(signature, "hex"), expected)
    ) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }
    let payload
    try {
        payload = JSON.parse(rawBody)
    } catch {
        return NextResponse.json({ message: "Invalid JSON" }, { status: 400 })
    }
    const reference = payload?.data?.reference
    if (
        payload?.event !== "charge.success" ||
        typeof reference !== "string" ||
        !orderIdFromTxRef(reference)
    ) {
        return NextResponse.json({ received: true })
    }
    try {
        // Re-verify the transaction with Paystack before updating WooCommerce.
        const result = await completeOrderFromTransaction(reference)
        return NextResponse.json({ received: true, paid: result.ok })
    } catch (err) {
        console.error(err)
        // A non-2xx response asks Paystack to retry after a temporary failure.
        return NextResponse.json({ received: false }, { status: 500 })
    }
}
