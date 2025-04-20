"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormData, contactFormSchema } from "@/schemas/contact-form.schema"
import { sendEmail } from "@/utils/sendEmail"
import { useDisabled } from "@/hooks/useDisabled"
import { useCounter } from "@/hooks/useCounter"

const MAX_MESSAGE_LENGTH = 1000

export default function ContactForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid, isSubmitting },
	} = useForm<FormData>({
		resolver: zodResolver(contactFormSchema),
		mode: "onChange",
	})

	const {
		count: characterCount,
		handleChange: handleInputChange,
		resetCount,
	} = useCounter<HTMLTextAreaElement | HTMLInputElement>()

	const isOverLimit = characterCount > MAX_MESSAGE_LENGTH

	const isSubmitDisabled = useDisabled({
		conditions: [!isValid, isSubmitting, isOverLimit],
	})

	function onSubmit(data: FormData) {
		sendEmail(data)
		reset()
		resetCount()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg shadow-lg text-white grid grid-cols-1 gap-y-4"
		>
			<header className="text-center mb-4">
				<h1 className="text-3xl font-bold">Contact Us</h1>
				<p>Have any questions? Shoot us a message!</p>
			</header>

			<ul className="grid grid-cols-1 gap-y-4">
				<li>
					<label htmlFor="name" className="block mb-1">Name</label>
					<input
						className="bg-gray-800 outline-none p-3 rounded-md w-full"
						id="name"
						title="Enter your name"
						type="text"
						{...register("name")}
					/>
					{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
				</li>
				<li>
					<label htmlFor="email" className="block mb-1">Email</label>
					<input
						className="bg-gray-800 outline-none p-3 rounded-md w-full"
						id="email"
						title="Enter your email address"
						type="email"
						{...register("email")}
					/>
					{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
				</li>
				<li>
					<label htmlFor="subject" className="block mb-1">Subject</label>
					<input
						className="bg-gray-800 outline-none p-3 rounded-md w-full"
						id="subject"
						title="Enter the subject of your message"
						type="text"
						{...register("subject")}
					/>
					{errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
				</li>
				<li>
					<label htmlFor="message" className="block mb-1">Message</label>
					<textarea
						className="bg-gray-800 outline-none p-3 rounded-md w-full"
						id="message"
						rows={4}
						title="Enter your message"
						{...register("message", {
							onChange: handleInputChange,
						})}
					/>
					<span className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-400"}`}>
						{characterCount}/{MAX_MESSAGE_LENGTH} characters
					</span>
					{errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
				</li>
			</ul>

			<button
				className="bg-purple-500 font-semibold hover:shadow-form outline-none p-3 rounded-md text-base text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
				title="Submit the form"
				type="submit"
				disabled={isSubmitDisabled}
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
		</form>
	)
}
