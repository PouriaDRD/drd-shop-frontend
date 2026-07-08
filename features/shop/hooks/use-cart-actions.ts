"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/features/api/lib";

import { useAddItem, useRemoveItem, useUpdateItem } from "../mutations";
import { useCartStore } from "../stores";
import type { CartItem } from "../types";

export function useCartActions() {
	const queryClient = useQueryClient();

	const cartStore = useCartStore();

	const addItemMutation = useAddItem();
	const updateItemMutation = useUpdateItem();
	const removeItemMutation = useRemoveItem();

	function addItem(item: CartItem) {
		cartStore.addItem(item);

		addItemMutation.mutate(item, {
			onSuccess: async (data) => {
				if (!data.success) {
					toast.error("خطا در اضافه کردن محصول", {
						description: data.message,
					});
					cartStore.removeItem(item.plan_id);
				} else {
					cartStore.updateItemData(item.plan_id, data.data.item);
				}
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.billing.cart,
					}),
				]);
			},

			onError: async () => {
				toast.error("خطا در اضافه کردن محصول");
				cartStore.removeItem(item.plan_id);
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.billing.cart,
					}),
				]);
			},
		});
	}

	function increaseQuantity(plan_id: string) {
		const item = cartStore.getItem(plan_id);
		if (!item) return;

		const new_quantity = item.quantity + 1;
		cartStore.increaseQuantity(plan_id);

		updateItemMutation.mutate(
			{ item_id: item.id!, new_quantity: new_quantity },
			{
				onSuccess: async (data) => {
					if (!data.success) {
						toast.error("خطا در اضافه کردن محصول", {
							description: data.message,
						});
						cartStore.decreaseQuantity(plan_id);
					} else {
						cartStore.updateItemData(item.plan_id, data.data.item);
					}
					await Promise.all([
						queryClient.invalidateQueries({
							queryKey: queryKeys.billing.cart,
						}),
					]);
				},
				onError: async () => {
					toast.error("خطا در اضافه کردن محصول");
					cartStore.decreaseQuantity(plan_id);
					await Promise.all([
						queryClient.invalidateQueries({
							queryKey: queryKeys.billing.cart,
						}),
					]);
				},
			},
		);
	}

	function decreaseQuantity(plan_id: string) {
		const item = cartStore.getItem(plan_id);
		if (!item) return;

		const new_quantity = item.quantity - 1;
		cartStore.decreaseQuantity(plan_id);

		if (new_quantity <= 0) {
			removeItemMutation.mutate(item.id!, {
				onSuccess: async (data) => {
					if (!data.success) {
						toast.error("خطا در حذف کردن محصول", {
							description: data.message,
						});
						cartStore.addItem(item);
					} else {
						cartStore.removeItem(item.plan_id);
					}
					await Promise.all([
						queryClient.invalidateQueries({
							queryKey: queryKeys.billing.cart,
						}),
					]);
				},
				onError: async () => {
					toast.error("خطا در حذف کردن محصول");
					cartStore.addItem(item);
					await Promise.all([
						queryClient.invalidateQueries({
							queryKey: queryKeys.billing.cart,
						}),
					]);
				},
			});
		} else {
			updateItemMutation.mutate(
				{ item_id: item.id!, new_quantity: new_quantity },
				{
					onSuccess: async (data) => {
						if (!data.success) {
							toast.error("خطا در حذف کردن محصول", {
								description: data.message,
							});
							cartStore.increaseQuantity(plan_id);
						} else {
							cartStore.updateItemData(
								item.plan_id,
								data.data.item,
							);
						}
						await Promise.all([
							queryClient.invalidateQueries({
								queryKey: queryKeys.billing.cart,
							}),
						]);
					},
					onError: async () => {
						toast.error("خطا در حذف کردن محصول");
						cartStore.increaseQuantity(plan_id);
						await Promise.all([
							queryClient.invalidateQueries({
								queryKey: queryKeys.billing.cart,
							}),
						]);
					},
				},
			);
		}
	}

	function removeItem(plan_id: string) {
		const item = cartStore.getItem(plan_id);
		if (!item) return;

		cartStore.removeItem(item.plan_id);

		removeItemMutation.mutate(item.id!, {
			onSuccess: async (data) => {
				if (!data.success) {
					toast.error("خطا در حذف کردن محصول", {
						description: data.message,
					});
					cartStore.addItem(item);
				}
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.billing.cart,
					}),
				]);
			},
			onError: async () => {
				toast.error("خطا در حذف کردن محصول");
				cartStore.addItem(item);
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.billing.cart,
					}),
				]);
			},
		});
	}

	return {
		addItem,
		isAddingItem: addItemMutation.isPending,

		increaseQuantity,
		isIncreasingQuantity: updateItemMutation.isPending,

		decreaseQuantity,
		isDecreasingQuantity: updateItemMutation.isPending,

		removeItem,
		isRemovingItem: removeItemMutation.isPending,

		cartStore: cartStore,
	};
}
