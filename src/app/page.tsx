'use client'

import { useState, useEffect } from "react"

/* ─── DESIGN TOKENS ─── */
const T = {
  gold: "#C9923A",
  goldLt: "#E8B96A",
  goldPale: "#FDF0DC",
  rust: "#C94A2A",
  rustLt: "#F5C4B8",
  sage: "#3B7A57",
  sageLt: "#C8E6D6",
  cobalt: "#1C4F8A",
  cobaltLt: "#C4D8F0",
  ink: "#1A1612",
  charcoal: "#2E2A25",
  warm: "#F7F0E6",
  cream: "#FDF8F2",
  sand: "#EFE4D0",
  white: "#FFFFFF",
  muted: "#7A6E62",
  border: "#E4D8C4",
}

/* ─── IMAGE PATHS ─── */
const IMG = {
  hoodie_mockup: "/mnt/user-data/uploads/1000445196.jpg",
  hoodie_lifestyle: "/mnt/user-data/uploads/1000431783.png",
  tee_walkbyfaith: "/mnt/user-data/uploads/1000432352.png",
  tee_she: "/mnt/user-data/uploads/1000435830.png",
  twopiece_black: "/mnt/user-data/uploads/1000445194.jpg",
  polo_twopiece: "/mnt/user-data/uploads/1000445198.jpg",
}

/* ─── PRODUCTS ─── */
const PRODUCTS = [
  {
    id: 1,
    name: "Grace Season Crewneck",
    subname: "Limited Drop",
    cat: "Sweatshirts",
    gender: "Unisex",
    price: "₦22,000",
    usd: "$14",
    verse: "Phil 4:13",
    verseText: "I can do all things through Christ who strengthens me.",
    badge: "NEW",
    colors: ["#C9923A", "#1C4F8A", "#3B7A57"],
    bg: "#1A1612",
    img: IMG.hoodie_mockup,
    imgFit: "cover",
    story: "Draped in grace, built for every season.",
  },
  {
    id: 2,
    name: "Crowned Oversized Crew",
    subname: "Signature Piece",
    cat: "Sweatshirts",
    gender: "Female",
    price: "₦24,500",
    usd: "$16",
    verse: "1 Pet 2:9",
    verseText: "You are a chosen people, a royal priesthood.",
    badge: "BESTSELLER",
    colors: ["#C94A2A", "#FDF8F2", "#C9923A"],
    bg: "#1A1612",
    img: IMG.hoodie_lifestyle,
    imgFit: "cover",
    story: "Worn by the ones who know who they are.",
  },
  {
    id: 3,
    name: "Trust God Bro Hoodie",
    subname: "Easter Drop",
    cat: "Hoodies",
    gender: "Unisex",
    price: "₦28,000",
    usd: "$18",
    verse: "Pro 3:5",
    verseText: "Trust in the Lord with all your heart.",
    badge: "NEW",
    colors: ["#1A1612", "#C9923A", "#FDF8F2"],
    bg: "#1A1612",
    img: IMG.hoodie_mockup,
    imgFit: "cover",
    story: "Every step is a statement of faith.",
  },
  {
    id: 4,
    name: "He Wore It First Zip Hoodie",
    subname: "Limited Edition",
    cat: "Hoodies",
    gender: "Male",
    price: "₦32,000",
    usd: "$20",
    verse: "Isa 61:10",
    verseText: "He has clothed me with garments of salvation.",
    badge: "LIMITED",
    colors: ["#1A1612", "#C9923A", "#FDF8F2"],
    bg: "#2C2416",
    img: IMG.hoodie_lifestyle,
    imgFit: "cover",
    story: "The most important garment ever worn.",
  },
  {
    id: 5,
    name: "Grace Season Joggers",
    subname: "Comfort Line",
    cat: "Joggers",
    gender: "Unisex",
    price: "₦18,500",
    usd: "$12",
    verse: "Isa 40:31",
    verseText: "They will run and not grow weary.",
    badge: "NEW",
    colors: ["#3B7A57", "#FDF8F2", "#C9923A"],
    bg: "#DCF0E6",
    img: null,
    imgFit: "cover",
    story: "Move in grace — literally.",
  },
  {
    id: 6,
    name: "Warrior Joggers",
    subname: "Power Edition",
    cat: "Joggers",
    gender: "Male",
    price: "₦20,000",
    usd: "$13",
    verse: "Eph 6:10",
    verseText: "Be strong in the Lord and in his mighty power.",
    badge: "POPULAR",
    colors: ["#C94A2A", "#1A1612", "#C9923A"],
    bg: "#F5E0DC",
    img: null,
    imgFit: "cover",
    story: "Warrior posture in every stride.",
  },
  {
    id: 7,
    name: "Kingdom Polo 2-Piece",
    subname: "Premium Set",
    cat: "Polos & Tees",
    gender: "Male",
    price: "₦48,000",
    usd: "$31",
    verse: "Col 3:17",
    verseText: "Whatever you do, do it all for the glory of God.",
    badge: "BESTSELLER",
    colors: ["#C9923A", "#FDF8F2", "#1A1612"],
    bg: "#C9A87A",
    img: IMG.polo_twopiece,
    imgFit: "cover",
    story: "Polo sharp enough for every room you enter.",
  },
  {
    id: 8,
    name: "Walk By Faith Oversized Tee",
    subname: "Statement Piece",
    cat: "Polos & Tees",
    gender: "Unisex",
    price: "₦10,500",
    usd: "$7",
    verse: "2 Cor 5:6",
    verseText: "For we live by faith, not by sight.",
    badge: "NEW",
    colors: ["#1A1612", "#C94A2A", "#FDF8F2"],
    bg: "#1A1612",
    img: IMG.tee_walkbyfaith,
    imgFit: "cover",
    story: "Your faith is louder than your circumstances.",
  },
  {
    id: 9,
    name: "She Prays + Trusts + Wins Tee",
    subname: "Her Statement",
    cat: "Polos & Tees",
    gender: "Female",
    price: "₦12,000",
    usd: "$8",
    verse: "Pro 31:25",
    verseText: "She is clothed with strength and dignity.",
    badge: "POPULAR",
    colors: ["#7BA8C9", "#FDF8F2", "#C9923A"],
    bg: "#A8C4E0",
    img: IMG.tee_she,
    imgFit: "cover",
    story: "She prays. She trusts. She wins. Always.",
  },
  {
    id: 10,
    name: "Prestige Croc 2-Piece Set",
    subname: "His Collection",
    cat: "2-Piece Sets",
    gender: "Male",
    price: "₦55,000",
    usd: "$35",
    verse: "Ps 112:2",
    verseText: "His children will be mighty in the land.",
    badge: "NEW",
    colors: ["#1A1612", "#C9923A", "#2C2416"],
    bg: "#1A1612",
    img: IMG.twopiece_black,
    imgFit: "cover",
    story: "Built for the man who carries purpose in his posture.",
  },
  {
    id: 11,
    name: "Kingdom Polo Set",
    subname: "Beige Edition",
    cat: "2-Piece Sets",
    gender: "Male",
    price: "₦48,000",
    usd: "$31",
    verse: "Ps 112:2",
    verseText: "His children will be mighty in the land.",
    badge: "BESTSELLER",
    colors: ["#C9923A", "#FDF8F2", "#1A1612"],
    bg: "#E8D5B0",
    img: IMG.polo_twopiece,
    imgFit: "cover",
    story: "Step into every room like you own your purpose.",
  },
  {
    id: 12,
    name: "Couple Faith 2-Piece Set",
    subname: "Together Drop",
    cat: "2-Piece Sets",
    gender: "Unisex",
    price: "₦40,000",
    usd: "$26",
    verse: "Ecc 4:9",
    verseText: "Two are better than one.",
    badge: "LIMITED",
    colors: ["#3B7A57", "#C9923A", "#FDF8F2"],
    bg: "#1A1612",
    img: IMG.twopiece_black,
    imgFit: "cover",
    story: "Match in style. Move in purpose. Together.",
  },
]

const CATS = [
  "All",
  "Sweatshirts",
  "Hoodies",
  "Joggers",
  "Polos & Tees",
  "2-Piece Sets",
]
const GENDERS = ["All", "Male", "Female", "Unisex"]

const AMBASSADORS = [
  {
    name: "Adaeze K.",
    city: "Lagos",
    handle: "@adaeze.k",
    emoji: "👸🏾",
    quote: '"HTW makes me feel like royalty AND like myself."',
    color: T.rust,
  },
  {
    name: "Emeka T.",
    city: "Abuja",
    handle: "@emeka.t",
    emoji: "👨🏾‍💼",
    quote: '"Every piece I wear from HTW starts a conversation."',
    color: T.cobalt,
  },
  {
    name: "Chisom B.",
    city: "Port Harcourt",
    handle: "@chisom.b",
    emoji: "💃🏾",
    quote: '"I stopped buying fast fashion the day I found HTW."',
    color: T.gold,
  },
  {
    name: "Tunde W.",
    city: "London",
    handle: "@tunde.w",
    emoji: "🎤",
    quote: '"Bold living has a uniform. It\'s HTW."',
    color: T.sage,
  },
]

const TESTIMONIALS = [
  {
    text: "This brand makes me feel confident and grounded at the same time. Every piece feels intentional.",
    name: "Blessing A.",
    city: "Lagos",
    stars: 5,
  },
  {
    text: "It's more than fashion — it's a statement. I wore the 2-piece set to church and got 30 compliments.",
    name: "Ngozi E.",
    city: "Enugu",
    stars: 5,
  },
  {
    text: "Quality is insane for the price. Shipped to the UK in 4 days. HTW is the real deal.",
    name: "Femi J.",
    city: "London",
    stars: 5,
  },
  {
    text: "I've never felt more like myself in a piece of clothing. The verse tags alone make it worth it.",
    name: "Amara O.",
    city: "Abuja",
    stars: 5,
  },
]

const WHY_HTW = [
  {
    icon: "✝️",
    title: "Purpose-Driven Design",
    desc: "Every piece carries meaning. Every stitch tells a story rooted in faith.",
  },
  {
    icon: "💎",
    title: "Premium Quality",
    desc: "Built for comfort, durability, and style — designed to outlast fast fashion.",
  },
  {
    icon: "🔥",
    title: "Bold Identity",
    desc: "Stand out without saying a word. Your outfit speaks first.",
  },
  {
    icon: "🌍",
    title: "Global Vision",
    desc: "Inspired locally in Nigeria. Designed and worn across the world.",
  },
]

