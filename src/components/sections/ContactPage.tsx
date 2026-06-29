"use client"

import { ChangeEvent, useState } from "react"
import { T } from "@/src/lib/tokens"
import { WABtn } from "@/src/components/cards/WABtn"
import { sendMail } from "@/src/action/mailController"
import { contactFormTemplate } from "@/src/lib/email-templates"
import { FaSpinner } from "react-icons/fa"

type PageContent = {
    page_description: string
    whatsapp_contact_title: string
    whatsapp_contact_description: string
    whatsapp_contact_number: string
    whatsapp_contact_message: string
    email_section_description: string
    email: string
    location: string
    location_description: string
    social_handle: string
    social_media_channels: string
}

export const ContactPage = ({ pageContent }: { pageContent: PageContent }) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [sent, setSent] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            const sent = await sendMail({
                to: "host",
                subject,
                name,
                replyTo: email,
                html: contactFormTemplate({ senderName: name, senderEmail: email, subject, message }),
            })
            setSent(true)
            setName('')
            setEmail('')
            setSubject('')
            setMessage('')
        } catch (error) {
            return
        } finally {
            setLoading(false)
        }
    }

    const contacts = [
        {
            icon: "💬",
            title: "WhatsApp (Fastest)",
            val: pageContent.whatsapp_contact_title,
            sub: pageContent.whatsapp_contact_description,
            color: T.sage,
            action: (
                <WABtn
                    text="Open WhatsApp Chat"
                    number={pageContent.whatsapp_contact_number}
                    message={pageContent.whatsapp_contact_message}
                />
            ),
        },
        {
            icon: "📧",
            title: "Email",
            val: pageContent.email,
            sub: pageContent.email_section_description,
            color: T.cobalt,
            action: null,
        },
        {
            icon: "📍",
            title: "Location",
            val: pageContent.location,
            sub: pageContent.location_description,
            color: T.gold,
            action: null,
        },
        {
            icon: "📱",
            title: "Social Media",
            val: pageContent.social_handle,
            sub: pageContent.social_media_channels,
            color: T.rust,
            action: null,
        },
    ]

    const fields = [
        {
            l: "Your Name",
            p: "Full name",
            t: "text",
            v: name,
            action: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
        },
        {
            l: "Email Address",
            p: "your@email.com",
            t: "email",
            v: email,
            action: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        },
        {
            l: "Subject",
            p: "How can we help?",
            t: "text",
            v: subject,
            action: (e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value),
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
                <p className="section-label">GET IN TOUCH</p>
                <h1
                    className="section-title"
                    style={{ fontSize: "clamp(32px,6vw,56px)", marginBottom: 12 }}
                >
                    Contact Us
                </h1>
                <p style={{ fontSize: 15, color: T.muted }}>{pageContent.page_description}</p>
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
                {/* Contact info */}
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
                    {contacts.map((c, i) => (
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

                {/* Contact form */}
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
                                We&rsquo;ll be in touch within 24 hours. Thank you for reaching out!
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
                            {fields.map((f, i) => (
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
                                        onChange={f.action}
                                        value={f.v}
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
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
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
                                onClick={onSubmit}
                            >
                                {loading && <FaSpinner className="animate-spin" />} Send Message →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
