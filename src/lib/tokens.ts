// ─── DESIGN TOKENS ───
export const T = {
  gold:     "#C9923A",
  goldLt:   "#E8B96A",
  goldPale: "#FDF0DC",
  rust:     "#C94A2A",
  rustLt:   "#F5C4B8",
  sage:     "#3B7A57",
  sageLt:   "#C8E6D6",
  cobalt:   "#1C4F8A",
  cobaltLt: "#C4D8F0",
  ink:      "#1A1612",
  charcoal: "#2E2A25",
  warm:     "#F7F0E6",
  cream:    "#FDF8F2",
  sand:     "#EFE4B0",
  white:    "#FFFFF9",
  muted:    "#7A6E67",
  border:   "#E4D8C4",
} as const;

export const BADGE_COLORS: Record<string, string> = {
  NEW:           T.sage,
  BESTSELLER:    T.gold,
  LIMITED:       T.rust,
  POPULAR:       T.cobalt,
  "COMING SOON": T.muted,
};
