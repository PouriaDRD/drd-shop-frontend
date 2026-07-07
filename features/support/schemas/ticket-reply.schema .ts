import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ticketReplySchema = z.object({
	message: z.string().trim().min(1, "پیام باید حداقل 1 کاراکتر باشد."),

	attachments: z
		.array(
			z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
				message: "حجم هر فایل باید کمتر از 10 مگابایت باشد.",
			}),
		)
		.max(5, "حداکثر 5 فایل مجاز است."),
});
