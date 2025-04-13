import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
    const { name, email, subject, message } = await request.json()

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const mailOptions: Mail.Options = {
        from: email, // Include the sender's name
        to: process.env.SMTP_USERNAME,
        replyTo: email, // Allow the receiver to reply to the original sender
        subject,
        text: `From: ${name} <${email}>\n\n${message}`, // Plain text body
    }

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve("Email sent")
                } else {
                    reject(err.message)
                }
            })
        })

    try {
        await sendMailPromise()
        return NextResponse.json({ message: "Email sent" })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}