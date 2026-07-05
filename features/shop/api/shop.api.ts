/**
 * SHOP API layer
 *
 * All HTTP calls for shop feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import {
	Cart,
	CartItem,
	Order,
	Product,
	ProductDetail,
	VpnService,
} from "../types";

export const shopApi = {
	checkout: () => {
		// TODO: returns order
		return apiClient.post<Cart>(endpoints.billing.checkout);
	},

	getMyCart: () => {
		return apiClient.get<Cart>(endpoints.billing.cart);
	},

	getProducts: () => {
		return apiClient.get<Product[]>(endpoints.commerce.products);
	},

	getProductDetails: (id: string) => {
		return apiClient.get<ProductDetail>(
			endpoints.commerce.productDetails(id),
		);
	},

	// items
	addItem: (item: CartItem) => {
		return apiClient.post<{
			cart: Cart;
			item: CartItem;
		}>(endpoints.billing.addItem, {
			plan_id: item.plan_id,
			product_id: item.product_id,
			quantity: item.quantity,
		});
	},

	updateItem: (item_id: string, new_quantity: number) => {
		return apiClient.patch<{
			cart: Cart;
			item: CartItem;
		}>(endpoints.billing.updateItem(item_id), {
			quantity: new_quantity,
		});
	},

	removeItem: (item_id: string) => {
		return apiClient.delete<{
			id: string;
			deleted: boolean;
		}>(endpoints.billing.removeItem(item_id));
	},

	// orders
	getMyOrders: () => {
		return apiClient.get<Order[]>(endpoints.billing.myOrders);
	},

	// vpn services
	getMyVpnServices: () => {
		return apiClient.get<VpnService[]>(endpoints.commerce.myV2rayServices);
	},
};
