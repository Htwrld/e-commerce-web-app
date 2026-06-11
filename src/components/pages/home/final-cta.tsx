import { T } from "@/src/lib/tokens"
import Link from "next/link"

const FinalCTA = () => {
    return (
        <section
            style={{
                background: `linear-gradient(135deg,${T.charcoal},#3A3228)`,
                padding: "100px 28px",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ fontSize: 52, marginBottom: 20, opacity: 0.6, color: T.gold }}>✝</div>
                <h2
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "clamp(28px,6vw,54px)",
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 18px",
                        lineHeight: 1.05,
                    }}
                >
                    Don&rsquo;t just wear clothes.
                    <br />
                    Wear a message.
                </h2>
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(16px,2.5vw,20px)",
                        fontStyle: "italic",
                        color: "#B0A898",
                        lineHeight: 1.7,
                        marginBottom: 36,
                    }}
                >
                    You weren&rsquo;t made to blend in. You were created to stand out — with
                    purpose.
                </p>
                <Link
                    className="btn-primary"
                    href="/shop"
                    style={{ fontSize: 16, padding: "16px 40px" }}
                >
                    Start Your Journey With HTW →
                </Link>
            </div>
        </section>
    )
}

export default FinalCTA
