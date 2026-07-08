"use client";

import { useEffect, useMemo } from "react";

import { useMyCart } from "../mutations";
import { useCartStore } from "../stores";

export function useCart() {
	const { data, isLoading } = useMyCart();

	const setItems = useCartStore((state) => state.setItems);

	const cart = data?.success ? data.data : null;
	const cartItems = useMemo(() => cart?.items ?? [], [cart?.items]);

	useEffect(() => {
		if (!cart) return;
		setItems(cartItems);
	}, [cart, cartItems, setItems]);

	return {
		cart,
		cartItems,
		isLoading,
	};
}
