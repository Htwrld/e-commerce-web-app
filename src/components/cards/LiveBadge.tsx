import { T } from "@/src/lib/tokens"
import type { CSSProperties } from "react"

export function LiveBadge({ style }: { style?: CSSProperties }) {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: T.rust,
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "5px 10px",
                borderRadius: 5,
                ...style,
            }}
        >
            <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                style={{ flexShrink: 0, animation: "pulse 1.4s ease-in-out infinite" }}
            >
                <circle cx="4" cy="4" r="4" fill="#fff" />
            </svg>
            Live
        </div>
    )
}
