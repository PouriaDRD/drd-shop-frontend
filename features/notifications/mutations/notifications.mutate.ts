"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { notificationsApi } from "../api";

export function useMyNotificationsQuery() {
	return useQuery({
		queryKey: queryKeys.notifications.myNotifications,
		queryFn: notificationsApi.getMyNotifications,

		// auto refresh every 10 seconds
		refetchInterval: 10 * 1000,
	});
}
