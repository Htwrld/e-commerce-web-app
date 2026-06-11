import { T } from "@/src/lib/tokens"
import Link from "next/link"

const PieceBanner = ({ title, description }: { title: string; description: string }) => {
    return (
        <section
            style={{
                background: "linear-gradient(135deg,#E0ECF8 0%,#C4D8F0 50%,#DCF0E6 100%)",
                padding: "72px 28px",
                textAlign: "center",
            }}
        >
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <p className="section-label" style={{ color: T.cobalt }}>
                    SHOP THE LOOK
                </p>
                <h2
                    className="section-title"
                    style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: 14 }}
                >
                    {title}
                </h2>
                <p
                    style={{
                        fontFamily: "'EB Garamond',serif",
                        fontSize: "clamp(15px,2vw,19px)",
                        fontStyle: "italic",
                        color: T.muted,
                        marginBottom: 28,
                        lineHeight: 1.7,
                    }}
                >
                    {description}
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: 12,
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Link className="btn-primary" href="/shop">
                        Shop Women&rsquo;s Sets
                    </Link>
                    <Link className="btn-secondary" href="/shop">
                        Shop Men&rsquo;s Sets
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default PieceBanner
