/**
 * Support API layer
 *
 * All HTTP calls for support feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { Ticket, TicketDetail } from "../types";

export const supportApi = {
	getMyTickets: () => {
		return apiClient.get<Ticket[]>(endpoints.support.myTickets);
	},
	getTicketDetails: (id: string) => {
		return apiClient.get<TicketDetail>(endpoints.support.ticketDetails(id));
	},

	replyTicket({ ticketId, data }: { ticketId: string; data: FormData }) {
		return apiClient.post(
			endpoints.support.replyTicket(ticketId),
			data,
			undefined,
			true, // isMultipart
		);
	},
};
