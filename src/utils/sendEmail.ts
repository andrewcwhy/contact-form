import { FormData } from "@/schemas/contact-form.schema"

export function sendEmail(data: FormData) {
    const apiEndpoint = "/api/email"

    fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((response) => {
            alert(response.message)
        })
        .catch((err) => {
            alert(err)
        })
}