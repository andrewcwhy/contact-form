import type { Metadata } from "next"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
    title: "Contact Us",
}

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
            <ContactForm />
        </main>
    )
}
