"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { shopApi } from "../api";

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
