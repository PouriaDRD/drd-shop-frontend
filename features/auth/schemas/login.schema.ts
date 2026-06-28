import { z } from "zod";

export const loginSchema = z.object({
	email: z.email("لطفا ایمیل صحیح وارد کنید"),

	password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});
