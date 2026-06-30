import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { announcementsApi } from "../api";

export function useAnnouncementsQuery() {
	return useQuery({
		queryKey: queryKeys.notifications.announcements,
		queryFn: announcementsApi.getAnnouncements,

		// auto refresh every 90 seconds
		refetchInterval: 90 * 1000,
	});
}
