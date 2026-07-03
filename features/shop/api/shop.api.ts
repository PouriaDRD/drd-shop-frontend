/**
 * SHOP API layer
 *
 * All HTTP calls for shop feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { Product, ProductDetail } from "../types";

export const shopApi = {
	getProducts: () => {
		return apiClient.get<Product[]>(endpoints.shop.products);
	},

	getProductDetails: (id: string) => {
		return apiClient.get<ProductDetail>(endpoints.shop.productDetails(id));
	},
};
