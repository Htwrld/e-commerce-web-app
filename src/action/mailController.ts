"use server"

import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

export const sendMail = async ({
    name,
    to,
    subject,
    body,
    replyTo,
}: {
    to: string
    subject: string
    body: string
    name?: string
    replyTo?: string
}) => {
    const options: SMTPTransport.Options = {
        host: process.env.NODEMAILER_HOST ?? "smtp.gmail.com",
        port: Number(process.env.NODEMAILER_PORT ?? 465),
        secure: true,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    }

    const transporter = nodemailer.createTransport(options)

    const mailOptions: nodemailer.SendMailOptions = {
        from: to === "host" ? to : process.env.NODEMAILER_USER,
        to: to === "host" ? process.env.NODEMAILER_USER : to,
        replyTo: replyTo === "host" ? process.env.NODEMAILER_USER : replyTo,
        subject: `${subject} ${name ? "from " + name : ""}`,
        text: `${body} `,
    }

    const sent = await transporter.sendMail(mailOptions)
    return sent
}
