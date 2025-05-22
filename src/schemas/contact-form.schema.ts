import * as z from "zod";

const formValidation = {
	nameMax: 50,
	subject: { min: 5, max: 100 },
	message: { min: 30, max: 1000 },
};

const contactFormSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(formValidation.nameMax, `Name must be less than ${formValidation.nameMax} characters`),
	email: z
		.email("Invalid email address")
		.min(1, "Email is required"),
	subject: z
		.string()
		.min(formValidation.subject.min, `Subject must be at least ${formValidation.subject.min} characters`)
		.max(formValidation.subject.max, `Subject must be less than ${formValidation.subject.max} characters`),
	message: z
		.string()
		.min(formValidation.message.min, `Message must be at least ${formValidation.message.min} characters`)
		.max(formValidation.message.max, `Message must be less than ${formValidation.message.max} characters`),
});

export type FormData = z.infer<typeof contactFormSchema>;
