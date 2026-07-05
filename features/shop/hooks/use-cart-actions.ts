"use client";

import { useQueryClient } from "@tanstack/react-query";

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
					cartStore.addItem(item);
				}
				await Promise.all([
					queryClient.invalidateQueries({
						queryKey: queryKeys.billing.cart,
					}),
				]);
			},
			onError: async () => {
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
	};
}
