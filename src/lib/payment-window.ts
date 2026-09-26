import { getPaymentStatus } from "@/src/action/orderController"

// /checkout/complete?popup=1 posts { orderId, paid } here when Flutterwave
// redirects the payment window back to us. A BroadcastChannel is used instead
// of window.opener because payment pages can cut the opener link.
export const PAYMENT_CHANNEL = "htw-payment"

export type PaymentMessage = { orderId: number; paid: boolean }

// Must be called synchronously from the click handler, before any await,
// or the browser's popup blocker will stop it. Phones open it as a tab.
export const openPaymentWindow = (): Window | null => {
    const width = 480
    const height = 720
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2
    const win = window.open(
        "",
        "htw-payment",
        `popup=yes,width=${width},height=${height},left=${left},top=${top}`
    )
    try {
        win!.document.title = "Secure payment"
        win!.document.body.innerHTML =
            '<p style="font-family:Georgia,serif;text-align:center;margin-top:40vh;color:#6b6258">Loading secure payment…</p>'
    } catch {
        // Blocked (null), or a leftover window still on Flutterwave's origin.
    }
    return win
}

export const waitForPayment = (win: Window, orderId: number, orderKey: string) => {
    let finish: (paid: boolean) => void = () => {}

    const result = new Promise<{ paid: boolean }>((resolve) => {
        const channel = new BroadcastChannel(PAYMENT_CHANNEL)
        let done = false
        let checking = false
        let closedChecks = 0

        const timer = setInterval(async () => {
            if (!win.closed || checking) return
            // Closed without reporting back: the customer closed it, or the
            // webhook got there first. Ask WooCommerce a few times before
            // treating it as cancelled.
            checking = true
            const { paid } = await getPaymentStatus(orderId, orderKey)
            checking = false
            if (paid || ++closedChecks >= 3) finish(paid)
        }, 2000)

        finish = (paid) => {
            if (done) return
            done = true
            clearInterval(timer)
            channel.close()
            resolve({ paid })
        }

        channel.onmessage = (e: MessageEvent<PaymentMessage>) => {
            if (e.data?.orderId === orderId) finish(e.data.paid)
        }
    })

    const cancel = () => {
        win.close()
        finish(false)
    }

    return { result, cancel }
}
