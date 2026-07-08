import { z } from "zod";

export const registerSchema = z
	.object({
		email: z.email("لطفا ایمیل صحیح وارد کنید"),

		referral_code: z.string("لطفا کد معرف را وارد کنید"),

		password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),

		password_confirm: z
			.string()
			.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
	})
	.refine((data) => data.password === data.password_confirm, {
		message: "رمز عبور و تکرار آن یکسان نیستند",
		path: ["password_confirm"],
	});