/* ─── HELPERS ─── */
const badgeClr = {
  NEW: T.sage,
  BESTSELLER: T.gold,
  LIMITED: T.rust,
  POPULAR: T.cobalt,
  "COMING SOON": T.muted,
}
const Badge = ({ text }) => (
  <span
    style={{
      background: badgeClr[text] + "22",
      color: badgeClr[text],
      border: `1px solid ${badgeClr[text]}44`,
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
)

const Stars = ({ n = 5 }) => (
  <span style={{ color: T.gold, fontSize: 13 }}>{"★".repeat(n)}</span>
)

const VerseChip = ({ verse, verseText }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: T.goldPale,
          border: `1px solid ${T.gold}55`,
          color: T.charcoal,
          borderRadius: 20,
          padding: "4px 12px",
          fontSize: 11,
          cursor: "pointer",
          fontFamily: "'Georgia',serif",
          letterSpacing: "0.04em",
          fontWeight: 600,
        }}
      >
        ✝ {verse}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100%+8px)",
            left: 0,
            background: T.white,
            border: `1px solid ${T.gold}55`,
            borderRadius: 10,
            padding: "14px 16px",
            width: 240,
            fontSize: 13,
            color: T.charcoal,
            lineHeight: 1.7,
            zIndex: 60,
            boxShadow: "0 8px 40px rgba(0,0,0,0.13)",
            fontStyle: "italic",
          }}
        >
          "{verseText}"
          <div
            style={{
              fontSize: 11,
              color: T.gold,
              marginTop: 4,
              fontStyle: "normal",
              fontWeight: 700,
            }}
          >
            — {verse}
          </div>
        </div>
      )}
    </div>
  )
}

const WABtn = ({ text = "Order via WhatsApp", product = "" }) => {
  const msg = encodeURIComponent(
    `Hi HTW! I'd like to order: ${product || "an item from your store"}`
  )
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
      onMouseEnter={(e) => (e.currentTarget.style.opacity = ".85")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      💬 {text}
    </a>
  )
}

