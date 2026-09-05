import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"
import { WP_TAG_BY_PAGE_ID, WP_TAG_BY_POST_TYPE, WpTag } from "@/src/lib/wpTags"

// Called by a WordPress save-post webhook to bust the ISR cache for the
// affected content immediately, instead of waiting for the 5-minute
// time-based revalidation in the *Controller.ts fetches.
export async function POST(req: NextRequest) {
    const secret = req.nextUrl.searchParams.get("secret") ?? req.headers.get("x-revalidate-secret")
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ revalidated: false, message: "Invalid secret" }, { status: 401 })
    }

    const tagsParam = req.nextUrl.searchParams.get("tag")
    const postType = req.nextUrl.searchParams.get("post_type")
    const pageId = req.nextUrl.searchParams.get("page_id")

    const tags = new Set<WpTag>()
    if (tagsParam) {
        for (const t of tagsParam.split(",")) tags.add(t.trim() as WpTag)
    }
    if (postType && WP_TAG_BY_POST_TYPE[postType]) {
        tags.add(WP_TAG_BY_POST_TYPE[postType])
    }
    if (pageId && WP_TAG_BY_PAGE_ID[Number(pageId)]) {
        tags.add(WP_TAG_BY_PAGE_ID[Number(pageId)])
    }

    if (tags.size === 0) {
        return NextResponse.json(
            { revalidated: false, message: "No matching tag for the given tag/post_type/page_id" },
            { status: 400 }
        )
    }

    // { expire: 0 } forces an immediate purge instead of just re-tagging
    // future cache life, matching the old single-argument revalidateTag behavior.
    for (const tag of tags) revalidateTag(tag, { expire: 0 })

    return NextResponse.json({ revalidated: true, tags: [...tags] }, { status: 200 })
}
