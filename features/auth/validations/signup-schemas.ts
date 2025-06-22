import { z } from "zod";

// Page 1 schema - Personal Information
export const page1Schema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	citizenId: z.string().min(1, "Citizen ID is required"),
	gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender" }),
	dateOfBirth: z.string().min(1, "Date of birth is required"),
	address: z.string().min(1, "Address is required"),
});

// Page 2 schema - Contact Information
export const page2Schema = z.object({
	phone: z.string().min(1, "Phone number is required"),
	email: z.string().min(1, "Email is required").email(),
	password: z
		.string()
		.min(6, "Must be at least 6 characters in length")
		.regex(new RegExp(".*[A-Z].*"), "One uppercase character")
		.regex(new RegExp(".*[a-z].*"), "One lowercase character")
		.regex(new RegExp(".*\\d.*"), "One number")
		.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
});

export type Page1SchemaType = z.infer<typeof page1Schema>;
export type Page2SchemaType = z.infer<typeof page2Schema>;
