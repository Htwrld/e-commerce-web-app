import { NavbarandFooter } from "@/src/action/pageController"
import { T } from "@/src/lib/tokens"

export function Ticker({ footerandnavbar }: { footerandnavbar: NavbarandFooter }) {
    return (
        <div
            style={{
                background: T.rust,
                overflow: "hidden",
                height: 32,
                display: "flex",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    animation: "ticker 24s linear infinite",
                    whiteSpace: "nowrap",
                }}
            >
                {[0, 1].map((r) => (
                    <span
                        key={r}
                        style={{
                            fontSize: 11,
                            color: "#fff",
                            letterSpacing: "0.14em",
                            padding: "0 48px",
                            fontFamily: "monospace",
                            fontWeight: 700,
                        }}
                    >
                        {footerandnavbar.navbar_scrollbar}
                    </span>
                ))}
            </div>
        </div>
    )
}
