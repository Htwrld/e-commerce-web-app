import { getArticleBySlug, getArticles } from "@/src/action/articleController"
import { SingleArticleView } from "@/src/components/sections/SingleArticleView"
import { notFound } from "next/navigation"

const SingleArticlePage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params
    const article = await getArticleBySlug(slug)

    if (!article) return notFound()

    const { articles } = await getArticles({})

    return <SingleArticleView article={article} articles={articles} />
}

export default SingleArticlePage
