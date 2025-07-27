import { z } from "zod";

// Helper function to validate age from DD/MM/YYYY format
const validateAge = (dateString: string) => {
	// Format validation: DD/MM/YYYY
	const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
	const match = dateString.match(dateRegex);
	
	if (!match) {
		return false;
	}
	
	const day = parseInt(match[1], 10);
	const month = parseInt(match[2], 10);
	const year = parseInt(match[3], 10);
	
	// Create date object and check if valid date
	const dateObj = new Date(year, month - 1, day);
	if (
		dateObj.getFullYear() !== year ||
		dateObj.getMonth() !== month - 1 ||
		dateObj.getDate() !== day
	) {
		return false;
	}
	
	// Age validation: 18-65 years old
	const today = new Date();
	const ageDiff = today.getFullYear() - year;
	const monthDiff = today.getMonth() - (month - 1);
	const dayDiff = today.getDate() - day;
	let age = ageDiff;
	
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}
	
	return age >= 18 && age <= 65;
};

// Page 1 schema - Personal Information
export const page1Schema = z.object({
	firstName: z.string().min(1, "Tên là bắt buộc"),
	lastName: z.string().min(1, "Họ là bắt buộc"),
	citizenId: z.string().min(1, "Số CCCD là bắt buộc"),
	gender: z.enum(["male", "female", "other"], { required_error: "Vui lòng chọn giới tính" }),
	dateOfBirth: z
		.string()
		.min(1, "Ngày sinh là bắt buộc")
		.regex(/^(\d{2})\/(\d{2})\/(\d{4})$/, "Ngày tháng phải theo định dạng DD/MM/YYYY")
		.refine((dateString) => {
			const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
			const match = dateString.match(dateRegex);
			if (!match) return false;
			
			const day = parseInt(match[1], 10);
			const month = parseInt(match[2], 10);
			const year = parseInt(match[3], 10);
			
			const dateObj = new Date(year, month - 1, day);
			return (
				dateObj.getFullYear() === year &&
				dateObj.getMonth() === month - 1 &&
				dateObj.getDate() === day
			);
		}, "Ngày tháng không hợp lệ")
		.refine((dateString) => validateAge(dateString), "Tuổi phải từ 18-65 tuổi"),
	address: z.string().min(1, "Địa chỉ là bắt buộc"),
});

// Page 2 schema - Contact Information
export const page2Schema = z.object({
	phone: z.string().min(1, "Số điện thoại là bắt buộc"),
	email: z.string().min(1, "Email là bắt buộc").email("Email không hợp lệ"),
	password: z
		.string()
		.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
		.regex(new RegExp(".*[A-Z].*"), "Phải có ít nhất một chữ cái viết hoa")
		.regex(new RegExp(".*[a-z].*"), "Phải có ít nhất một chữ cái viết thường")
		.regex(new RegExp(".*\\d.*"), "Phải có ít nhất một chữ số")
		.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "Phải có ít nhất một ký tự đặc biệt"),
});

export type Page1SchemaType = z.infer<typeof page1Schema>;
export type Page2SchemaType = z.infer<typeof page2Schema>;
