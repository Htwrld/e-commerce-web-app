import { BADGE_COLORS } from "@/src/lib/tokens";

interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  const color = BADGE_COLORS[text] ?? "#888";
  return (
    <span
      style={{
        background: color + "22",
        color,
        border: `1px solid ${color}44`,
        borderRadius: 4,
        padding: "2px 9px",
        fontSize: 10,
        letterSpacing: "0.1em",
        fontFamily: "monospace",
        whiteSpace: "nowrap",
        fontWeight: 700,
      }}
    >
      {text}
    </span>
  );
}
