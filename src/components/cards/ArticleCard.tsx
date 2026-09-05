import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Article } from "@/src/action/articleController"

export function ArticleCard({ article }: { article: Article }) {
    const date = article.date
        ? new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : ""

    return (
        <Link href={`/articles/${article.slug}`} className="card block" style={{ textDecoration: "none" }}>
            <div
                style={{
                    background: T.white,
                    border: `1px solid ${T.border}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    height: "100%",
                }}
            >
                <div style={{ height: 180, position: "relative", overflow: "hidden", background: T.warm }}>
                    {article.image ? (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="h-full w-full object-cover object-center static!"
                        />
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 40,
                            }}
                        >
                            📰
                        </div>
                    )}
                    {article.categories[0] && (
                        <div
                            style={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: T.white,
                                color: T.rust,
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                padding: "5px 10px",
                                borderRadius: 5,
                            }}
                        >
                            {article.categories[0]}
                        </div>
                    )}
                </div>
                <div className="px-4 pt-4 pb-5">
                    <h3
                        style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: 19,
                            fontWeight: 600,
                            margin: "0 0 8px",
                            color: T.ink,
                            lineHeight: 1.25,
                        }}
                    >
                        {article.title}
                    </h3>
                    <p
                        style={{
                            fontSize: 13,
                            color: T.muted,
                            lineHeight: 1.6,
                            margin: "0 0 12px",
                        }}
                    >
                        {article.excerpt}
                    </p>
                    <div style={{ fontSize: 11, color: T.muted }}>
                        {date}
                        {date && " · "}
                        {article.readTime} min read
                    </div>
                </div>
            </div>
        </Link>
    )
}