/* ─── PRODUCT CARD ─── */
const ProductCard = ({ p, onAdd, onClick }) => (
  <div
    onClick={() => onClick(p)}
    className="card"
    style={{
      background: T.white,
      border: `1px solid ${T.border}`,
      borderRadius: 14,
      overflow: "hidden",
      cursor: "pointer",
    }}
  >
    <div
      style={{
        height: 220,
        background: p.bg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {p.img ? (
        <img
          src={p.img}
          alt={p.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
      ) : null}
      {/* Fallback shown if no img or img fails */}
      <div
        style={{
          width: "100%",
          height: "100%",
          background: p.bg,
          display: p.img ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        👕
      </div>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <Badge text={p.badge} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "rgba(255,255,255,0.9)",
          color: T.muted,
          borderRadius: 20,
          padding: "2px 10px",
          fontSize: 10,
          fontFamily: "monospace",
          fontWeight: 700,
        }}
      >
        {p.gender.toUpperCase()}
      </div>
    </div>
    <div style={{ padding: "16px 18px 18px" }}>
      <div
        style={{
          fontSize: 10,
          color: T.muted,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: 3,
        }}
      >
        {p.cat}
      </div>
      <h3
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 18,
          fontWeight: 600,
          margin: "0 0 2px",
          color: T.ink,
          lineHeight: 1.2,
        }}
      >
        {p.name}
      </h3>
      <div
        style={{
          fontSize: 12,
          color: T.muted,
          marginBottom: 8,
          fontStyle: "italic",
        }}
      >
        {p.subname}
      </div>
      <p
        style={{
          fontSize: 12,
          color: T.muted,
          lineHeight: 1.6,
          margin: "0 0 10px",
          fontStyle: "italic",
        }}
      >
        {p.story}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 18, color: T.rust, fontWeight: 700 }}>
          {p.price}
        </span>
        <span style={{ fontSize: 12, color: "#BBB" }}>{p.usd}</span>
      </div>
      <div style={{ marginBottom: 12 }}>
        <VerseChip verse={p.verse} verseText={p.verseText} />
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {p.colors.map((c, i) => (
          <div
            key={i}
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: c,
              border: `2px solid ${T.border}`,
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onAdd(p)
          }}
          style={{
            flex: 1,
            background: T.gold,
            color: T.white,
            border: "none",
            padding: "9px 0",
            fontSize: 12,
            cursor: "pointer",
            borderRadius: 7,
            fontFamily: "'Georgia',serif",
            fontWeight: 700,
            letterSpacing: "0.04em",
            transition: "background .2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.rust)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.gold)}
        >
          Add to Cart
        </button>
        <WABtn text="Order" product={p.name} />
      </div>
    </div>
  </div>
)

/* ═══════════════════════════════ MAIN APP ═══════════════════════════════ */
export default function HTW() {
  const [page, setPage] = useState("home")
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [activeCat, setActiveCat] = useState("All")
  const [activeGen, setActiveGen] = useState("All")
  const [detailProd, setDetailProd] = useState(null)
  const [form, setForm] = useState({ name: "", email: "", city: "", ig: "" })
  const [formSent, setFormSent] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [checkForm, setCheckForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "paystack",
  })

  const heroBgs = [
    "linear-gradient(135deg,#FDF0DC 0%,#F5D898 50%,#EFE4D0 100%)",
    "linear-gradient(135deg,#DCF0E6 0%,#A8D8BC 50%,#C8E6D6 100%)",
    "linear-gradient(135deg,#F5E0DC 0%,#F5B8A8 50%,#EDD4CC 100%)",
  ]
  const heroAccents = [T.gold, T.sage, T.rust]
  const heroTitles = [
    "Wear Hope. Live Bold.",
    "Walk in Grace. Stand in Purpose.",
    "You Were Made to Stand Out.",
  ]
  const heroSubs = [
    "Faith-inspired fashion for a generation that refuses to blend in.",
    "A new standard of bold living — rooted in faith, draped in style.",
    "Confidence, faith, and identity — stitched into every piece.",
  ]

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % 3), 5000)
    return () => clearInterval(t)
  }, [])

  const addToCart = (p) => {
    setCart((c) => {
      const ex = c.find((x) => x.id === p.id)
      return ex
        ? c.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { ...p, qty: 1 }]
    })
    setToast(`${p.name} added to cart!`)
    setTimeout(() => setToast(null), 2800)
  }
  const cartCount = cart.reduce((a, c) => a + c.qty, 0)
  const cartTotal = cart.reduce((a, c) => {
    const n = parseInt(c.price.replace(/[^\d]/g, ""))
    return a + n * c.qty
  }, 0)

  const filtered = PRODUCTS.filter(
    (p) =>
      (activeCat === "All" || p.cat === activeCat) &&
      (activeGen === "All" || p.gender === activeGen || p.gender === "Unisex")
  )
  const newArr = PRODUCTS.filter((p) => p.badge === "NEW").slice(0, 4)
  const best = PRODUCTS.filter(
    (p) => p.badge === "BESTSELLER" || p.badge === "POPULAR"
  )

  const nav = [
    { id: "home", l: "Home" },
    { id: "shop", l: "Shop" },
    { id: "ambassadors", l: "Ambassadors" },
    { id: "about", l: "Our Story" },
    { id: "contact", l: "Contact" },
  ]

  const navTo = (id) => {
    setPage(id)
    setMenuOpen(false)
    window.scrollTo && window.scrollTo(0, 0)
  }

  return (
    <div
      style={{
        fontFamily: "'Georgia','Times New Roman',serif",
        background: T.cream,
        color: T.ink,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:${T.gold}88;border-radius:2px;}
        .card{transition:transform .28s,box-shadow .28s;}
        .card:hover{transform:translateY(-6px);box-shadow:0 18px 52px rgba(0,0,0,0.11);}
        .nav-link{transition:color .2s;cursor:pointer;position:relative;}
        .nav-link:hover{color:${T.rust}!important;}
        .nav-link.active::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:${T.gold};border-radius:2px;}
        .btn-primary{background:${T.gold};color:#fff;border:none;padding:13px 30px;font-size:14px;letter-spacing:.07em;cursor:pointer;border-radius:7px;font-family:"Georgia",serif;font-weight:700;transition:background .2s,transform .15s,box-shadow .15s;display:inline-flex;align-items:center;gap:8px;}
        .btn-primary:hover{background:${T.rust};transform:translateY(-2px);box-shadow:0 8px 24px rgba(201,74,42,.35);}
        .btn-secondary{background:none;border:2px solid ${T.ink};color:${T.ink};padding:12px 28px;font-size:13px;letter-spacing:.07em;cursor:pointer;border-radius:7px;font-family:"Georgia",serif;font-weight:600;transition:all .2s;}
        .btn-secondary:hover{background:${T.ink};color:#fff;}
        .btn-outline-gold{background:none;border:2px solid ${T.gold};color:${T.gold};padding:11px 24px;font-size:13px;cursor:pointer;border-radius:7px;font-family:"Georgia",serif;font-weight:600;transition:all .2s;}
        .btn-outline-gold:hover{background:${T.gold};color:#fff;}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        .wa-float{position:fixed;bottom:24px;right:24px;z-index:999;background:#25D366;border-radius:50%;width:54px;height:54px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,.5);text-decoration:none;font-size:26px;transition:transform .2s;animation:pulse 3s ease infinite;}
        .wa-float:hover{transform:scale(1.12);}
        input,select,textarea{outline:none;font-family:"Georgia",serif;}
        input:focus,select:focus,textarea:focus{border-color:${T.gold}!important;}
        .section-label{font-size:10px;letter-spacing:.22em;color:${T.gold};text-transform:uppercase;font-weight:700;margin-bottom:10px;}
        .section-title{font-family:"Cormorant Garamond",serif;font-weight:300;color:${T.ink};line-height:1.1;}
        .divider{width:48px;height:3px;background:${T.gold};border-radius:2px;margin:14px 0;}
        @media(max-width:720px){ .desktop-nav{ display:none !important; } }
        @media(min-width:721px){ .desktop-nav{ display:flex !important; } }
      `}</style>

      {/* Floating WA */}
      <a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        title="Chat with us"
      >
        💬
      </a>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 80,
            right: 20,
            zIndex: 1001,
            background: T.sage,
            color: "#fff",
            padding: "11px 20px",
            borderRadius: 9,
            fontSize: 13,
            fontWeight: 700,
            animation: "slideUp .3s ease",
            boxShadow: "0 4px 20px rgba(59,122,87,.35)",
          }}
        >
          ✓ {toast}
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 998, display: "flex" }}
        >
          <div
            onClick={() => setCartOpen(false)}
            style={{ flex: 1, background: "rgba(0,0,0,0.45)" }}
          />
          <div
            style={{
              width: 360,
              background: T.white,
              padding: 28,
              overflowY: "auto",
              animation: "slideUp .3s ease",
              boxShadow: "-8px 0 48px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 22,
                paddingBottom: 14,
                borderBottom: `1px solid ${T.border}`,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 22,
                  fontWeight: 600,
                }}
              >
                Your Cart ({cartCount})
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 22,
                  cursor: "pointer",
                  color: T.muted,
                }}
              >
                ✕
              </button>
            </div>
            {cart.length === 0 ? (
              <div
                style={{ textAlign: "center", paddingTop: 60, color: T.muted }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 18,
                  }}
                >
                  Your cart is empty
                </p>
                <p style={{ fontSize: 13, marginTop: 6 }}>
                  Add some pieces to get started.
                </p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 16,
                      paddingBottom: 16,
                      borderBottom: `1px solid ${T.sand}`,
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 10,
                        background: item.bg,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      {item.img ? (
                        <img
                          src={item.img}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 26,
                          }}
                        >
                          👕
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: T.ink,
                          marginBottom: 1,
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: T.muted,
                          marginBottom: 3,
                        }}
                      >
                        {item.subname}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 15,
                            color: T.rust,
                            fontWeight: 700,
                          }}
                        >
                          {item.price}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <button
                            onClick={() =>
                              setCart((c) =>
                                c.map((x) =>
                                  x.id === item.id
                                    ? { ...x, qty: Math.max(1, x.qty - 1) }
                                    : x
                                )
                              )
                            }
                            style={{
                              background: T.sand,
                              border: "none",
                              width: 22,
                              height: 22,
                              borderRadius: 4,
                              cursor: "pointer",
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            −
                          </button>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() =>
                              setCart((c) =>
                                c.map((x) =>
                                  x.id === item.id
                                    ? { ...x, qty: x.qty + 1 }
                                    : x
                                )
                              )
                            }
                            style={{
                              background: T.sand,
                              border: "none",
                              width: 22,
                              height: 22,
                              borderRadius: 4,
                              cursor: "pointer",
                              fontSize: 14,
                              fontWeight: 700,
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setCart((c) => c.filter((x) => x.id !== item.id))
                      }
                      style={{
                        background: "none",
                        border: "none",
                        color: "#CCC",
                        cursor: "pointer",
                        fontSize: 18,
                        alignSelf: "flex-start",
                        padding: "0 4px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <div
                  style={{
                    borderTop: `2px solid ${T.border}`,
                    paddingTop: 16,
                    marginTop: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 600 }}>
                      Subtotal
                    </span>
                    <span
                      style={{ fontSize: 16, fontWeight: 700, color: T.rust }}
                    >
                      ₦{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <button
                    className="btn-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                    onClick={() => {
                      setCartOpen(false)
                      setPage("checkout")
                    }}
                  >
                    Proceed to Checkout →
                  </button>
                  <WABtn
                    text="Complete via WhatsApp"
                    product={cart.map((c) => `${c.name} x${c.qty}`).join(", ")}
                  />
                  <p
                    style={{
                      fontSize: 11,
                      color: T.muted,
                      marginTop: 10,
                      lineHeight: 1.6,
                    }}
                  >
                    🔒 Secure checkout · Paystack · Flutterwave · Bank Transfer
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── PRODUCT DETAIL MODAL ── */}
      {detailProd && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 997,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={() => setDetailProd(null)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
          />
          <div
            style={{
              background: T.white,
              borderRadius: 16,
              padding: 28,
              maxWidth: 580,
              width: "100%",
              zIndex: 1,
              animation: "slideUp .3s ease",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setDetailProd(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: T.sand,
                border: "none",
                borderRadius: "50%",
                width: 32,
                height: 32,
                fontSize: 16,
                cursor: "pointer",
                color: T.muted,
                zIndex: 2,
              }}
            >
              ✕
            </button>
            <div
              style={{
                height: 260,
                background: detailProd.bg,
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: 20,
                position: "relative",
              }}
            >
              {detailProd.img ? (
                <img
                  src={detailProd.img}
                  alt={detailProd.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 80,
                  }}
                >
                  👕
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <Badge text={detailProd.badge} />
              <span
                style={{
                  fontSize: 11,
                  color: T.muted,
                  fontFamily: "monospace",
                }}
              >
                {detailProd.gender.toUpperCase()}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 28,
                fontWeight: 600,
                margin: "0 0 2px",
                color: T.ink,
              }}
            >
              {detailProd.name}
            </h2>
            <div
              style={{
                fontSize: 14,
                color: T.muted,
                fontStyle: "italic",
                marginBottom: 12,
              }}
            >
              {detailProd.subname}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 22, color: T.rust, fontWeight: 700 }}>
                {detailProd.price}
              </span>
              <span style={{ fontSize: 14, color: T.muted }}>
                {detailProd.usd}
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: T.charcoal,
                lineHeight: 1.8,
                marginBottom: 14,
                fontStyle: "italic",
              }}
            >
              "{detailProd.story}"
            </p>
            <div style={{ marginBottom: 16 }}>
              <VerseChip
                verse={detailProd.verse}
                verseText={detailProd.verseText}
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 12,
                  color: T.muted,
                  marginBottom: 8,
                  letterSpacing: "0.05em",
                }}
              >
                AVAILABLE COLOURS
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {detailProd.colors.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: c,
                      border: `2px solid ${T.border}`,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div
                style={{
                  fontSize: 12,
                  color: T.muted,
                  marginBottom: 8,
                  letterSpacing: "0.05em",
                }}
              >
                SELECT SIZE
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    style={{
                      background: T.sand,
                      border: `1px solid ${T.border}`,
                      color: T.ink,
                      padding: "6px 12px",
                      borderRadius: 6,
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "'Georgia',serif",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="btn-primary"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => {
                  addToCart(detailProd)
                  setDetailProd(null)
                }}
              >
                Add to Cart
              </button>
              <WABtn text="Order Now" product={detailProd.name} />
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 14,
                background: T.warm,
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: T.charcoal,
                  marginBottom: 10,
                  letterSpacing: "0.06em",
                }}
              >
                PRODUCT DETAILS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  [
                    "🧵 Fabric",
                    detailProd.cat === "2-Piece Sets"
                      ? "Premium woven blend"
                      : "380gsm cotton-polyester blend",
                  ],
                  [
                    "📐 Fit",
                    detailProd.gender === "Female"
                      ? "Relaxed feminine cut"
                      : "Modern oversized fit",
                  ],
                  ["✂️ Care", "Machine wash cold · Inside out · No tumble dry"],
                  ["🚚 Delivery", "Lagos 1–3 days · Nationwide 3–7 days"],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    style={{
                      background: T.white,
                      borderRadius: 6,
                      padding: "8px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: T.gold,
                        marginBottom: 2,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: 12, color: T.muted }}>{val}</div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: T.sage,
                  fontWeight: 600,
                }}
              >
                ✓ Embroidered scripture tag &nbsp;·&nbsp; ✓ Pre-shrunk
                &nbsp;·&nbsp; ✓ True to size &nbsp;·&nbsp; ✓ Secure packaging
              </div>
              <div style={{ marginTop: 6, fontSize: 12, color: T.muted }}>
                📏 Size guide: XS (6–8) · S (8–10) · M (10–12) · L (12–14) · XL
                (14–16) · XXL (16–18)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 90,
          background: "rgba(253,248,242,0.97)",
          backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            padding: "0 20px",
          }}
        >
          {/* Logo */}
          <div
            onClick={() => navTo("home")}
            style={{ cursor: "pointer", flexShrink: 0, minWidth: 0 }}
          >
            <div
              style={{
                fontSize: 8,
                letterSpacing: "0.2em",
                color: T.gold,
                textTransform: "uppercase",
                fontWeight: 700,
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              Hope's Trendy World
            </div>
            <div
              style={{
                fontSize: 24,
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 700,
                color: T.ink,
                lineHeight: 1,
              }}
            >
              HTW
            </div>
          </div>

          {/* Desktop nav links — hidden on small screens via inline media workaround */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {nav.map((n) => (
              <span
                key={n.id}
                className={`nav-link${page === n.id ? "active" : ""}`}
                onClick={() => navTo(n.id)}
                style={{
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  color: page === n.id ? T.rust : T.charcoal,
                  fontWeight: page === n.id ? 700 : 400,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {n.l}
              </span>
            ))}
          </div>

          {/* Right: cart + hamburger */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setCartOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 20,
                position: "relative",
                padding: 4,
              }}
            >
              🛒
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    background: T.rust,
                    color: "#fff",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: "none",
                border: `1.5px solid ${T.border}`,
                borderRadius: 6,
                width: 36,
                height: 36,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 2,
                  background: T.charcoal,
                  borderRadius: 2,
                  display: "block",
                }}
              />
              <span
                style={{
                  width: 16,
                  height: 2,
                  background: T.charcoal,
                  borderRadius: 2,
                  display: "block",
                }}
              />
              <span
                style={{
                  width: 16,
                  height: 2,
                  background: T.charcoal,
                  borderRadius: 2,
                  display: "block",
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile / dropdown menu */}
        {menuOpen && (
          <div
            style={{
              background: T.white,
              borderTop: `1px solid ${T.border}`,
              animation: "slideUp .2s ease",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            {nav.map((n) => (
              <div
                key={n.id}
                onClick={() => navTo(n.id)}
                style={{
                  padding: "14px 24px",
                  fontSize: 16,
                  fontFamily: "'Cormorant Garamond',serif",
                  color: page === n.id ? T.rust : T.ink,
                  cursor: "pointer",
                  borderBottom: `1px solid ${T.sand}`,
                  fontWeight: page === n.id ? 700 : 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {n.l}
                <span style={{ color: T.muted, fontSize: 14 }}>→</span>
              </div>
            ))}
            <div
              style={{
                padding: "14px 24px",
                borderTop: `2px solid ${T.border}`,
              }}
            >
              <WABtn text="Order via WhatsApp" />
            </div>
          </div>
        )}
      </nav>

      {/* ── TICKER ── */}
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
              ✝ FREE DELIVERY IN LAGOS &nbsp;·&nbsp; SHIPS NATIONWIDE
              &nbsp;·&nbsp; DIASPORA ORDERS WELCOME &nbsp;·&nbsp; ₦ NGN &amp; $
              USD &nbsp;·&nbsp; WHATSAPP SUPPORT &nbsp;·&nbsp; SCRIPTURE IN
              EVERY STITCH &nbsp;·&nbsp; #WEARHOPELIVEBBOLD &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── PAGE ROUTER ── */}
      {page === "home" && (
        <HomePage
          navTo={navTo}
          heroIdx={heroIdx}
          heroBgs={heroBgs}
          heroAccents={heroAccents}
          heroTitles={heroTitles}
          heroSubs={heroSubs}
          newArr={newArr}
          best={best}
          addToCart={addToCart}
          onProduct={setDetailProd}
          setActiveCat={setActiveCat}
          setActiveGen={setActiveGen}
        />
      )}
      {page === "shop" && (
        <ShopPage
          products={filtered}
          cats={CATS}
          genders={GENDERS}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          activeGen={activeGen}
          setActiveGen={setActiveGen}
          addToCart={addToCart}
          onProduct={setDetailProd}
        />
      )}
      {page === "collections" && (
        <CollectionsPage
          navTo={navTo}
          setActiveCat={setActiveCat}
          setActiveGen={setActiveGen}
        />
      )}
      {page === "about" && <AboutPage navTo={navTo} />}
      {page === "ambassadors" && (
        <AmbassadorsPage
          ambassadors={AMBASSADORS}
          form={form}
          setForm={setForm}
          formSent={formSent}
          setFormSent={setFormSent}
        />
      )}
      {page === "contact" && <ContactPage />}
      {page === "checkout" && (
        <CheckoutPage
          cart={cart}
          cartTotal={cartTotal}
          step={checkoutStep}
          setStep={setCheckoutStep}
          form={checkForm}
          setForm={setCheckForm}
          navTo={navTo}
        />
      )}
      {page === "policy" && <PolicyPage />}

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: T.charcoal,
          color: "#B0A898",
          padding: "60px 28px 28px",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 40,
              marginBottom: 48,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: "0.3em",
                  color: T.gold,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                HOPE'S TRENDY WORLD
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                HTW
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.8,
                  marginBottom: 16,
                  color: "#888",
                }}
              >
                Faith-inspired fashion for bold living. Scripture in every
                stitch.
              </p>
              <div
                style={{
                  fontStyle: "italic",
                  fontFamily: "'EB Garamond',serif",
                  fontSize: 14,
                  color: T.gold,
                  marginBottom: 16,
                }}
              >
                "You were made to stand out."
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {["📘", "📸", "▶️", "🎵"].map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 20,
                      cursor: "pointer",
                      opacity: 0.65,
                      transition: "opacity .2s",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: T.gold,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                SHOP
              </div>
              {[
                "New Arrivals",
                "Best Sellers",
                "Sweatshirts",
                "Hoodies",
                "Joggers",
                "Polos & Tees",
                "2-Piece Sets",
                "Size Guide",
              ].map((l) => (
                <div
                  key={l}
                  onClick={() => navTo("shop")}
                  style={{
                    fontSize: 13,
                    color: "#888",
                    marginBottom: 9,
                    cursor: "pointer",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: T.gold,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                INFO
              </div>
              {[
                ["about", "Our Story"],
                ["ambassadors", "Ambassadors"],
                ["contact", "Contact Us"],
                ["policy", "Shipping Policy"],
                ["policy", "Return Policy"],
                ["policy", "Privacy Policy"],
              ].map(([p, l]) => (
                <div
                  key={l}
                  onClick={() => navTo(p)}
                  style={{
                    fontSize: 13,
                    color: "#888",
                    marginBottom: 9,
                    cursor: "pointer",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  color: T.gold,
                  marginBottom: 16,
                  fontWeight: 700,
                }}
              >
                ORDER SUPPORT
              </div>
              <WABtn text="Chat on WhatsApp" />
              <div style={{ marginTop: 18 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "#888",
                    marginBottom: 10,
                    fontWeight: 600,
                  }}
                >
                  💳 Accepted Payments
                </div>
                {[
                  "Paystack",
                  "Flutterwave",
                  "Bank Transfer",
                  "Visa / Mastercard",
                ].map((p) => (
                  <div
                    key={p}
                    style={{ fontSize: 12, color: "#666", marginBottom: 6 }}
                  >
                    · {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #3A3530",
              paddingTop: 22,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 12, color: "#555" }}>
              © 2026 Hope's Trendy World. All rights reserved.
            </div>
            <div style={{ fontSize: 12, color: "#555", fontStyle: "italic" }}>
              "Dressed for the kingdom." &nbsp;·&nbsp; Made in Nigeria 🇳🇬
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ══════════════════════════ HOME PAGE ══════════════════════════ */
function HomePage({
  navTo,
  heroIdx,
  heroBgs,
  heroAccents,
  heroTitles,
  heroSubs,
  newArr,
  best,
  addToCart,
  onProduct,
  setActiveCat,
  setActiveGen,
}) {
  const [faqOpen, setFaqOpen] = useState(null)
  const [emailSub, setEmailSub] = useState("")
  const [subDone, setSubDone] = useState(false)
  const [waNumber, setWaNumber] = useState("")
  const [waDone, setWaDone] = useState(false)

  const faqs = [
    {
      q: "What sizes do you carry?",
      a: "All HTW pieces come in XS, S, M, L, XL, and XXL. Check the size guide on each product page for measurements. When in doubt, size up — our pieces are designed with a modern relaxed fit.",
    },
    {
      q: "How long does delivery take?",
      a: "Lagos: 1–3 business days (free on orders ₦50,000+). Nationwide: 3–7 business days. International (UK, US, Canada): 7–14 business days. You'll get a tracking update via WhatsApp once your order ships.",
    },
    {
      q: "What is your return policy?",
      a: "We accept returns within 14 days of delivery. Items must be unworn and in original packaging with tags attached. Contact us via WhatsApp with your order number to start a return.",
    },
    {
      q: "What fabrics do you use?",
      a: "Our hoodies and sweatshirts are 380gsm premium cotton-polyester blend — thick, soft, and built to last. Tees and polos are 100% combed ringspun cotton. 2-piece sets vary by design — fabric details are listed on each product page.",
    },
    {
      q: "Can I order via WhatsApp?",
      a: "Absolutely — in fact it's one of our most popular order methods. Just tap the WhatsApp button on any product page or use the floating button, and our team will process your order directly.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes! We ship to the UK, USA, Canada, Europe, and more. International customers can pay via Flutterwave using USD or GBP. Delivery takes 7–14 business days.",
    },
    {
      q: "Are the scripture verses printed or embroidered?",
      a: "Depending on the piece — graphic tees use high-quality screen printing, while premium sweatshirts and hoodies use embroidered verse tags. Details are listed on each product page.",
    },
  ]

  const lifestyleShots = [
    {
      img: IMG.hoodie_lifestyle,
      label: "Street Style",
      tag: "@tunde.w — London",
      col: T.ink,
    },
    {
      img: IMG.tee_walkbyfaith,
      label: "Walk By Faith",
      tag: "@emeka.t — Abuja",
      col: "#1A1612",
    },
    {
      img: IMG.tee_she,
      label: "She Prays. She Wins.",
      tag: "@chisom.b — Port Harcourt",
      col: "#7BA8C9",
    },
    {
      img: IMG.polo_twopiece,
      label: "Kingdom Living",
      tag: "@adaeze.k — Lagos",
      col: T.gold,
    },
    {
      img: IMG.twopiece_black,
      label: "Prestige Set",
      tag: "@pastor_c — Enugu",
      col: "#1A1612",
    },
    {
      img: IMG.hoodie_mockup,
      label: "Trust God Bro",
      tag: "@blessing.a — Lagos",
      col: T.ink,
    },
  ]

  return (
    <div>
      {/* ── 1. HERO — stronger CTAs, dominant headline, 3-button layout ── */}
      <section
        style={{
          minHeight: "92vh",
          background: heroBgs[heroIdx],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px 100px",
          position: "relative",
          overflow: "hidden",
          transition: "background 1.4s ease",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: heroAccents[heroIdx] + "15",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: heroAccents[heroIdx] + "10",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "5%",
            fontSize: 80,
            opacity: 0.04,
            pointerEvents: "none",
            color: T.charcoal,
          }}
        >
          ✝
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "14%",
            right: "6%",
            fontSize: 60,
            opacity: 0.04,
            pointerEvents: "none",
            color: T.charcoal,
          }}
        >
          ✝
        </div>

        {/* Lifestyle image strip — adds visual product context to hero */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "30%",
            display: "flex",
            flexDirection: "column",
            opacity: 0.18,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {[IMG.hoodie_lifestyle, IMG.tee_she, IMG.polo_twopiece].map(
            (src, i) => (
              <div key={i} style={{ flex: 1, overflow: "hidden" }}>
                {src && (
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                )}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 720,
            animation: "slideUp .9s ease",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: heroAccents[heroIdx],
              color: "#fff",
              borderRadius: 20,
              padding: "5px 20px",
              fontSize: 11,
              letterSpacing: "0.2em",
              fontFamily: "monospace",
              fontWeight: 700,
              marginBottom: 22,
            }}
          >
            ✝ EASTER 2026 · NEW COLLECTION
          </div>

          {/* Dominant headline */}
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(52px,12vw,100px)",
              fontWeight: 700,
              margin: "0 0 16px",
              lineHeight: 0.92,
              color: T.ink,
              letterSpacing: "-0.025em",
            }}
          >
            Faith-Inspired
            <br />
            Fashion for
            <br />
            Bold Living.
          </h1>

          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: "clamp(16px,2.5vw,21px)",
              color: T.charcoal,
              margin: "0 0 10px",
              fontStyle: "italic",
              lineHeight: 1.6,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {heroSubs[heroIdx]}
          </p>
          <p
            style={{
              fontSize: 13,
              color: T.muted,
              marginBottom: 36,
              letterSpacing: "0.04em",
            }}
          >
            Scripture in every stitch. Purpose in every piece.
          </p>

          {/* 3-button CTA layout */}
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              style={{ fontSize: 14, padding: "14px 28px" }}
              onClick={() => {
                setActiveCat("All")
                setActiveGen("Male")
                navTo("shop")
              }}
            >
              Shop Men
            </button>
            <button
              className="btn-primary"
              style={{ fontSize: 14, padding: "14px 28px", background: T.rust }}
              onClick={() => {
                setActiveCat("All")
                setActiveGen("Female")
                navTo("shop")
              }}
            >
              Shop Women
            </button>
            <button
              className="btn-secondary"
              style={{ fontSize: 14, padding: "13px 26px" }}
              onClick={() => navTo("collections")}
            >
              New Collection
            </button>
          </div>
          <p style={{ fontSize: 12, color: T.muted, marginTop: 16 }}>
            Free delivery in Lagos &nbsp;·&nbsp; Ships nationwide &nbsp;·&nbsp;
            WhatsApp orders welcome
          </p>
        </div>

        <div
          style={{ position: "absolute", bottom: 28, display: "flex", gap: 8 }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: i === heroIdx ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === heroIdx ? heroAccents[heroIdx] : "#CCC",
                transition: "all .45s",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── 2. TRUST BAR — properly labeled, mobile grid layout ── */}
      <section style={{ background: T.ink, padding: "28px 24px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: T.gold,
              fontWeight: 700,
              marginBottom: 16,
              textTransform: "uppercase",
            }}
          >
            Why Shop With HTW
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
              gap: 12,
            }}
          >
            {[
              ["🔒", "Secure Checkout", "Paystack & Flutterwave"],
              ["🚚", "Free Lagos Delivery", "On orders ₦50,000+"],
              ["↩️", "Easy Returns", "14-day return policy"],
              ["💬", "WhatsApp Support", "Order & track via chat"],
              ["🌍", "Ships Worldwide", "UK · USA · Canada & more"],
            ].map(([ico, title, sub], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{ico}</span>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#FFF",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {title}
                  </div>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
                    {sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BRAND STATEMENT ── */}
      <section
        style={{
          background: T.white,
          padding: "72px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p className="section-label" style={{ textAlign: "center" }}>
            OUR MISSION
          </p>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 16 }}
          >
            Fashion with Purpose
          </h2>
          <div className="divider" style={{ margin: "14px auto 24px" }} />
          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: "clamp(18px,3vw,26px)",
              fontStyle: "italic",
              color: T.charcoal,
              lineHeight: 1.75,
              marginBottom: 20,
            }}
          >
            What you wear should say something — before you even speak.
          </p>
          <p
            style={{
              fontSize: "clamp(14px,2vw,17px)",
              color: T.muted,
              lineHeight: 1.9,
              marginBottom: 32,
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            At Hope's Trendy World, we create more than clothing. We create
            pieces that reflect identity, ignite confidence, and carry a message
            of faith into everyday life.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              ["500+", "Happy Customers"],
              ["12+", "Pieces in Store"],
              ["4", "Seasonal Drops"],
              ["100%", "Faith-Driven"],
            ].map(([num, lbl]) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(28px,5vw,44px)",
                    fontWeight: 700,
                    color: T.rust,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: T.muted,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  {lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. BEST SELLERS — moved near top per brand owner feedback ── */}
      <section style={{ background: T.warm, padding: "80px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <p className="section-label">🔥 TRENDING NOW</p>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(28px,4vw,44px)" }}
              >
                Most Loved Pieces
              </h2>
              <div className="divider" />
              <p style={{ fontSize: 14, color: T.muted, marginTop: 8 }}>
                Worn by a growing community of bold believers — every single
                day.
              </p>
            </div>
            <button className="btn-outline-gold" onClick={() => navTo("shop")}>
              View All →
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: 18,
            }}
          >
            {best.map((p) => (
              <ProductCard
                key={p.id}
                p={p}
                onAdd={addToCart}
                onClick={onProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CATEGORY QUICK NAV ── */}
      <section
        style={{
          background: T.white,
          padding: "32px 28px",
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: 10,
              letterSpacing: "0.22em",
              color: T.gold,
              fontWeight: 700,
              marginBottom: 14,
              textTransform: "uppercase",
            }}
          >
            Shop by Category
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              ["Sweatshirts", "🧥"],
              ["Hoodies", "🫙"],
              ["Joggers", "👟"],
              ["Polos & Tees", "👔"],
              ["2-Piece Sets", "👗"],
            ].map(([cat, ico]) => (
              <button
                key={cat}
                className="btn-outline-gold"
                onClick={() => {
                  setActiveCat(cat)
                  setActiveGen("All")
                  navTo("shop")
                }}
                style={{
                  padding: "9px 20px",
                  borderRadius: 24,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {ico} {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LIFESTYLE GALLERY — real people wearing HTW ── */}
      <section style={{ background: T.sand, padding: "80px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label">STYLED BY THE COMMUNITY</p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 10 }}
            >
              Bold Living Looks Like This
            </h2>
            <div className="divider" style={{ margin: "14px auto" }} />
            <p
              style={{
                fontSize: 14,
                color: T.muted,
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Real HTW community — real moments. From Lagos streets to London
              church steps.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
              gap: 10,
              marginBottom: 24,
            }}
          >
            {lifestyleShots.map((shot, i) => (
              <div
                key={i}
                className="card"
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "3/4",
                  background: shot.col,
                }}
              >
                {shot.img && (
                  <img
                    src={shot.img}
                    alt={shot.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(transparent 40%,rgba(0,0,0,0.8))",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.3,
                    }}
                  >
                    {shot.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.65)",
                      marginTop: 2,
                    }}
                  >
                    {shot.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 6 }}>
              Share your HTW look and get featured:
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 26,
                color: T.rust,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              #WearHopeLiveBold
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background:
                    "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                  color: "#fff",
                  padding: "9px 20px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                📸 Instagram
              </a>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#000",
                  color: "#fff",
                  padding: "9px 20px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                🎵 TikTok
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FEATURED COLLECTION ── */}
      <section
        style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label">FEATURED COLLECTION</p>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(30px,5vw,50px)", marginBottom: 12 }}
          >
            Grace Season Collection
          </h2>
          <div className="divider" style={{ margin: "14px auto" }} />
          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: "clamp(15px,2vw,19px)",
              fontStyle: "italic",
              color: T.muted,
              maxWidth: 600,
              margin: "0 auto 8px",
            }}
          >
            Every season tells a story — and this one is yours.
          </p>
          <p
            style={{
              fontSize: 14,
              color: T.muted,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Crafted for individuals stepping into their purpose with confidence
            and clarity. Timeless designs. Meaningful expression. Everyday
            impact.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: 18,
          }}
        >
          {newArr.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onAdd={addToCart}
              onClick={onProduct}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button className="btn-primary" onClick={() => navTo("shop")}>
            Shop the Collection →
          </button>
        </div>
      </section>

      {/* ── 8. 2-PIECE BANNER ── */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#E0ECF8 0%,#C4D8F0 50%,#DCF0E6 100%)",
          padding: "72px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p className="section-label" style={{ color: T.cobalt }}>
            SHOP THE LOOK
          </p>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: 14 }}
          >
            Matching 2-Piece Sets
          </h2>
          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: "clamp(15px,2vw,19px)",
              fontStyle: "italic",
              color: T.muted,
              marginBottom: 28,
              lineHeight: 1.7,
            }}
          >
            "Two are better than one." — Ecclesiastes 4:9
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary"
              onClick={() => {
                setActiveCat("2-Piece Sets")
                setActiveGen("Female")
                navTo("shop")
              }}
            >
              Shop Women's Sets
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setActiveCat("2-Piece Sets")
                setActiveGen("Male")
                navTo("shop")
              }}
            >
              Shop Men's Sets
            </button>
          </div>
        </div>
      </section>

      {/* ── 9. WHY HTW ── */}
      <section
        style={{ padding: "80px 28px", maxWidth: 1160, margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="section-label">OUR DIFFERENCE</p>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(28px,5vw,48px)", marginBottom: 8 }}
          >
            Why Hope's Trendy World?
          </h2>
          <div className="divider" style={{ margin: "14px auto" }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 20,
          }}
        >
          {WHY_HTW.map((w, i) => (
            <div
              key={i}
              className="card"
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "28px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 42, marginBottom: 14 }}>{w.icon}</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 20,
                  fontWeight: 600,
                  margin: "0 0 10px",
                  color: T.ink,
                }}
              >
                {w.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: T.muted,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {w.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. UGC / COMMUNITY POSTS ── */}
      <section style={{ background: T.white, padding: "80px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p className="section-label">SOCIAL PROOF</p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 8 }}
            >
              What People Are Saying
            </h2>
            <div className="divider" style={{ margin: "14px auto" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 16,
              marginBottom: 48,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="card"
                style={{
                  background: T.warm,
                  border: `1px solid ${T.border}`,
                  borderRadius: 14,
                  padding: "24px 22px",
                }}
              >
                <Stars n={t.stars} />
                <p
                  style={{
                    fontFamily: "'EB Garamond',serif",
                    fontSize: 16,
                    fontStyle: "italic",
                    color: T.charcoal,
                    lineHeight: 1.8,
                    margin: "12px 0 16px",
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 12, color: T.muted }}>{t.city}</div>
              </div>
            ))}
          </div>

          {/* Community photo posts — clearly labelled separator */}
          <div style={{ textAlign: "center", margin: "56px 0 28px" }}>
            <p className="section-label">COMMUNITY POSTS</p>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(22px,3vw,32px)",
                fontWeight: 400,
                color: T.ink,
                margin: "0 0 8px",
              }}
            >
              #WearHopeLiveBold
            </h3>
            <div className="divider" style={{ margin: "12px auto 0" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: 10,
            }}
          >
            {[
              {
                e: "🤩",
                n: "Blessing A.",
                c: "Wore the Royal Cord set to Easter service — 40 compliments 🙏",
                h: 312,
                col: T.rust,
              },
              {
                e: "🥰",
                n: "Ngozi E.",
                c: "HTW puts a verse on every piece. I cry every time I read them 💛",
                h: 204,
                col: T.gold,
              },
              {
                e: "✨",
                n: "Femi J.",
                c: "Arrived in 2 days to the UK! Quality is insane for the price",
                h: 187,
                col: T.sage,
              },
              {
                e: "👑",
                n: "Amara O.",
                c: "The Crowned Sweatshirt is giving EXACTLY what it's supposed to give",
                h: 445,
                col: T.cobalt,
              },
              {
                e: "🙌🏾",
                n: "Pastor C.",
                c: "My whole family wore HTW sets for Christmas. Best decision!",
                h: 289,
                col: T.gold,
              },
              {
                e: "🔥",
                n: "Temi R.",
                c: "The He Wore It First Zip Hoodie had the whole church talking",
                h: 521,
                col: T.rust,
              },
            ].map((post, i) => (
              <div
                key={i}
                className="card"
                style={{
                  background: T.cream,
                  border: `1px solid ${T.border}`,
                  borderRadius: 12,
                  padding: 14,
                  borderTop: `3px solid ${post.col}`,
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{post.e}</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: T.ink,
                    marginBottom: 4,
                  }}
                >
                  {post.n}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    color: T.muted,
                    lineHeight: 1.6,
                    margin: "0 0 8px",
                  }}
                >
                  {post.c}
                </p>
                <div style={{ fontSize: 11, color: post.col, fontWeight: 700 }}>
                  ❤ {post.h}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. AMBASSADORS STRIP ── */}
      <section style={{ background: T.warm, padding: "64px 28px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p className="section-label">REPRESENTING THE KINGDOM</p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 8 }}
            >
              HTW Ambassadors
            </h2>
            <div className="divider" style={{ margin: "14px auto" }} />
            <p style={{ fontSize: 14, color: T.muted }}>
              Real people. Real faith. Real style.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 12,
              marginBottom: 28,
            }}
          >
            {AMBASSADORS.map((a, i) => (
              <div
                key={i}
                className="card"
                style={{
                  background: `${a.color}12`,
                  border: `2px solid ${a.color}33`,
                  borderRadius: 14,
                  padding: "22px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 10 }}>{a.emoji}</div>
                <div
                  style={{
                    fontSize: 16,
                    fontFamily: "'Cormorant Garamond',serif",
                    color: T.ink,
                    marginBottom: 3,
                    fontWeight: 600,
                  }}
                >
                  {a.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: a.color,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {a.handle}
                </div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 8 }}>
                  {a.city}
                </div>
                <p
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    color: T.charcoal,
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {a.quote}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              className="btn-primary"
              onClick={() => navTo("ambassadors")}
            >
              Join the Ambassador Family →
            </button>
          </div>
        </div>
      </section>

      {/* ── 12. FAQ SECTION ── */}
      <section style={{ background: T.cream, padding: "80px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p className="section-label">GOT QUESTIONS?</p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(26px,4vw,42px)", marginBottom: 8 }}
            >
              Frequently Asked Questions
            </h2>
            <div className="divider" style={{ margin: "14px auto" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                style={{
                  background: T.white,
                  border: `1px solid ${T.border}`,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: T.ink,
                      fontFamily: "'Georgia',serif",
                    }}
                  >
                    {f.q}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      color: T.gold,
                      flexShrink: 0,
                      marginLeft: 12,
                      transition: "transform 0.3s",
                      transform: faqOpen === i ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <div
                    style={{
                      padding: "0 20px 16px",
                      borderTop: `1px solid ${T.border}`,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: T.muted,
                        lineHeight: 1.8,
                        margin: "12px 0 0",
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. FINAL CTA ── */}
      <section
        style={{
          background: `linear-gradient(135deg,${T.charcoal},#3A3228)`,
          padding: "100px 28px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div
            style={{
              fontSize: 52,
              marginBottom: 20,
              opacity: 0.6,
              color: T.gold,
            }}
          >
            ✝
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(28px,6vw,54px)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 18px",
              lineHeight: 1.05,
            }}
          >
            Don't just wear clothes.
            <br />
            Wear a message.
          </h2>
          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: "clamp(16px,2.5vw,20px)",
              fontStyle: "italic",
              color: "#B0A898",
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            You weren't made to blend in. You were created to stand out — with
            purpose.
          </p>
          <button
            className="btn-primary"
            style={{ fontSize: 16, padding: "16px 40px" }}
            onClick={() => navTo("shop")}
          >
            Start Your Journey With HTW →
          </button>
        </div>
      </section>

      {/* ── 15. EMAIL + WHATSAPP CAPTURE — dual signup ── */}
      <section style={{ padding: "80px 28px", background: T.warm }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p className="section-label" style={{ textAlign: "center" }}>
              STAY CONNECTED
            </p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(26px,4vw,40px)", marginBottom: 8 }}
            >
              Never Miss a Drop
            </h2>
            <div className="divider" style={{ margin: "14px auto 0" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))",
              gap: 24,
            }}
          >
            {/* Email capture */}
            <div
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: "36px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>📧</div>
              <p className="section-label" style={{ textAlign: "center" }}>
                STAY IN THE LOOP
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(22px,3vw,30px)",
                  fontWeight: 400,
                  margin: "0 0 8px",
                  color: T.ink,
                }}
              >
                Join the HTW Community
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: T.muted,
                  marginBottom: 20,
                  lineHeight: 1.7,
                }}
              >
                Get early access to drops, exclusive discounts, and weekly
                devotional style inspiration.
              </p>
              {subDone ? (
                <div
                  style={{
                    background: `${T.sage}18`,
                    border: `1px solid ${T.sage}44`,
                    borderRadius: 8,
                    padding: "14px",
                    fontSize: 14,
                    color: T.sage,
                    fontWeight: 700,
                  }}
                >
                  ✓ You're in! Welcome to the HTW family 🙏
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `2px solid ${T.gold}`,
                  }}
                >
                  <input
                    type="email"
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="your@email.com"
                    style={{
                      flex: 1,
                      background: T.cream,
                      border: "none",
                      color: T.ink,
                      padding: "12px 16px",
                      fontSize: 14,
                      fontFamily: "'Georgia',serif",
                    }}
                  />
                  <button
                    className="btn-primary"
                    style={{ borderRadius: 0, padding: "0 18px", fontSize: 13 }}
                    onClick={() => setSubDone(true)}
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>

            {/* WhatsApp capture */}
            <div
              style={{
                background: "#EDFAF3",
                border: "2px solid #25D36644",
                borderRadius: 16,
                padding: "36px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "#1A8A3C",
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                GET LAUNCH UPDATES
              </p>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(22px,3vw,30px)",
                  fontWeight: 400,
                  margin: "0 0 8px",
                  color: T.ink,
                }}
              >
                WhatsApp Updates
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: T.muted,
                  marginBottom: 20,
                  lineHeight: 1.7,
                }}
              >
                Get new drops, restock alerts, and exclusive offers — straight
                to your WhatsApp. No spam. Ever.
              </p>
              {waDone ? (
                <div
                  style={{
                    background: "#D4F0E0",
                    border: "1px solid #25D36644",
                    borderRadius: 8,
                    padding: "14px",
                    fontSize: 14,
                    color: "#1A8A3C",
                    fontWeight: 700,
                  }}
                >
                  ✓ Signed up! We'll send updates soon 🎉
                </div>
              ) : (
                <div>
                  <div
                    style={{
                      display: "flex",
                      borderRadius: 8,
                      overflow: "hidden",
                      border: "2px solid #25D366",
                      marginBottom: 10,
                    }}
                  >
                    <input
                      type="tel"
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      placeholder="+234 XXX XXX XXXX"
                      style={{
                        flex: 1,
                        background: T.white,
                        border: "none",
                        color: T.ink,
                        padding: "12px 16px",
                        fontSize: 14,
                        fontFamily: "'Georgia',serif",
                      }}
                    />
                    <button
                      style={{
                        background: "#25D366",
                        color: "#fff",
                        border: "none",
                        padding: "0 18px",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Georgia',serif",
                      }}
                      onClick={() => setWaDone(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                  <p style={{ fontSize: 11, color: "#888", margin: 0 }}>
                    By signing up you agree to receive WhatsApp messages from
                    HTW. Unsubscribe anytime.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ══════════════════════════ SHOP PAGE ══════════════════════════ */
function ShopPage({
  products,
  cats,
  genders,
  activeCat,
  setActiveCat,
  activeGen,
  setActiveGen,
  addToCart,
  onProduct,
}) {
  return (
    <div style={{ maxWidth: 1160, margin: "0 auto", padding: "44px 28px" }}>
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">SHOP</p>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(30px,5vw,50px)" }}
        >
          All Pieces
        </h1>
        <div className="divider" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: T.gold,
            fontWeight: 700,
            textTransform: "uppercase",
            marginRight: 4,
          }}
        >
          Category:
        </span>
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCat(c)}
            style={{
              background: activeCat === c ? T.rust : "none",
              border: `2px solid ${activeCat === c ? T.rust : T.border}`,
              color: activeCat === c ? "#fff" : T.muted,
              padding: "8px 20px",
              borderRadius: 24,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Georgia',serif",
              letterSpacing: "0.04em",
              transition: "all .2s",
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 36,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: T.cobalt,
            fontWeight: 700,
            textTransform: "uppercase",
            marginRight: 4,
          }}
        >
          Gender:
        </span>
        {genders.map((g) => (
          <button
            key={g}
            onClick={() => setActiveGen(g)}
            style={{
              background: activeGen === g ? T.cobalt : "none",
              border: `2px solid ${activeGen === g ? T.cobalt : T.border}`,
              color: activeGen === g ? "#fff" : T.muted,
              padding: "7px 16px",
              borderRadius: 20,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Georgia',serif",
              transition: "all .2s",
            }}
          >
            {g}
          </button>
        ))}
      </div>
      {products.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 0",
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 22,
            color: T.muted,
          }}
        >
          No products match this filter.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
            gap: 18,
          }}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
              onAdd={addToCart}
              onClick={onProduct}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════ ABOUT PAGE ══════════════════════════ */
