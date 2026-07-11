"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { supportApi } from "../api";

/**
 * Get my tickets
 */
export const useMyTickets = () => {
	return useQuery({
		queryKey: queryKeys.support.myTickets,
		queryFn: supportApi.getMyTickets,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

/**
 * Get admin tickets
 */
export const useAdminTickets = () => {
	return useQuery({
		queryKey: queryKeys.support.adminTickets,
		queryFn: supportApi.getAdminTickets,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

/**
 * Get ticket details
 */
export const useTicketDetails = (id: string) => {
	return useQuery({
		queryKey: queryKeys.support.ticketDetails(id),
		queryFn: () => supportApi.getTicketDetails(id),
		// auto refresh every 5 seconds
		refetchInterval: 5 * 1000,
	});
};

/**
 * Get admin ticket details
 */
export const useAdminTicketDetails = (id: string) => {
	return useQuery({
		queryKey: queryKeys.support.adminTicketDetails(id),
		queryFn: () => supportApi.getAdminTicketDetails(id),
		// auto refresh every 5 seconds
		refetchInterval: 5 * 1000,
	});
};

/**
 * Reply to ticket
 */
export function useTicketReply(ticketId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: FormData) =>
			supportApi.replyTicket({
				ticketId,
				data,
			}),

		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKeys.support.ticketDetails(ticketId),
				}),

				queryClient.invalidateQueries({
					queryKey: queryKeys.support.myTickets,
				}),
			]);
		},
	});
}

/**
 * Reply to admin ticket
 */
export function useAdminTicketReply(ticketId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: FormData) =>
			supportApi.replyAdminTicket({
				ticketId,
				data,
			}),

		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKeys.support.adminTicketDetails(ticketId),
				}),

				queryClient.invalidateQueries({
					queryKey: queryKeys.support.adminTickets,
				}),
			]);
		},
	});
}

export function useCreateTicket() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: FormData) => supportApi.createTicket(data),

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: queryKeys.support.myTickets,
			});
		},
	});
}
