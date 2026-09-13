"use server"

const website_url = process.env.WORDPRESS_URL_ENDPOINT
const REVALIDATE_SECONDS = 60

export type Comment = {
    id: number
    author: string
    avatar: string
    date: string
    content: string
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim()

const mapComment = (c: any): Comment => ({
    id: c.id,
    author: c.author_name || "Anonymous",
    avatar: c.author_avatar_urls?.["96"] ?? c.author_avatar_urls?.["48"] ?? "",
    date: c.date ?? "",
    content: c.content?.rendered ? stripHtml(c.content.rendered) : "",
})

export const getComments = async (postId: number): Promise<Comment[]> => {
    try {
        const endpoint = `${website_url}wp-json/wp/v2/comments?post=${postId}&per_page=100&order=asc`
        const res = await fetch(endpoint, {
            signal: AbortSignal.timeout(8000),
            next: { revalidate: REVALIDATE_SECONDS },
        })
        if (!res.ok) return []

        const data = await res.json()
        return data.map(mapComment)
    } catch (e) {
        return []
    }
}

export const addComment = async ({
    postId,
    name,
    email,
    content,
    verifiedHuman,
}: {
    postId: number
    name: string
    email: string
    content: string
    verifiedHuman: boolean
}): Promise<{ success: boolean; comment?: Comment; pending?: boolean; error?: string }> => {
    // The "I'm not a robot" checkbox is an honor-system gate, not a real
    // captcha — it stops casual/opportunistic spam but a scripted bot could
    // still set this flag itself.
    if (!verifiedHuman) {
        return { success: false, error: "Please confirm you're not a robot." }
    }
    if (!name.trim() || !email.trim() || !content.trim()) {
        return { success: false, error: "Name, email and comment are required." }
    }

    try {
        const endpoint = `${website_url}wp-json/wp/v2/comments`
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                post: postId,
                author_name: name,
                author_email: email,
                content,
            }),
        })

        const data = await res.json()
        if (!res.ok) {
            return { success: false, error: data?.message ?? "Could not post comment." }
        }

        // WordPress holds new/anonymous comments for moderation by default
        // (status "hold"), so they won't be in getComments' list until approved.
        return { success: true, comment: mapComment(data), pending: data.status !== "approved" }
    } catch (e) {
        return { success: false, error: "Could not post comment." }
    }
}
