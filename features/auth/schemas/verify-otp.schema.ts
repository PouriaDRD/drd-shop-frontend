import { z } from "zod";

export const verifyOtpSchema = z.object({
	otp_id: z.uuid("شناسه OTP نامعتبر است"),

	phone_number: z.string().regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),

	code: z.string().length(6, "کد تایید باید ۶ رقم باشد"),
});
