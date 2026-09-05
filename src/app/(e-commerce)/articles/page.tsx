import { getArticles } from "@/src/action/articleController"
import { ArticlesPage } from "@/src/components/sections/ArticlesPage"
import { Suspense } from "react"

export const metadata = { title: "Blog" }

const ArticlesRoute = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const params = await searchParams
    const page = params.page as string
    const { articles, pages } = await getArticles({
        page: page ? parseInt(page) : undefined,
    })

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ArticlesPage articles={articles} pages={pages} />
            </Suspense>
        </main>
    )
}

export default ArticlesRoute
