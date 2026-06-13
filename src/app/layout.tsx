import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
    title: "HTW — Hope's Trendy World",
    description:
        "Faith-inspired fashion for bold living. Scripture in every stitch, purpose in every piece.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="google-site-verification"
                    content="mARbYPLciqUcG99d5NlX4tVLIj6N6aNdnmHA-WRDzHU"
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
