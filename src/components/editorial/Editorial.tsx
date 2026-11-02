import Image from "next/image"
import Link from "next/link"
import type { Article } from "@/src/action/articleController"
import type { FashionPageContent } from "@/src/action/pageController"

export function EditorialImage({
    src,
    alt,
    className = "",
}: {
    src: string
    alt: string
    className?: string
}) {
    return (
        <div className={`ed-image ${className}`}>
            <Image
                src={src || "/images/hoodie_lifestyle.png"}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
            />
        </div>
    )
}
export function SectionHeading({
    label,
    title,
    href,
    link = "View More →",
}: {
    label: string
    title: string
    href?: string
    link?: string
}) {
    return (
        <div className="ed-heading">
            <div>
                <p className="ed-label">{label}</p>
                <h2>{title}</h2>
            </div>
            {href && (
                <Link className="ed-text-link" href={href}>
                    {link}
                </Link>
            )}
        </div>
    )
}
export function MagazineFeature({
    content,
    home = false,
}: {
    content?: FashionPageContent
    home?: boolean
}) {
    return (
        <section className={`ed-magazine ${home ? "ed-magazine-home" : ""}`} id="magazine">
            <div className="ed-magazine-copy">
                <p className="ed-label">HTW FASHION MAGAZINE</p>
                <h2>{home ? "The Hope Edit" : "The Magazine for Fashion, Faith & Purpose."}</h2>
                <p>
                    {content?.magazine_short_description ||
                        "A quarterly digital magazine filled with editorials, personal stories, style guides and conversations with people making an impact."}
                </p>
                <Link className="ed-button" href="/publishing/magazine">
                    Read the Latest Issue →
                </Link>
                <p className="ed-issue">
                    Vol 01 &nbsp; | &nbsp; Issue 01 &nbsp; | &nbsp; The Anniversary Edition
                </p>
            </div>
            <Link href="/publishing/magazine" aria-label="Read HTW Fashion magazine">
                <EditorialImage
                    className="ed-cover"
                    src={content?.magazine_cover_image || "/images/magazine-cover.jpg"}
                    alt="HTW Fashion magazine — The Anniversary Edition"
                />
            </Link>
        </section>
    )
}
export function Journal({ articles, home = false }: { articles: Article[]; home?: boolean }) {
    return (
        <section className={`ed-section ed-journal ${home ? "ed-journal-home" : ""}`} id="articles">
            <SectionHeading
                label="FROM THE JOURNAL"
                title={
                    home ? "Latest Articles" : "Fresh Ideas. Useful Stories. Honest Conversations."
                }
                href="/articles"
                link="Read All Articles →"
            />
            {!home && (
                <p className="ed-intro">
                    Read our latest articles on fashion, styling, faith, culture and the stories
                    behind the things we wear and believe.
                </p>
            )}
            <div className="ed-article-grid">
                {articles.slice(0, home ? 3 : 4).map((a) => (
                    <Link href={`/articles/${a.slug}`} key={a.id} className="ed-article">
                        <EditorialImage src={a.image} alt={a.title} />
                        <div>
                            <p className="ed-label">{a.categories[0] || "FASHION & FAITH"}</p>
                            <h3>{a.title}</h3>
                            <p className="ed-meta">
                                {new Date(a.date).toLocaleDateString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}{" "}
                                · {a.readTime} min read
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {articles.length === 0 && (
                <p className="ed-intro">
                    New stories are on the way. Explore the journal for more inspiration.
                </p>
            )}
        </section>
    )
}
