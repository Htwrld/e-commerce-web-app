'use server'

import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

export const sendMail = async (to: string, subject: string, body: string) => {
    const options: SMTPTransport.Options  = {
        host: process.env.NODEMAILER_HOST ?? 'smtp.gmail.com',
        port: Number(process.env.NODEMAILER_PORT ?? 465),
        secure: true,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    }

    const transporter = nodemailer.createTransport(options)

    const mailOptions = {
        from: process.env.NODEMAILER_FROM,
        to,
        subject,
        text: body,
    }

    const sent = await transporter.sendMail(mailOptions)
    return sent
}
