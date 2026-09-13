import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Article } from "@/src/action/articleController"
import { formatViewCount } from "@/src/lib/utils"
import { CommentsSection } from "@/src/components/sections/CommentsSection"

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
            <div
                style={{
                    maxWidth: 1160,
                    margin: "0 auto",
                    padding: "44px 28px 60px",
                    display: "flex",
                    gap: 48,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <div style={{ flex: "1 1 640px", minWidth: 0 }}>
                    <div style={{ margin: "0 0 20px" }}>
                        <h1
                            className="section-title"
                            style={{ fontSize: "clamp(30px,5vw,46px)", marginBottom: 12 }}
                        >
                            {article.title}
                        </h1>
                        <div style={{ fontSize: 13, color: T.muted }}>
                            {article.author}
                            {article.author && " · "}
                            {article.categories.length > 0 && (
                                <span
                                    style={{
                                        color: T.gold,
                                        letterSpacing: "0.05em",
                                        textTransform: "uppercase",
                                        fontWeight: 700,
                                    }}
                                >
                                    {article.categories.join(" · ")}
                                </span>
                            )}
                            {article.categories.length > 0 && " · "}
                            {date}
                            {" · "}
                            {article.readTime} min read
                            {" · "}
                            {formatViewCount(article.views)} views
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

                    <CommentsSection postId={article.id} />
                </div>

                {related.length > 0 && (
                    <aside style={{ flex: "1 1 280px", maxWidth: 340, width: "100%" }}>
                        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 18 }}>
                            More Stories
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                            {related.map((a) => (
                                <SidebarArticleCard key={a.id} article={a} />
                            ))}
                        </div>
                    </aside>
                )}
            </div>
        </main>
    )
}

const SidebarArticleCard = ({ article }: { article: Article }) => {
    const date = article.date
        ? new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : ""

    return (
        <Link
            href={`/articles/${article.slug}`}
            style={{
                display: "flex",
                gap: 14,
                textDecoration: "none",
                paddingBottom: 18,
                borderBottom: `1px solid ${T.border}`,
            }}
        >
            <div
                style={{
                    position: "relative",
                    flex: "0 0 84px",
                    width: 84,
                    height: 84,
                    borderRadius: 10,
                    overflow: "hidden",
                    background: T.warm,
                }}
            >
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
                            fontSize: 22,
                        }}
                    >
                        📰
                    </div>
                )}
            </div>
            <div style={{ minWidth: 0 }}>
                <h3
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 16,
                        fontWeight: 600,
                        margin: "0 0 6px",
                        color: T.ink,
                        lineHeight: 1.3,
                    }}
                >
                    {article.title}
                </h3>
                <div style={{ fontSize: 11, color: T.muted }}>
                    {date}
                    {date && " · "}
                    {article.readTime} min read
                    {" · "}
                    {formatViewCount(article.views)} views
                </div>
            </div>
        </Link>
    )
}
