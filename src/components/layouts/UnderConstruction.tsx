import { Mail, Sparkles } from "lucide-react"

export default function UnderConstruction() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#1A1612] px-6 py-16 text-center">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="pointer-events-none absolute -top-32 -left-32 h-80 w-80 rounded-full bg-[#C9923A]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#C94A2A]/20 blur-3xl" />

            <div className="relative z-10 flex max-w-xl flex-col items-center">
                <span className="section-label mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9923A]/40 px-4 py-2 text-[#C9923A]">
                    <Sparkles className="h-3.5 w-3.5" />
                    Coming Soon
                </span>

                <h1
                    className="text-4xl font-light tracking-wide text-white sm:text-5xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    HTW — Hope&apos;s Trendy World
                </h1>

                <div className="divider mx-auto my-5 bg-[#C9923A]" />

                <p
                    className="text-base leading-relaxed text-white/70 sm:text-lg"
                    style={{ fontFamily: "'EB Garamond', serif" }}
                >
                    We&apos;re weaving faith into every stitch. Our site is
                    currently under construction as we prepare something bold,
                    beautiful, and purposeful for you.
                </p>

                <p className="mt-8 text-sm tracking-[0.2em] text-white/40 uppercase">
                    Thank you for your patience
                </p>

                <div className="mt-10 flex items-center gap-4">
                    <a
                        href="mailto:hello@hopestrendyworld.com"
                        className="btn-outline-gold inline-flex items-center gap-2 border-[#C9923A] text-[#C9923A] hover:bg-[#C9923A] hover:text-white"
                    >
                        <Mail className="h-4 w-4" />
                        Get in touch
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C9923A] text-[#C9923A] transition-colors hover:bg-[#C9923A] hover:text-white"
                        aria-label="Follow us on Instagram"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            className="h-4 w-4"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                        </svg>
                    </a>
                </div>
            </div>

            <p className="relative z-10 mt-16 text-xs text-white/30">
                © {new Date().getFullYear()} Hope&apos;s Trendy World. All rights reserved.
            </p>
        </main>
    )
}
