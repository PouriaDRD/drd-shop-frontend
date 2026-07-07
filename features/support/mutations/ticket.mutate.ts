"use client";

import { useQuery } from "@tanstack/react-query";

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
 * Get ticket details
 */
export const useTicketDetails = (id: string) => {
	return useQuery({
		queryKey: queryKeys.support.ticketDetails(id),
		queryFn: () => supportApi.getTicketDetails(id),
		// auto refresh every 10 seconds
		refetchInterval: 10 * 1000,
	});
};
