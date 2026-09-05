import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "blog.hopestrendyworld.com",
                port: "",
                pathname: "/wp-content/uploads/**",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
                port: "",
                pathname: "/vi/**",
            },
        ],
    },
}

export default nextConfig
