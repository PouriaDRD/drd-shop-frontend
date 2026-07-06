/**
 * Notifications API layer
 * All HTTP calls for notifications feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { NotificationList } from "../types";

export const notificationsApi = {
	getMyNotifications: () => {
		return apiClient.get<NotificationList>(
			endpoints.notifications.myNotifications,
		);
	},

	markAllNotificationsAsRead: () => {
		return apiClient.post<{
			is_read: boolean;
		}>(endpoints.notifications.markAllAsRead);
	},
};
