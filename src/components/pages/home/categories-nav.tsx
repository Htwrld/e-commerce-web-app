import Link from "next/link"
import { T } from "@/src/lib/tokens"

const CategoriesNav = () => {
    return (
        <section
                        style={{
                            background: T.white,
                            padding: "32px 28px",
                            borderTop: `1px solid ${T.border}`,
                            borderBottom: `1px solid ${T.border}`,
                        }}
                    >
                        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                            <p
                                style={{
                                    textAlign: "center",
                                    fontSize: 10,
                                    letterSpacing: "0.22em",
                                    color: T.gold,
                                    fontWeight: 700,
                                    marginBottom: 14,
                                    textTransform: "uppercase",
                                }}
                            >
                                Shop by Category
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                }}
                            >
                                {[
                                    ["Sweatshirts", "🧥"],
                                    ["Hoodies", "🫙"],
                                    ["Joggers", "👟"],
                                    ["Polos & Tees", "👔"],
                                    ["2-Piece Sets", "👗"],
                                ].map(([cat, ico]) => (
                                    <Link
                                        key={cat}
                                        className="btn-outline-gold"
                                        href={`/shop?cat=${cat}`}
                                        style={{
                                            padding: "9px 20px",
                                            borderRadius: 24,
                                            fontSize: 13,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                        }}
                                    >
                                        {ico} {cat}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
    )
}

export default CategoriesNav