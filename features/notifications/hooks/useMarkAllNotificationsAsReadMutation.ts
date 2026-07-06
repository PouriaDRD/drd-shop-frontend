"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { notificationsApi } from "../api";

export function useMarkAllNotificationsAsReadMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: notificationsApi.markAllNotificationsAsRead,

		onMutate: async () => {
			// cancel ongoing refetch
			await queryClient.cancelQueries({
				queryKey: queryKeys.notifications.myNotifications,
			});

			// snapshot previous state
			const previousData = queryClient.getQueryData(
				queryKeys.notifications.myNotifications,
			);

			return { previousData };
		},

		onError: (_err, _vars, context) => {
			// rollback if failed
			if (context?.previousData) {
				queryClient.setQueryData(
					queryKeys.notifications.myNotifications,
					context.previousData,
				);
			}
		},

		onSettled: () => {
			// ensure sync with backend
			queryClient.invalidateQueries({
				queryKey: queryKeys.notifications.myNotifications,
			});
		},
	});
}
