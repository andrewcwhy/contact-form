import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer"

export async function POST(request: NextRequest) {
	const { name, email, subject, message } = await request.json()
    
	const { SMTP_USERNAME, SMTP_PASSWORD } = process.env

	const transport = nodemailer.createTransport({
        service: "Gmail",
		auth: {
			user: SMTP_USERNAME,
			pass: SMTP_PASSWORD,
		},
	})

	const mailOptions: Mail.Options = {
		from: email, // Sender's email address
		to: SMTP_USERNAME, // Receiver's email address (your email)
		replyTo: email, // Allow the receiver to reply to the original sender
		subject,
		text: `From: ${name} <${email}>\n\n${message}`,
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
