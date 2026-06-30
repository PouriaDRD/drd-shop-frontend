/**
 * Notifications API layer
 * All HTTP calls for notifications feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { Announcement } from "../types";

export const announcementsApi = {
	getAnnouncements: () => {
		return apiClient.get<Announcement[]>(
			endpoints.notifications.announcements,
		);
	},
};
