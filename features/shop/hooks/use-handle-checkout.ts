"use client";

import { useRouter } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/features/api/lib";

import { useCheckout } from "../mutations";
import { useCartStore } from "../stores";

interface Props {
	onSuccess?: () => void;
}

export const useHandleCheckout = ({ onSuccess }: Props) => {
	const router = useRouter();
	const mutation = useCheckout();
	const cartStore = useCartStore();
	const queryClient = useQueryClient();

	const handleOnCheckout = async () => {
		mutation.mutate(undefined, {
			onSuccess: async (data) => {
				if (!data.success) {
					toast.error(data.message || "خطا در پرداخت");
					return;
				}
				if (data.success) {
					await Promise.all([
						queryClient.invalidateQueries({
							queryKey: queryKeys.shop.cart,
						}),
						queryClient.invalidateQueries({
							queryKey: queryKeys.finance.wallet,
						}),
						queryClient.invalidateQueries({
							queryKey: queryKeys.finance.purchases,
						}),
						queryClient.invalidateQueries({
							queryKey: queryKeys.finance.transactions,
						}),
						queryClient.invalidateQueries({
							queryKey: queryKeys.accounts.me,
						}),
					]);

					toast.success("پرداخت با موفقیت انجام شد!");
					cartStore.clear();
					onSuccess?.();
					router.push("/panel/finance");
				}
			},
			onError: () => {
				toast.error("خطا در پرداخت");
			},
		});
	};

	return {
		handleOnCheckout,
		isPending: mutation.isPending,
	};
};
