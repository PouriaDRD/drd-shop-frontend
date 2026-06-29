import { z } from "zod";

// import { OTP_TYPES } from "../types";

export const requestOtpSchema = z.object({
	email: z.email("ایمیل معتبر نیست"),
	// otp_type: z.enum(OTP_TYPES).default("login"),
});

export const verifyOtpSchema = z.object({
	email: z.email("ایمیل معتبر نیست"),
	code: z.string().length(6, "کد باید ۶ رقم باشد"),
});