function AboutPage({ navTo }) {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg,#DCF0E6,#A8D8BC)",
          padding: "88px 28px",
          textAlign: "center",
        }}
      >
        <p className="section-label" style={{ color: T.sage }}>
          OUR STORY
        </p>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(36px,7vw,66px)", marginBottom: 16 }}
        >
          Dressed for the Kingdom
        </h1>
        <p
          style={{
            fontFamily: "'EB Garamond',serif",
            fontSize: "clamp(16px,2.5vw,22px)",
            fontStyle: "italic",
            color: "#444",
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          "She is clothed with strength and dignity." — Proverbs 31:25
        </p>
      </section>

      <section
        style={{ maxWidth: 860, margin: "0 auto", padding: "80px 28px" }}
      >
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <p className="section-label" style={{ textAlign: "center" }}>
            IN OUR OWN WORDS
          </p>
          <div className="divider" style={{ margin: "12px auto 24px" }} />
          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: "clamp(18px,3vw,26px)",
              fontStyle: "italic",
              color: T.charcoal,
              lineHeight: 1.8,
              margin: 0,
            }}
          >
            "Hope's Trendy World was born to inspire confidence, faith, and bold
            living through fashion — because we believe your identity should
            never be just what you wear, but why you wear it."
          </p>
        </div>

        {[
          {
            title: "Why We Exist",
            color: T.rust,
            text: "We exist at the intersection of faith and fashion. HTW was founded on the belief that clothing is not neutral — it communicates identity. We design pieces that reflect your values and carry a message that transcends trends.",
          },
          {
            title: "Our Product Range",
            color: T.cobalt,
            text: "From premium sweatshirts and hoodies to comfort-first joggers, sharp polos, everyday graphic tees, and our signature 2-piece sets — every HTW piece is designed with intention. Quality you can feel. Faith you can wear.",
          },
          {
            title: "Faith at the Centre",
            color: T.sage,
            text: "HTW is proudly faith-based. We don't just add scripture to tags — we build entire collections around them. Each seasonal drop is inspired by a biblical theme. Every product description carries the verse that gave it life.",
          },
          {
            title: "Our Community",
            color: T.gold,
            text: "From Lagos to London, Port Harcourt to Toronto — the HTW community refuses to blend in. Our ambassadors aren't just brand partners; they are kingdom representatives spreading the message through every outfit they wear.",
          },
          {
            title: "Our Vision",
            color: T.rust,
            text: "To become Africa's most intentional faith-fashion brand — not just a clothing store, but a global movement for bold living. A brand people choose not because it's trendy, but because it means something.",
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              marginBottom: 48,
              display: "grid",
              gridTemplateColumns: "4px 1fr",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div
              style={{
                background: s.color,
                width: 4,
                height: "100%",
                borderRadius: 2,
                marginTop: 6,
              }}
            />
            <div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: "clamp(20px,3vw,28px)",
                  fontWeight: 600,
                  margin: "0 0 12px",
                  color: s.color,
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontSize: "clamp(14px,1.8vw,16px)",
                  color: T.muted,
                  lineHeight: 2,
                  margin: 0,
                  fontFamily: "'EB Garamond',serif",
                }}
              >
                {s.text}
              </p>
            </div>
          </div>
        ))}

        <div
          style={{
            background: `linear-gradient(135deg,${T.goldPale},#FFE8B8)`,
            border: `2px solid ${T.gold}44`,
            borderRadius: 16,
            padding: "40px",
            textAlign: "center",
            marginTop: 56,
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>✝</div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 30,
              fontWeight: 600,
              color: T.ink,
              margin: "0 0 12px",
            }}
          >
            This is more than fashion.
            <br />
            This is a movement.
          </h3>
          <p
            style={{
              fontFamily: "'EB Garamond',serif",
              fontSize: 20,
              fontStyle: "italic",
              color: T.charcoal,
              margin: "0 0 10px",
              lineHeight: 1.7,
            }}
          >
            "To make faith fashionable, and fashion faithful."
          </p>
          <p style={{ fontSize: 13, color: T.muted }}>
            Headquartered in Nigeria 🇳🇬 · Shipping Worldwide 🌍
          </p>
          <div style={{ marginTop: 24 }}>
            <button className="btn-primary" onClick={() => navTo("shop")}>
              Shop the Movement →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

