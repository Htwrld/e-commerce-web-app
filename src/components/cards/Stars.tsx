import { T } from "@/src/lib/tokens";

export function Stars({ n = 5 }: { n?: number }) {
  return <span style={{ color: T.gold, fontSize: 13 }}>{"★".repeat(n)}</span>;
}
