import Image from "next/image"
import Link from "next/link"
import { T } from "@/src/lib/tokens"
import { Article } from "@/src/action/articleController"

export function RecentPostCard({ article }: { article: Article }) {
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
            style={{ textDecoration: "none", display: "flex", gap: 12, alignItems: "flex-start" }}
        >
            <div
                style={{
                    position: "relative",
                    width: 72,
                    height: 72,
                    flexShrink: 0,
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
                            fontSize: 20,
                        }}
                    >
                        📰
                    </div>
                )}
            </div>
            <div style={{ minWidth: 0 }}>
                <h4
                    style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 15,
                        fontWeight: 600,
                        margin: "0 0 6px",
                        color: T.ink,
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {article.title}
                </h4>
                <div style={{ fontSize: 11, color: T.muted }}>{date}</div>
            </div>
        </Link>
    )
}
