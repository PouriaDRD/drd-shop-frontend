/**
 * SHOP API layer
 *
 * All HTTP calls for shop feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { Cart, CartItem, Product, ProductDetail } from "../types";

export const shopApi = {
	checkout: () => {
		// TODO: returns order
		return apiClient.post<Cart>(endpoints.shop.checkout);
	},

	getMyCart: () => {
		return apiClient.get<Cart>(endpoints.shop.cart);
	},

	getProducts: () => {
		return apiClient.get<Product[]>(endpoints.shop.products);
	},

	getProductDetails: (id: string) => {
		return apiClient.get<ProductDetail>(endpoints.shop.productDetails(id));
	},

	// items
	addItem: (item: CartItem) => {
		return apiClient.post<{
			cart: Cart;
			item: CartItem;
		}>(endpoints.shop.addItem, {
			plan_id: item.plan_id,
			product_id: item.product_id,
			quantity: item.quantity,
		});
	},

	updateItem: (item_id: string, new_quantity: number) => {
		return apiClient.patch<{
			cart: Cart;
			item: CartItem;
		}>(endpoints.shop.updateItem(item_id), {
			quantity: new_quantity,
		});
	},

	removeItem: (item_id: string) => {
		return apiClient.delete<{
			id: string;
			deleted: boolean;
		}>(endpoints.shop.removeItem(item_id));
	},
};
