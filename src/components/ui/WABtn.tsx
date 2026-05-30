interface WABtnProps {
  text?: string;
  product?: string;
}

export function WABtn({ text = "Order via WhatsApp", product = "" }: WABtnProps) {
  const msg = encodeURIComponent(`Hi HTW! I'd like to order: ${product || "an item from your store"}`);
  return (
    <a
      href={`https://wa.me/2348000000000?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: "#25D366",
        color: "#fff",
        padding: "10px 16px",
        borderRadius: 8,
        textDecoration: "none",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'Georgia',serif",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
        transition: "opacity .2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      💬 {text}
    </a>
  );
}
