import { z } from "zod";

import { Ticket_Category_TYPES } from "../types";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ticketCreateSchema = z.object({
	title: z.string().min(3, "عنوان تیکت حداقل باید 3 کاراکتر باشد"),

	message: z.string().min(5, "متن پیام حداقل باید 5 کاراکتر باشد"),

	category: z.enum(Ticket_Category_TYPES),

	attachments: z
		.array(
			z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
				message: "حجم هر فایل باید کمتر از 10 مگابایت باشد.",
			}),
		)
		.max(5, "حداکثر 5 فایل مجاز است."),
});
