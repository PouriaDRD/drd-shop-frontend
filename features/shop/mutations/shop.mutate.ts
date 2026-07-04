"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { shopApi } from "../api";
import { CartItem } from "../types";

export const useCheckout = () => {
	return useMutation({
		mutationFn: shopApi.checkout,
	});
};

export const useMyCart = () => {
	return useQuery({
		queryKey: queryKeys.shop.cart,
		queryFn: shopApi.getMyCart,
		// auto refresh every 20 seconds
		refetchInterval: 20 * 1000,
	});
};

export const useProducts = () => {
	return useQuery({
		queryKey: queryKeys.shop.products,
		queryFn: shopApi.getProducts,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useProductDetail = (id: string) => {
	return useQuery({
		queryKey: queryKeys.shop.productDetails(id),
		queryFn: () => shopApi.getProductDetails(id),
	});
};

/**
 * Add single item
 */
export const useAddItem = () => {
	return useMutation({
		mutationFn: (item: CartItem) => shopApi.addItem(item),
	});
};

/**
 * Update single item
 */
export const useUpdateItem = () => {
	return useMutation({
		mutationFn: ({
			item_id,
			new_quantity,
		}: {
			item_id: string;
			new_quantity: number;
		}) => shopApi.updateItem(item_id, new_quantity),
	});
};

/**
 * Remove single item
 */
export const useRemoveItem = () => {
	return useMutation({
		mutationFn: (item_id: string) => shopApi.removeItem(item_id),
	});
};
