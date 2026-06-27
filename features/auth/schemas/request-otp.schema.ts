import { z } from "zod";

export const requestOtpSchema = z.object({
	phone_number: z
		.string()
		.min(11, "شماره موبایل نامعتبر است")
		.max(11, "شماره موبایل نامعتبر است")
		.regex(/^09\d{9}$/, "شماره موبایل نامعتبر است"),
});
