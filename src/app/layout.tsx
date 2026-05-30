import type { Metadata } from "next";
import { CartProvider } from "@/src/lib/cart-context";
import { NavProvider } from "@/src/lib/nav-context";
import { T } from "@/src/lib/tokens";

export const metadata: Metadata = {
  title: "HTW — Hope's Trendy World",
  description: "Faith-inspired fashion for bold living. Scripture in every stitch, purpose in every piece.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: ${T.gold}88; border-radius: 2px; }
          .card { transition: transform .28s, box-shadow .28s; }
          .card:hover { transform: translateY(-6px); box-shadow: 0 18px 52px rgba(0,0,0,0.11); }
          .nav-link { transition: color .2s; cursor: pointer; position: relative; }
          .nav-link:hover { color: ${T.rust} !important; }
          .nav-link.active::after { content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 2px; background: ${T.gold}; border-radius: 2px; }
          .btn-primary { background: ${T.gold}; color: #fff; border: none; padding: 13px 30px; font-size: 14px; letter-spacing: .07em; cursor: pointer; border-radius: 7px; font-family: "Georgia", serif; font-weight: 700; transition: background .2s, transform .15s, box-shadow .15s; display: inline-flex; align-items: center; gap: 8px; }
          .btn-primary:hover { background: ${T.rust}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,74,42,.35); }
          .btn-secondary { background: none; border: 2px solid ${T.ink}; color: ${T.ink}; padding: 12px 28px; font-size: 13px; letter-spacing: .07em; cursor: pointer; border-radius: 7px; font-family: "Georgia", serif; font-weight: 600; transition: all .2s; }
          .btn-secondary:hover { background: ${T.ink}; color: #fff; }
          .btn-outline-gold { background: none; border: 2px solid ${T.gold}; color: ${T.gold}; padding: 11px 24px; font-size: 13px; cursor: pointer; border-radius: 7px; font-family: "Georgia", serif; font-weight: 600; transition: all .2s; }
          .btn-outline-gold:hover { background: ${T.gold}; color: #fff; }
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
          .wa-float { position: fixed; bottom: 24px; right: 24px; z-index: 999; background: #25D366; border-radius: 50%; width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 24px rgba(37,211,102,.5); text-decoration: none; font-size: 26px; transition: transform .2s; animation: pulse 3s ease infinite; }
          .wa-float:hover { transform: scale(1.12); }
          input, select, textarea { outline: none; font-family: "Georgia", serif; }
          input:focus, select:focus, textarea:focus { border-color: ${T.gold} !important; }
          .section-label { font-size: 10px; letter-spacing: .22em; color: ${T.gold}; text-transform: uppercase; font-weight: 700; margin-bottom: 10px; }
          .section-title { font-family: "Cormorant Garamond", serif; font-weight: 300; color: ${T.ink}; line-height: 1.1; }
          .divider { width: 48px; height: 3px; background: ${T.gold}; border-radius: 2px; margin: 14px 0; }
          @media (max-width: 720px) { .desktop-nav { display: none !important; } }
          @media (min-width: 721px) { .desktop-nav { display: flex !important; } }
        `}</style>
        <NavProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </NavProvider>
      </body>
    </html>
  );
}
