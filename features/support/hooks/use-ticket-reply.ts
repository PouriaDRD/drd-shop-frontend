import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/features/api/lib";

import { supportApi } from "../api";

export function useTicketReply(ticketId: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: FormData) =>
			supportApi.replyTicket({
				ticketId,
				data,
			}),

		onSuccess: async (res) => {
			if (!res.success) {
				toast.error("خطا در ثبت پیام");
				return;
			}

			if (res.success) {
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.support.ticketDetails(ticketId),
					}),

					queryClient.invalidateQueries({
						queryKey: queryKeys.support.myTickets,
					}),
				]);
			}
		},
		onError() {
			toast.error("خطا در ثبت پیام");
		},
	});
}
