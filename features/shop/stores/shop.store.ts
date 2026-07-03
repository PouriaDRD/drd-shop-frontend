import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CartStore } from "../types";

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (item) => {
				const exists = get().items.find(
					(i) => i.planId === item.planId,
				);

				if (exists) {
					set({
						items: get().items.map((i) =>
							i.planId === item.planId
								? {
										...i,
										quantity: i.quantity + item.quantity,
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

			removeItem: (planId) =>
				set({
					items: get().items.filter((i) => i.planId !== planId),
				}),

			updateQuantity: (planId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(planId);
					return;
				}

				set({
					items: get().items.map((i) =>
						i.planId === planId
							? {
									...i,
									quantity,
								}
							: i,
					),
				});
			},

			increaseQuantity: (planId) => {
				const item = get().items.find((i) => i.planId === planId);
				if (!item) return;
				set({
					items: get().items.map((i) =>
						i.planId === planId
							? {
									...i,
									quantity: i.quantity + 1,
								}
							: i,
					),
				});
			},

			decreaseQuantity: (planId) => {
				const item = get().items.find((i) => i.planId === planId);
				if (!item) return;
				set({
					items: get().items.map((i) =>
						i.planId === planId
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

			hasItem: (planId) => get().items.some((i) => i.planId === planId),

			getItem: (planId) => get().items.find((i) => i.planId === planId),

			totalItems: () =>
				get().items.reduce((sum, item) => sum + item.quantity, 0),

			totalPrice: () =>
				get().items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0,
				),
		}),
		{
			name: "shopping-cart",
		},
	),
);
