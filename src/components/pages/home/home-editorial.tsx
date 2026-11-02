import Link from "next/link"
import { Heart, Shirt, Users, BookOpen, ShoppingBag } from "lucide-react"
import type { Product } from "@/src/action/productController"
import type { Style } from "@/src/action/styleController"
import type { Article } from "@/src/action/articleController"
import type { FashionPageContent } from "@/src/action/pageController"
import {
    EditorialImage,
    Journal,
    MagazineFeature,
    SectionHeading,
} from "@/src/components/editorial/Editorial"
import { Newsletter } from "@/src/components/editorial/Newsletter"
import "@/src/components/editorial/editorial.css"

const categories = [
    { name: "Hoodies", slug: "hoodies", image: "/images/hoodie_lifestyle.png" },
    { name: "Tees & Polos", slug: "polos-tees", image: "/images/tee_she.jpg" },
    { name: "Joggers", slug: "joggers", image: "/images/polo_twopiece.jpg" },
    { name: "2-Piece Sets", slug: "2-piece-sets", image: "/images/polo_twopiece.jpg" },
    { name: "Ankara", slug: "ankara", image: "/images/unnamed.webp" },
    { name: "Kids", slug: "kids", image: "/images/tee_she.jpg" },
    { name: "Family", slug: "family-collections", image: "/images/hoodie_lifestyle.png" },
]
const values = [
    { icon: Heart, title: "Faith-Centered Designs", text: "Style that reflects your values." },
    {
        icon: Shirt,
        title: "Premium Quality",
        text: "Made for comfort, durability and everyday confidence.",
    },
    { icon: Users, title: "A Growing Community", text: "People, stories and conversations." },
    {
        icon: BookOpen,
        title: "Fashion & Publishing",
        text: "More than a store. A lifestyle and a platform for bold living.",
    },
]
export function HomeEditorial({
    products,
    styles,
    articles,
    publishing,
}: {
    products: Product[]
    styles: Style[]
    articles: Article[]
    publishing: FashionPageContent
}) {
    return (
        <div className="ed-page">
            <div className="ed-container">
                <section className="ed-world ed-section">
                    <div>
                        <p className="ed-label">THE HTW WORLD</p>
                        <h2>Wear It. Read It. Live It.</h2>
                        <p>
                            A fashion and publishing platform built around faith, style, culture and
                            the way we choose to live.
                        </p>
                    </div>
                    <Link href="/shop" className="ed-world-card">
                        <EditorialImage
                            src={products[0]?.photo || "/images/hoodie_lifestyle.png"}
                            alt="Faith-inspired HTW fashion"
                        />
                        <div>
                            <p className="ed-label">HTW FASHION</p>
                            <h3>Wear the Message</h3>
                            <p>Faith-inspired clothing for everyday life.</p>
                            <span className="ed-button ed-button-gold">Shop Now →</span>
                        </div>
                    </Link>
                    <Link href="/publishing" className="ed-world-card">
                        <EditorialImage
                            src={publishing.magazine_cover_image || "/images/magazine-cover.jpg"}
                            alt="HTW Publishing"
                        />
                        <div>
                            <p className="ed-label">HTW PUBLISHING</p>
                            <h3>Read the Story</h3>
                            <p>Articles, magazine, videos and real conversations.</p>
                            <span className="ed-button">Explore Now →</span>
                        </div>
                    </Link>
                </section>
                <section className="ed-section">
                    <SectionHeading
                        label="NEW AT HTW"
                        title="Featured Pieces"
                        href="/shop"
                        link="View All Products →"
                    />
                    <div className="ed-products">
                        {products.slice(0, 4).map((p) => (
                            <article key={p.id} className="ed-product">
                                <Link href={`/shop/${p.id}`}>
                                    <EditorialImage src={p.photo} alt={p.name} />
                                    <h3>{p.name}</h3>
                                </Link>
                                <div className="ed-product-bottom">
                                    <div>
                                        <p className="ed-price">
                                            {new Intl.NumberFormat("en-NG", {
                                                style: "currency",
                                                currency: "NGN",
                                                maximumFractionDigits: 0,
                                            }).format(Number(p.price))}
                                        </p>
                                        <div
                                            className="ed-colors"
                                            aria-label={`Colors: ${p.colors.join(", ")}`}
                                        >
                                            {p.colors.slice(0, 4).map((c) => (
                                                <span key={c} style={{ background: c }} />
                                            ))}
                                        </div>
                                    </div>
                                    <Link
                                        className="ed-shop-icon"
                                        href={`/shop/${p.id}`}
                                        aria-label={`Choose options for ${p.name}`}
                                    >
                                        <ShoppingBag size={19} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                    {!products.length && (
                        <Link href="/shop" className="ed-text-link">
                            Explore the collection →
                        </Link>
                    )}
                </section>
                <section className="ed-section">
                    <SectionHeading
                        label="SHOP BY CATEGORY"
                        title="Find Your Style"
                        href="/shop"
                        link="View All Categories →"
                    />
                    <div className="ed-categories">
                        {categories.map((c) => (
                            <Link href={`/shop?cat=${c.slug}`} key={c.slug}>
                                <EditorialImage
                                    src={
                                        products.find((p) =>
                                            p.categories.some(
                                                (category) =>
                                                    category.toLowerCase() ===
                                                        c.name.toLowerCase() ||
                                                    category.toLowerCase() === c.slug
                                            )
                                        )?.photo || c.image
                                    }
                                    alt={c.name}
                                />
                                <h3>{c.name}</h3>
                            </Link>
                        ))}
                    </div>
                </section>
                <MagazineFeature content={publishing} home />
                <Journal articles={articles} home />
            </div>
            <section className="ed-styled">
                <div className="ed-container">
                    <SectionHeading
                        label="STYLED BY THE COMMUNITY"
                        title="Bold Living Looks Like This"
                        href="/ambassadors"
                    />
                    <p className="ed-intro">
                        Real people. Real moments. From the streets of Uyo to London church steps.
                    </p>
                    <div className="ed-style-grid">
                        {styles.slice(0, 6).map((s) => (
                            <EditorialImage
                                key={s.id}
                                src={s.image}
                                alt={`${s.title} — ${s.handle}, ${s.city}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className="ed-values ed-container">
                {values.map((v) => (
                    <div key={v.title}>
                        <span>
                            <v.icon size={23} fill="currentColor" />
                        </span>
                        <div>
                            <h3>{v.title}</h3>
                            <p>{v.text}</p>
                        </div>
                    </div>
                ))}
            </section>
            <Newsletter />
        </div>
    )
}
