import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CartItem, CartStore } from "../types";

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (item) => {
				const exists = get().items.find(
					(i) => i.plan_id === item.plan_id,
				);

				if (exists) {
					set({
						items: get().items.map((i) =>
							i.plan_id === item.plan_id
								? {
										...i,
										quantity: i.quantity + item.quantity,
										is_renewal: item.is_renewal,
										service_id: item.service_id,
									}
								: i,
						),
					});

					return;
				}

				set({
					items: [...get().items, item],
				});
			},

			setItems: (items: CartItem[]) =>
				set(() => ({
					items,
				})),

			updateItemData: (plan_id, data) =>
				set({
					items: get().items.map((i) =>
						i.plan_id === plan_id
							? {
									...i,
									...data,
								}
							: i,
					),
				}),

			removeItem: (plan_id) =>
				set({
					items: get().items.filter((i) => i.plan_id !== plan_id),
				}),

			updateItemId: (plan_id, item_id) =>
				set({
					items: get().items.map((i) =>
						i.plan_id === plan_id
							? {
									...i,
									id: item_id,
								}
							: i,
					),
				}),

			updateQuantity: (plan_id, quantity) => {
				if (quantity <= 0) {
					get().removeItem(plan_id);
					return;
				}

				set({
					items: get().items.map((i) =>
						i.plan_id === plan_id
							? {
									...i,
									quantity,
								}
							: i,
					),
				});
			},

			increaseQuantity: (plan_id) => {
				const item = get().items.find((i) => i.plan_id === plan_id);
				if (!item) return;
				set({
					items: get().items.map((i) =>
						i.plan_id === plan_id
							? {
									...i,
									quantity: i.quantity + 1,
								}
							: i,
					),
				});
			},

			decreaseQuantity: (plan_id) => {
				const item = get().items.find((i) => i.plan_id === plan_id);
				if (!item) return;
				set({
					items: get().items.map((i) =>
						i.plan_id === plan_id
							? {
									...i,
									quantity: i.quantity - 1,
								}
							: i,
					),
				});
			},

			clear: () =>
				set({
					items: [],
				}),

			hasItem: (plan_id) =>
				get().items.some((i) => i.plan_id === plan_id),

			getItem: (plan_id) =>
				get().items.find((i) => i.plan_id === plan_id),

			totalItems: () =>
				get().items.reduce((sum, item) => sum + item.quantity, 0),

			totalPrice: () =>
				get().items.reduce(
					(sum, item) => sum + item.total_price * item.quantity,
					0,
				),
		}),
		{
			name: "shopping-cart",
		},
	),
);
