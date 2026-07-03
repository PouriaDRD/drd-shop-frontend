import { PlanFeature } from "./product.type";

export interface CartItem {
	productId: string;
	productSlug: string;

	planId: string;

	title: string;
	description?: string | null;

	price: number;

	quantity: number;

	features: PlanFeature[];
}

export interface CartStore {
	items: CartItem[];

	addItem: (item: CartItem) => void;

	removeItem: (planId: string) => void;

	updateQuantity: (planId: string, quantity: number) => void;

	increaseQuantity: (planId: string) => void;

	decreaseQuantity: (planId: string) => void;

	clear: () => void;

	hasItem: (planId: string) => boolean;

	getItem: (planId: string) => CartItem | undefined;

	totalItems: () => number;

	totalPrice: () => number;
}
