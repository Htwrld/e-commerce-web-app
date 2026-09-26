import { NextRequest, NextResponse } from "next/server"
import { completeOrderFromTransaction } from "@/src/lib/orders"

// Flutterwave calls this after a charge, so orders get marked paid even when the
// customer closes the tab before being redirected back to /checkout/complete.
// Set the webhook URL and "secret hash" in the Flutterwave dashboard.
export async function POST(req: NextRequest) {
    if (req.headers.get("verif-hash") !== process.env.FLW_WEBHOOK_HASH) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 })
    }

    const payload = await req.json()
    if (payload?.event !== "charge.completed" || !payload?.data?.id) {
        return NextResponse.json({ received: true }, { status: 200 })
    }

    try {
        // The payload itself is not trusted; this re-verifies with Flutterwave.
        const result = await completeOrderFromTransaction(payload.data.id)
        return NextResponse.json({ received: true, paid: result.ok }, { status: 200 })
    } catch (err) {
        console.error(err)
        // Non-2xx makes Flutterwave retry later.
        return NextResponse.json({ received: false }, { status: 500 })
    }
}
