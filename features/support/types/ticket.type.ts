import { z } from "zod";

import { ticketCreateSchema, ticketReplySchema } from "../schemas";

export type TicketStatus = "open" | "closed" | "answered";

export type TicketCategory = "general" | "payment" | "order" | "technical";
export const Ticket_Category_TYPES = [
	"general",
	"payment",
	"order",
	"technical",
] as const;

export type Ticket = {
	id: string;
	title: string;
	category: TicketCategory;
	status: TicketStatus;
	updated_at: Date;
	created_at: Date;
};

export type AdminTicket = Ticket & {
	user: string;
};

export type TicketDetail = Ticket & {
	messages: TicketMessage[];
};

export type AdminTicketDetail = AdminTicket & {
	messages: TicketMessage[];
};

export type TicketMessage = {
	id: string;
	sender: string;
	message: string;
	is_staff_reply: boolean;
	attachments?: AttachmentType[] | null;
	created_at: Date;
};

export type AttachmentType = {
	id: string;
	file: string;
	created_at: Date;
};

export type TicketReplyFormData = z.infer<typeof ticketReplySchema>;
export type TicketCreateFormData = z.infer<typeof ticketCreateSchema>;
