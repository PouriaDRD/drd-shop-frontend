import { z } from "zod";

export const applyCouponSchema = z.object({
	code: z.string().min(1, "کد کارت باید حداقل یک کاراکتر باشد"),
});
