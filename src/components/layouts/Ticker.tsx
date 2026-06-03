import { T } from "@/src/lib/tokens"

export function Ticker() {
    const text =
        "✝ FREE DELIVERY IN LAGOS \u00a0·\u00a0 SHIPS NATIONWIDE \u00a0·\u00a0 DIASPORA ORDERS WELCOME \u00a0·\u00a0 ₦ NGN & $ USD \u00a0·\u00a0 WHATSAPP SUPPORT \u00a0·\u00a0 SCRIPTURE IN EVERY STITCH \u00a0·\u00a0 #WEARHOPELIVEBBOLD \u00a0·\u00a0"
    return (
        <div
            style={{
                background: T.rust,
                overflow: "hidden",
                height: 32,
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    animation: "ticker 24s linear infinite",
                    whiteSpace: "nowrap",
                }}
            >
                {[0, 1].map((r) => (
                    <span
                        key={r}
                        style={{
                            fontSize: 11,
                            color: "#fff",
                            letterSpacing: "0.14em",
                            padding: "0 48px",
                            fontFamily: "monospace",
                            fontWeight: 700,
                        }}
                    >
                        {text}
                    </span>
                ))}
            </div>
        </div>
    )
}
