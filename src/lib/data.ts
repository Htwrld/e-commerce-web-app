export interface Product {
    id: number
    name: string
    subname: string
    cat: string
    gender: string
    price: string
    usd: string
    verse: string
    verseText: string
    badge: string
    colors: string[]
    bg: string
    img: string | null
    imgFit: string
    story: string
}

export const PRODUCTS: Product[] = [
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
        img: "/images/hoodie_mockup.jpg",
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
        img: "/images/hoodie_lifestyle.png",
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
        img: "/images/hoodie_mockup.jpg",
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
        img: "/images/hoodie_lifestyle.png",
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
        img: "/images/polo_twopiece.jpg",
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
        img: "/images/tee_walkbyfaith.png",
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
        badge: "NEW",
        colors: ["#7BA8C9", "#FDF8F2", "#C9923A"],
        bg: "#A8C4E0",
        img: "/images/tee_she.png",
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
        img: "/images/twopiece_black.jpg",
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
        img: "/images/polo_twopiece.jpg",
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
        img: "/images/twopiece_black.jpg",
        imgFit: "cover",
        story: "Match in style. Move in purpose. Together.",
    },
]

export const CATS = [
    {
        name: "All",
        slug: "all",
        icon:  "🧥"
    },
    {
        name: "Sweatshirts",
        slug: "sweatshirts",
        icon: "🧥"
    },
    {
        name: "Hoodies",
        slug: "hoodies",
        icon: "🫙"
    },
    {
        name: "Joggers",
        slug: "joggers",
        icon: "👟"
    },
    {
        name: "Hoodies & Joggers",
        slug: 'hoodies-joggers',
        icon: "🫙"
    },
    {
        name: "Polos & Tees",
        slug: "polos-tees",
        icon: "👔"
    },
    {
        name: "2-Piece Sets",
        slug: "2-piece-sets",
        icon: "👗"
    },
    {
        name: "Family Collections",
        slug: "family-collections",
        icon: "👪"
    },
    {
        name: "Ankara",
        slug: "ankara",
        icon: "🎽"
    },
    {
        name: "Kids",
        slug: "kids",
        icon: "👶"
    }
]

export const GENDERS = ["All", "Male", "Female", "Unisex"]

export interface Ambassador {
    name: string
    city: string
    handle: string
    emoji: string
    quote: string
    color: string
}

import { T } from "./tokens"

export const AMBASSADORS: Ambassador[] = [
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

export const TESTIMONIALS = [
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

export const WHY_HTW = [
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

export const NAV_ITEMS = [
    { id: "/", label: "Home" },
    { id: "/shop", label: "Shop" },
    // { id: "/fashion", label: "Fashion" },
    { id: "/ambassadors", label: "Ambassadors" },
    { id: "/about", label: "Our Story" },
    { id: "/contact", label: "Contact" },
]
