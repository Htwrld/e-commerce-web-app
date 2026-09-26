import { TrackOrderPage } from "@/src/components/sections/TrackOrderPage"

export const metadata = { title: "Track Your Order - HTW — Hope's Trendy World" }

const TrackRoute = async ({
    searchParams,
}: {
    searchParams: Promise<{ order?: string; email?: string }>
}) => {
    const { order, email } = await searchParams
    return (
        <main>
            <TrackOrderPage initialOrder={order ?? ""} initialEmail={email ?? ""} />
        </main>
    )
}

export default TrackRoute