/* ══════════════════════════ AMBASSADORS ══════════════════════════ */
function AmbassadorsPage({
  ambassadors,
  form,
  setForm,
  formSent,
  setFormSent,
}) {
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg,#DCE8F5,#A8C4E8)",
          padding: "88px 28px",
          textAlign: "center",
        }}
      >
        <p className="section-label" style={{ color: T.cobalt }}>
          JOIN THE MOVEMENT
        </p>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(32px,6vw,58px)", marginBottom: 16 }}
        >
          Become an HTW Ambassador
        </h1>
        <p
          style={{
            fontFamily: "'EB Garamond',serif",
            fontSize: "clamp(15px,2vw,20px)",
            fontStyle: "italic",
            color: "#444",
            maxWidth: 580,
            margin: "0 auto",
          }}
        >
          "You are the light of the world… let your light shine before others."
          — Matthew 5:14–16
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#666",
            marginTop: 10,
            maxWidth: 500,
            margin: "10px auto 0",
          }}
        >
          This isn't just a brand partnership. It's a kingdom assignment.
        </p>
      </section>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "80px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <p className="section-label">AMBASSADOR BENEFITS</p>
          <h2
            className="section-title"
            style={{ fontSize: "clamp(26px,4vw,42px)" }}
          >
            What You Get
          </h2>
          <div className="divider" style={{ margin: "14px auto" }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: 16,
            marginBottom: 72,
          }}
        >
          {[
            {
              i: "💰",
              t: "Competitive Commission",
              d: "Earn on every sale made through your unique promo code",
              c: T.gold,
            },
            {
              i: "👗",
              t: "Free HTW Pieces",
              d: "Receive exclusive items from each seasonal drop",
              c: T.rust,
            },
            {
              i: "🎯",
              t: "Early Access",
              d: "Shop new collections before the public launch date",
              c: T.cobalt,
            },
            {
              i: "📣",
              t: "Brand Amplification",
              d: "Featured across HTW's social channels and website",
              c: T.sage,
            },
            {
              i: "🙏",
              t: "Faith Community",
              d: "A network of believers making fashion a ministry",
              c: T.gold,
            },
            {
              i: "📊",
              t: "Ambassador Dashboard",
              d: "Track your impact, sales, and commissions in real time",
              c: T.cobalt,
            },
          ].map((b, i) => (
            <div
              key={i}
              className="card"
              style={{
                background: `${b.c}12`,
                border: `2px solid ${b.c}33`,
                borderRadius: 14,
                padding: "26px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 12 }}>{b.i}</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 19,
                  fontWeight: 600,
                  color: T.ink,
                  marginBottom: 8,
                }}
              >
                {b.t}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: T.muted,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {b.d}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p className="section-label">OUR TEAM</p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(24px,4vw,38px)" }}
            >
              Meet Our Ambassadors
            </h2>
            <div className="divider" style={{ margin: "14px auto" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 14,
            }}
          >
            {ambassadors.map((a, i) => (
              <div
                key={i}
                className="card"
                style={{
                  background: `${a.color}12`,
                  border: `2px solid ${a.color}33`,
                  borderRadius: 14,
                  padding: "26px 22px",
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 12 }}>{a.emoji}</div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: T.ink,
                    marginBottom: 2,
                  }}
                >
                  {a.name}
                </h3>
                <div
                  style={{
                    fontSize: 13,
                    color: a.color,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {a.handle}
                </div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 10 }}>
                  {a.city}
                </div>
                <p
                  style={{
                    fontFamily: "'EB Garamond',serif",
                    fontSize: 14,
                    fontStyle: "italic",
                    color: T.charcoal,
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {a.quote}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <p className="section-label">APPLICATIONS</p>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(24px,4vw,38px)", marginBottom: 8 }}
            >
              Apply to Join
            </h2>
            <p style={{ fontSize: 14, color: T.muted }}>
              Our team will respond within 48 hours.
            </p>
          </div>
          {formSent ? (
            <div
              style={{
                textAlign: "center",
                padding: "52px 28px",
                background: `${T.sage}14`,
                border: `2px solid ${T.sage}44`,
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: 56, marginBottom: 14 }}>🙌🏾</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 26,
                  fontWeight: 600,
                  color: T.ink,
                  marginBottom: 8,
                }}
              >
                Application Received!
              </h3>
              <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.7 }}>
                We'll review your application and get back to you within 48
                hours. Welcome to the HTW family!
              </p>
            </div>
          ) : (
            <div
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 16,
                padding: "36px 30px",
                boxShadow: "0 6px 32px rgba(0,0,0,0.07)",
              }}
            >
              {[
                { k: "name", l: "Full Name", p: "Your name", t: "text" },
                {
                  k: "email",
                  l: "Email Address",
                  p: "your@email.com",
                  t: "email",
                },
                {
                  k: "city",
                  l: "City / Country",
                  p: "Lagos, Nigeria",
                  t: "text",
                },
                {
                  k: "ig",
                  l: "Instagram / TikTok Handle",
                  p: "@yourhandle",
                  t: "text",
                },
              ].map((f) => (
                <div key={f.k} style={{ marginBottom: 18 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: T.gold,
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: 6,
                      fontWeight: 700,
                    }}
                  >
                    {f.l}
                  </label>
                  <input
                    type={f.t}
                    value={form[f.k]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.k]: e.target.value }))
                    }
                    placeholder={f.p}
                    style={{
                      width: "100%",
                      background: T.warm,
                      border: `1.5px solid ${T.border}`,
                      color: T.ink,
                      padding: "12px 16px",
                      fontSize: 14,
                      borderRadius: 8,
                      transition: "border-color .2s",
                    }}
                  />
                </div>
              ))}
              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "14px",
                  fontSize: 14,
                  marginTop: 6,
                }}
                onClick={() => setFormSent(true)}
              >
                Submit Application ✝
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════ CONTACT PAGE ══════════════════════════ */
function ContactPage() {
  const [sent, setSent] = useState(false)
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg,#FDF0DC,#F5D898)",
          padding: "72px 28px",
          textAlign: "center",
        }}
      >
        <p className="section-label">GET IN TOUCH</p>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(32px,6vw,56px)", marginBottom: 12 }}
        >
          Contact Us
        </h1>
        <p style={{ fontSize: 15, color: T.muted }}>
          We'd love to hear from you.
        </p>
      </section>
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "72px 28px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: 40,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 20,
              color: T.ink,
            }}
          >
            Reach Us Directly
          </h2>
          {[
            {
              icon: "💬",
              title: "WhatsApp (Fastest)",
              val: "Chat with us instantly",
              sub: "Our team typically responds within 1 hour",
              color: T.sage,
              action: <WABtn text="Open WhatsApp Chat" />,
            },
            {
              icon: "📧",
              title: "Email",
              val: "hello@hopestrendyworld.com",
              sub: "We respond within 24 hours",
              color: T.cobalt,
              action: null,
            },
            {
              icon: "📍",
              title: "Location",
              val: "Lagos, Nigeria",
              sub: "Shipping nationwide & internationally",
              color: T.gold,
              action: null,
            },
            {
              icon: "📱",
              title: "Social Media",
              val: "@HopesTrendyWorld",
              sub: "Instagram · TikTok · Facebook",
              color: T.rust,
              action: null,
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "18px 20px",
                marginBottom: 12,
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: c.color,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    marginBottom: 3,
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: T.ink,
                    marginBottom: 2,
                  }}
                >
                  {c.val}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: T.muted,
                    marginBottom: c.action ? 10 : 0,
                  }}
                >
                  {c.sub}
                </div>
                {c.action}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 28,
              fontWeight: 600,
              marginBottom: 20,
              color: T.ink,
            }}
          >
            Send a Message
          </h2>
          {sent ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: `${T.gold}14`,
                border: `2px solid ${T.gold}44`,
                borderRadius: 14,
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 14 }}>🙏</div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 22,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Message Sent!
              </h3>
              <p style={{ fontSize: 14, color: T.muted }}>
                We'll be in touch within 24 hours. Thank you for reaching out!
              </p>
            </div>
          ) : (
            <div
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "28px 24px",
              }}
            >
              {[
                { l: "Your Name", p: "Full name", t: "text" },
                { l: "Email Address", p: "your@email.com", t: "email" },
                { l: "Subject", p: "How can we help?", t: "text" },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: T.gold,
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    {f.l}
                  </label>
                  <input
                    type={f.t}
                    placeholder={f.p}
                    style={{
                      width: "100%",
                      background: T.warm,
                      border: `1.5px solid ${T.border}`,
                      color: T.ink,
                      padding: "11px 14px",
                      fontSize: 14,
                      borderRadius: 7,
                    }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    fontSize: 12,
                    color: T.gold,
                    fontWeight: 700,
                    letterSpacing: "0.07em",
                    display: "block",
                    marginBottom: 5,
                  }}
                >
                  Message
                </label>
                <textarea
                  placeholder="Tell us what's on your mind…"
                  rows={4}
                  style={{
                    width: "100%",
                    background: T.warm,
                    border: `1.5px solid ${T.border}`,
                    color: T.ink,
                    padding: "11px 14px",
                    fontSize: 14,
                    borderRadius: 7,
                    resize: "vertical",
                  }}
                />
              </div>
              <button
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setSent(true)}
              >
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════ CHECKOUT PAGE ══════════════════════════ */
function CheckoutPage({
  cart,
  cartTotal,
  step,
  setStep,
  form,
  setForm,
  navTo,
}) {
  const shipping = step >= 2 ? 1500 : 0
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "44px 28px" }}>
      <div style={{ marginBottom: 32 }}>
        <p className="section-label">CHECKOUT</p>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(26px,4vw,40px)" }}
        >
          Complete Your Order
        </h1>
        <div className="divider" />
      </div>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 36 }}>
        {["Delivery Details", "Payment", "Confirmation"].map((s, i) => (
          <div
            key={s}
            style={{ flex: 1, textAlign: "center", position: "relative" }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  step > i ? T.sage : step === i + 1 ? T.gold : T.border,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                margin: "0 auto 6px",
              }}
            >
              {step > i ? "✓" : i + 1}
            </div>
            <div
              style={{
                fontSize: 11,
                color: step === i + 1 ? T.gold : step > i ? T.sage : T.muted,
                fontWeight: 700,
                letterSpacing: "0.06em",
              }}
            >
              {s.toUpperCase()}
            </div>
            {i < 2 && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: "50%",
                  right: 0,
                  height: 2,
                  background: step > i + 1 ? T.sage : T.border,
                  zIndex: -1,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div>
          {step === 1 && (
            <div
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "28px 24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 22,
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                Delivery Details
              </h3>
              {[
                { k: "name", l: "Full Name", p: "Your full name", t: "text" },
                {
                  k: "address",
                  l: "Delivery Address",
                  p: "Street, City, State",
                  t: "text",
                },
                {
                  k: "phone",
                  l: "Phone Number",
                  p: "+234 000 000 0000",
                  t: "tel",
                },
              ].map((f) => (
                <div key={f.k} style={{ marginBottom: 16 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: T.gold,
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      display: "block",
                      marginBottom: 5,
                    }}
                  >
                    {f.l}
                  </label>
                  <input
                    type={f.t}
                    value={form[f.k]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.k]: e.target.value }))
                    }
                    placeholder={f.p}
                    style={{
                      width: "100%",
                      background: T.warm,
                      border: `1.5px solid ${T.border}`,
                      color: T.ink,
                      padding: "12px 16px",
                      fontSize: 14,
                      borderRadius: 8,
                    }}
                  />
                </div>
              ))}
              <button
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 8,
                }}
                onClick={() => setStep(2)}
              >
                Continue to Payment →
              </button>
            </div>
          )}
          {step === 2 && (
            <div
              style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: 14,
                padding: "28px 24px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 22,
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                Payment Method
              </h3>
              {[
                {
                  k: "paystack",
                  l: "Paystack",
                  desc: "Pay with card or bank transfer via Paystack",
                },
                {
                  k: "flutterwave",
                  l: "Flutterwave",
                  desc: "Pay with card, mobile money, or bank",
                },
                {
                  k: "transfer",
                  l: "Direct Bank Transfer",
                  desc: "Transfer directly to our account",
                },
                {
                  k: "whatsapp",
                  l: "WhatsApp Order",
                  desc: "Complete your order via WhatsApp chat",
                },
              ].map((pm) => (
                <div
                  key={pm.k}
                  onClick={() => setForm((f) => ({ ...f, payment: pm.k }))}
                  style={{
                    background: form.payment === pm.k ? `${T.gold}14` : T.warm,
                    border: `2px solid ${form.payment === pm.k ? T.gold : T.border}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    marginBottom: 10,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>
                    {pm.l}
                  </div>
                  <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>
                    {pm.desc}
                  </div>
                </div>
              ))}
              <p
                style={{
                  fontSize: 12,
                  color: T.sage,
                  marginTop: 14,
                  fontWeight: 600,
                }}
              >
                🔒 Secure checkout · Your payment details are encrypted
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  className="btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  className="btn-primary"
                  style={{ flex: 2, justifyContent: "center" }}
                  onClick={() => setStep(3)}
                >
                  Place Order →
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div
              style={{
                textAlign: "center",
                padding: "52px 28px",
                background: `${T.sage}12`,
                border: `2px solid ${T.sage}44`,
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontSize: 32,
                  fontWeight: 700,
                  color: T.ink,
                  marginBottom: 10,
                }}
              >
                Order Confirmed!
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: T.muted,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                Thank you for your order! We'll confirm via WhatsApp and send
                tracking details within 24 hours.
              </p>
              <WABtn text="Track Order on WhatsApp" />
              <div style={{ marginTop: 20 }}>
                <button
                  className="btn-outline-gold"
                  onClick={() => navTo("home")}
                >
                  Continue Shopping →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div style={{ minWidth: 280, maxWidth: 320 }}>
          <div
            style={{
              background: T.white,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: "22px 20px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 18,
                borderBottom: `1px solid ${T.border}`,
                paddingBottom: 12,
              }}
            >
              Order Summary
            </h3>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 10,
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${T.sand}`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: item.bg,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center top",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                      }}
                    >
                      👕
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: 12, color: T.muted }}>
                    Qty: {item.qty}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.rust }}>
                  {item.price}
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 13, color: T.muted }}>Subtotal</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>
                  ₦{cartTotal.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 13, color: T.muted }}>Delivery</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: T.sage }}>
                  {cartTotal > 0 ? "₦1,500" : "—"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: `2px solid ${T.border}`,
                  paddingTop: 10,
                  marginTop: 4,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: T.rust }}>
                  ₦{(cartTotal + 1500).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════ COLLECTIONS PAGE ══════════════════════════ */
function CollectionsPage({ navTo, setActiveCat, setActiveGen }) {
  const cols = [
    {
      id: "easter",
      name: "He Wore It First",
      subtitle: "Easter 2026 Collection",
      verse:
        '"He humbled himself… therefore God exalted him." — Philippians 2:8–9',
      tag: "NEW DROP",
      bg: "linear-gradient(135deg,#F5E0DC,#F5B8A8)",
      accent: T.rust,
      emoji: "🧥",
      cat: "Hoodies",
    },
    {
      id: "grace",
      name: "Grace Season",
      subtitle: "Summer 2026",
      verse: '"My grace is sufficient for you." — 2 Corinthians 12:9',
      tag: "COMING SOON",
      bg: "linear-gradient(135deg,#DCF0E6,#A8D8BC)",
      accent: T.sage,
      emoji: "🟩",
      cat: "Joggers",
    },
    {
      id: "crowned",
      name: "Crowned",
      subtitle: "Signature Classics",
      verse: '"You are a chosen people, a royal priesthood." — 1 Peter 2:9',
      tag: "BESTSELLER",
      bg: "linear-gradient(135deg,#DCE8F5,#A8C4E8)",
      accent: T.cobalt,
      emoji: "👑",
      cat: "Sweatshirts",
    },
  ]
  return (
    <div>
      <section
        style={{
          background: "linear-gradient(135deg,#FDF0DC,#F5D898)",
          padding: "72px 28px",
          textAlign: "center",
        }}
      >
        <p className="section-label">SEASON DROPS</p>
        <h1
          className="section-title"
          style={{ fontSize: "clamp(32px,7vw,60px)" }}
        >
          Our Collections
        </h1>
        <div className="divider" style={{ margin: "14px auto" }} />
        <p
          style={{
            fontSize: 15,
            color: T.muted,
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          Every collection is a season. Every season tells a story rooted in
          faith.
        </p>
      </section>
      {cols.map((col, i) => (
        <div
          key={col.id}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          }}
        >
          <div
            style={{
              background: col.bg,
              minHeight: 320,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 100,
              order: i % 2 === 0 ? 0 : 1,
            }}
          >
            {col.emoji}
          </div>
          <div
            style={{
              background: T.white,
              padding: "52px 44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              order: i % 2 === 0 ? 1 : 0,
            }}
          >
            <Badge text={col.tag} />
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(26px,4vw,44px)",
                fontWeight: 600,
                margin: "14px 0 6px",
                color: T.ink,
              }}
            >
              {col.name}
            </h2>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 16 }}>
              {col.subtitle}
            </div>
            <p
              style={{
                fontFamily: "'EB Garamond',serif",
                fontSize: 17,
                fontStyle: "italic",
                color: T.charcoal,
                lineHeight: 1.8,
                margin: "0 0 28px",
              }}
            >
              {col.verse}
            </p>
            <button
              className="btn-primary"
              style={{ alignSelf: "flex-start" }}
              onClick={() => {
                setActiveCat(col.cat)
                setActiveGen("All")
                navTo("shop")
              }}
            >
              Shop This Collection →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════ POLICY PAGE ══════════════════════════ */
function PolicyPage() {
  const [tab, setTab] = useState("shipping")
  const policies = {
    shipping: {
      title: "Shipping Policy",
      content: [
        {
          h: "Delivery Within Lagos",
          b: "Free delivery on all orders within Lagos State. Standard delivery takes 1–3 business days. Express same-day delivery available for orders placed before 12PM (additional fee applies).",
        },
        {
          h: "Nationwide Delivery",
          b: "We ship to all 36 states in Nigeria. Delivery typically takes 3–7 business days. Shipping fees vary by location and will be calculated at checkout.",
        },
        {
          h: "International Shipping",
          b: "We ship to the UK, USA, Canada, and other countries. International orders typically take 7–14 business days. Customs duties and import taxes are the responsibility of the customer.",
        },
        {
          h: "Order Tracking",
          b: "Once your order is dispatched, you'll receive a tracking number via WhatsApp and email. Our team is available on WhatsApp for any shipping inquiries.",
        },
      ],
    },
    returns: {
      title: "Return Policy",
      content: [
        {
          h: "Return Window",
          b: "We accept returns within 14 days of delivery. Items must be unused, unworn, and in their original packaging with all tags attached.",
        },
        {
          h: "How to Return",
          b: "Contact us via WhatsApp or email with your order number and reason for return. We'll provide you with return instructions within 24 hours.",
        },
        {
          h: "Refunds",
          b: "Once we receive and inspect the returned item, refunds are processed within 5–7 business days to your original payment method.",
        },
        {
          h: "Exchanges",
          b: "We're happy to exchange for a different size or colour, subject to availability. Exchange processing takes 3–5 business days.",
        },
        {
          h: "Non-Returnable Items",
          b: "Sale items, customised pieces, and items returned after 14 days are not eligible for returns or refunds.",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      content: [
        {
          h: "Information We Collect",
          b: "We collect your name, email, phone number, and delivery address when you place an order or sign up for our newsletter. We use this to process and deliver your orders.",
        },
        {
          h: "How We Use Your Data",
          b: "Your information is used to process orders, communicate about your purchase, and (with your consent) send you marketing communications. We never sell your data to third parties.",
        },
        {
          h: "Data Security",
          b: "We implement industry-standard security measures to protect your personal information. Payment processing is handled by secure, PCI-compliant providers (Paystack/Flutterwave).",
        },
        {
          h: "Your Rights",
          b: "You have the right to access, correct, or delete your personal data at any time. Contact us via email or WhatsApp to exercise these rights.",
        },
      ],
    },
    terms: {
      title: "Terms & Conditions",
      content: [
        {
          h: "Acceptance of Terms",
          b: "By accessing and using the HTW website and placing orders, you agree to these terms and conditions. If you do not agree, please do not use our services.",
        },
        {
          h: "Product Descriptions",
          b: "We make every effort to accurately display product colours and descriptions. However, actual colours may vary slightly depending on your device screen.",
        },
        {
          h: "Pricing",
          b: "All prices are displayed in Nigerian Naira (₦) and approximate USD ($). Prices are subject to change without notice. The price at the time of order placement will apply.",
        },
        {
          h: "Intellectual Property",
          b: "All content on this website — including designs, logos, images, and copy — is the exclusive property of Hope's Trendy World and is protected by copyright law.",
        },
      ],
    },
  }
  const tabs = [
    { k: "shipping", l: "Shipping" },
    { k: "returns", l: "Returns" },
    { k: "privacy", l: "Privacy" },
    { k: "terms", l: "Terms" },
  ]
  const pol = policies[tab]
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 28px" }}>
      <p className="section-label">LEGAL</p>
      <h1
        className="section-title"
        style={{ fontSize: "clamp(28px,5vw,46px)", marginBottom: 8 }}
      >
        Policies
      </h1>
      <div className="divider" style={{ marginBottom: 28 }} />
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}
      >
        {tabs.map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k)}
            style={{
              background: tab === t.k ? T.gold : "none",
              border: `2px solid ${tab === t.k ? T.gold : T.border}`,
              color: tab === t.k ? "#fff" : T.muted,
              padding: "9px 22px",
              borderRadius: 24,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "'Georgia',serif",
              fontWeight: 600,
              transition: "all .2s",
            }}
          >
            {t.l}
          </button>
        ))}
      </div>
      <div
        style={{
          background: T.white,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          padding: "32px 28px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 24,
            color: T.ink,
          }}
        >
          {pol.title}
        </h2>
        {pol.content.map((c, i) => (
          <div
            key={i}
            style={{
              marginBottom: 24,
              paddingBottom: 24,
              borderBottom:
                i < pol.content.length - 1 ? `1px solid ${T.sand}` : "none",
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: T.rust,
                marginBottom: 8,
                letterSpacing: "0.02em",
              }}
            >
              {c.h}
            </h3>
            <p
              style={{
                fontSize: 14,
                color: T.muted,
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              {c.b}
            </p>
          </div>
        ))}
        <p
          style={{
            fontSize: 12,
            color: T.muted,
            marginTop: 8,
            fontStyle: "italic",
          }}
        >
          Last updated: April 2026 · Questions? Contact us on WhatsApp or at
          hello@hopestrendyworld.com
        </p>
      </div>
    </div>
  )
}
