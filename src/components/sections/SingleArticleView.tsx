import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Article } from "@/src/action/articleController"
import { ArticleCard } from "@/src/components/cards/ArticleCard"

export const SingleArticleView = ({
    article,
    articles,
}: {
    article: Article
    articles: Article[]
}) => {
    const date = article.date
        ? new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : ""
    const related = articles.filter((a) => a.id !== article.id).slice(0, 3)

    return (
        <main>
            <div style={{ maxWidth: 780, margin: "0 auto", padding: "44px 28px" }}>
                <Link
                    href="/articles"
                    style={{
                        fontSize: 12,
                        color: T.gold,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        textDecoration: "none",
                    }}
                >
                    ← All Posts
                </Link>

                <div style={{ margin: "20px 0" }}>
                    {article.categories.length > 0 && (
                        <div
                            style={{
                                fontSize: 10,
                                color: T.gold,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                fontWeight: 700,
                                marginBottom: 10,
                            }}
                        >
                            {article.categories.join(" · ")}
                        </div>
                    )}
                    <h1
                        className="section-title"
                        style={{ fontSize: "clamp(30px,5vw,46px)", marginBottom: 12 }}
                    >
                        {article.title}
                    </h1>
                    <div style={{ fontSize: 13, color: T.muted }}>
                        {article.author}
                        {article.author && date && " · "}
                        {date}
                        {" · "}
                        {article.readTime} min read
                    </div>
                </div>

                {article.image && (
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: 420,
                            borderRadius: 14,
                            overflow: "hidden",
                            marginBottom: 32,
                        }}
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="h-full w-full object-cover object-center static!"
                        />
                    </div>
                )}

                <div
                    className="article-content"
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 19,
                        lineHeight: 1.8,
                        color: T.charcoal,
                    }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />
            </div>

            {related.length > 0 && (
                <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px 60px" }}>
                    <div className="divider" style={{ margin: "40px 0 24px" }} />
                    <h2 className="section-title" style={{ fontSize: 26, marginBottom: 20 }}>
                        More Stories
                    </h2>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
                            gap: 22,
                        }}
                    >
                        {related.map((a) => (
                            <ArticleCard key={a.id} article={a} />
                        ))}
                    </div>
                </div>
            )}
        </main>
    )
}
