"use client"

import { useState } from "react"
import { T } from "@/src/lib/tokens"
import { sendMail } from "@/src/action/mailController"

const EmailNWhatsApp = ({
    title,
    stayInTheLoop,
    stayInTheLoopDescription,
    getLaunched,
    getLaunchedDescription,
}: {
    title: string
    stayInTheLoop: string
    stayInTheLoopDescription: string
    getLaunched: string
    getLaunchedDescription: string
}) => {
    const [emailSub, setEmailSub] = useState("")
    const [subDone, setSubDone] = useState(false)
    const [waNumber, setWaNumber] = useState("")
    const [waDone, setWaDone] = useState(false)

    const onEmailSub = async () => {
        try {
            await sendMail({
                to: "host",
                subject: "I want to join your Email subscribers movement",
                body: `My email address is ${emailSub}.`,
                replyTo: emailSub,
                name: "",
            })
            setSubDone(true)
        } catch (error) {
            return 
        }
    }

    const onWhatsApp = async () => {
        try {
            await sendMail({
                to: "host",
                subject: "I want to join your WhatsApp group",
                body: `My whatsapp number is ${waNumber}.`,
                name: "",
            })
            setWaDone(true)
        } catch (error) {
            return
        }
    }

    return (
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
                        {title}
                    </h2>
                    <div className="divider" style={{ margin: "14px auto 0" }} />
                </div>
                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-24">
                    {/* Email */}
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
                            {stayInTheLoop}
                        </h3>
                        <p
                            style={{
                                fontSize: 13,
                                color: T.muted,
                                marginBottom: 20,
                                lineHeight: 1.7,
                            }}
                        >
                            {stayInTheLoopDescription}
                        </p>
                        {subDone ? (
                            <div
                                style={{
                                    background: `${T.sage}18`,
                                    border: `1px solid ${T.sage}44`,
                                    borderRadius: 8,
                                    padding: 14,
                                    fontSize: 14,
                                    color: T.sage,
                                    fontWeight: 700,
                                }}
                            >
                                ✓ You&rsquo;re in! Welcome to the HTW family 🙏
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    borderRadius: 8,
                                    overflow: "hidden",
                                    border: `2px solid ${T.gold}`,
                                    flexShrink: 0,
                                }}
                            >
                                <input
                                    type="email"
                                    value={emailSub}
                                    onChange={(e) => setEmailSub(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 border-none bg-[#F5F0DC] p-2 font-sans text-[0.5rem] text-[#1A8A3C] sm:text-xs md:text-sm"
                                />
                                <button
                                    className="btn-primary"
                                    style={{ borderRadius: 0, padding: "0 18px", fontSize: 13 }}
                                    onClick={onEmailSub}
                                >
                                    Subscribe
                                </button>
                            </div>
                        )}
                    </div>
                    {/* WhatsApp */}
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
                            {getLaunched}
                        </h3>
                        <p
                            style={{
                                fontSize: 13,
                                color: T.muted,
                                marginBottom: 20,
                                lineHeight: 1.7,
                            }}
                        >
                            {getLaunchedDescription}
                        </p>
                        {waDone ? (
                            <div
                                style={{
                                    background: "#D4F0E0",
                                    border: "1px solid #25D36644",
                                    borderRadius: 8,
                                    padding: 14,
                                    color: "#1A8A3C",
                                    fontWeight: 700,
                                }}
                            >
                                ✓ Signed up! We&rsquo;ll send updates soon 🎉
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
                                        className="flex-1 border-none bg-white p-2 font-sans text-[0.5rem] text-[#1A1612] sm:text-xs md:text-sm"
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
                                        onClick={onWhatsApp}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <p style={{ fontSize: 11, color: "#888", margin: 0 }}>
                                    By signing up you agree to receive WhatsApp messages from HTW.
                                    Unsubscribe anytime.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailNWhatsApp
