"use client"
import { useState } from "react"
import { sendMail } from "@/src/action/mailController"
export function Newsletter() {
    const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")
    return (
        <section className="ed-newsletter">
            <div>
                <h2>Stay in the HTW World</h2>
                <p>New pieces. New stories. New perspectives.</p>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const email = String(new FormData(e.currentTarget).get("email"))
                        setStatus("sending")
                        try {
                            await sendMail({
                                to: "host",
                                subject: "HTW newsletter subscription",
                                body: `Please subscribe my email address: ${email}`,
                                replyTo: email,
                            })
                            setStatus("done")
                        } catch {
                            setStatus("error")
                        }
                    }}
                >
                    <label className="sr-only" htmlFor="htw-email">
                        Your email address
                    </label>
                    <input
                        id="htw-email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        required
                        disabled={status === "done"}
                    />
                    <button
                        className="ed-button"
                        disabled={status === "sending" || status === "done"}
                    >
                        {status === "done"
                            ? "Subscribed ✓"
                            : status === "sending"
                              ? "Subscribing…"
                              : "Subscribe →"}
                    </button>
                </form>
                <p role="status">
                    {status === "error"
                        ? "Unable to subscribe. Please try again."
                        : status === "done"
                          ? "Thank you for joining the HTW community."
                          : ""}
                </p>
            </div>
        </section>
    )
}
