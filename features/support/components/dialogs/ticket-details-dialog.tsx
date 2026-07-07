"use client";

import { useState } from "react";

import { Eye } from "lucide-react";

import {
	Badge,
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui";

import { Ticket, TicketStatus } from "../../types";
import { TicketConversation } from "../conversations";

interface Props {
	ticket: Ticket;
}

/* =========================
   MAIN DIALOG
========================= */
export function TicketDetailsDialog({ ticket }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Eye className="size-4" />
					جزئیات
				</Button>
			</DialogTrigger>

			<DialogContent className="w-full max-w-sm">
				<DialogHeader>
					<DialogTitle className="flex flex-col gap-2">
						<span>{ticket.title}</span>

						<Badge variant={STATUS_MAP[ticket.status].color}>
							{STATUS_MAP[ticket.status].label}
						</Badge>
					</DialogTitle>
				</DialogHeader>

				<TicketConversation ticket_id={ticket.id} />
			</DialogContent>
		</Dialog>
	);
}

const STATUS_MAP: Record<
	TicketStatus,
	{
		label: string;
		color: "success" | "info" | "destructive" | "outline";
	}
> = {
	open: {
		label: "باز",
		color: "success",
	},

	answered: {
		label: "پاسخ داده شده",
		color: "info",
	},

	closed: {
		label: "بسته شده",
		color: "destructive",
	},
};
