/**
 * Support API layer
 *
 * All HTTP calls for support feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { AdminTicket, AdminTicketDetail, Ticket, TicketDetail } from "../types";

export const supportApi = {
	getMyTickets: () => {
		return apiClient.get<Ticket[]>(endpoints.support.myTickets);
	},

	getAdminTickets: () => {
		return apiClient.get<AdminTicket[]>(endpoints.support.adminTickets);
	},

	getTicketDetails: (id: string) => {
		return apiClient.get<TicketDetail>(endpoints.support.ticketDetails(id));
	},

	getAdminTicketDetails: (id: string) => {
		return apiClient.get<AdminTicketDetail>(
			endpoints.support.adminTicketDetails(id),
		);
	},

	replyTicket({ ticketId, data }: { ticketId: string; data: FormData }) {
		return apiClient.post(
			endpoints.support.replyTicket(ticketId),
			data,
			undefined,
			true, // isMultipart
		);
	},

	replyAdminTicket({ ticketId, data }: { ticketId: string; data: FormData }) {
		return apiClient.post(
			endpoints.support.replyAdminTicket(ticketId),
			data,
			undefined,
			true, // isMultipart
		);
	},

	createTicket(data: FormData) {
		return apiClient.post(
			endpoints.support.createTicket,
			data,
			undefined,
			true, // isMultipart
		);
	},
};
