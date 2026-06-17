import { T } from "@/src/lib/tokens"
import Image from "next/image"
import Link from "next/link"

const FinalCTA = ({
    title,
    description,
    buttonTitle,
}: {
    title: string
    description: string
    buttonTitle: string
}) => {
    return (
        <section
            style={{
                background: `linear-gradient(135deg,${T.charcoal},#3A3228)`,
                padding: "100px 28px",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
                <div style={{ fontSize: 52, marginBottom: 20, opacity: 0.6, color: T.gold }}>
                    <Image src="/favicon.png" alt="" width={50} height={50} />
                </div>
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
                    {title}
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
                    {description}
                </p>
                <Link
                    className="btn-primary"
                    href="/shop"
                    style={{ fontSize: 16, padding: "16px 40px" }}
                >
                    {buttonTitle}
                </Link>
            </div>
        </section>
    )
}

export default FinalCTA
