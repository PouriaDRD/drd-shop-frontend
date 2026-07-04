export type Cart = {
	id: string;
	subtotal: number;
	discount: number;
	total_price: number;
	items: CartItem[];
};

export interface CartItem {
	id?: string;
	plan_id: string;
	plan_title: string;
	product_id: string;
	quantity: number;
	unit_price: number;
	total_price: number;
}

export interface CartStore {
	items: CartItem[];

	addItem: (item: CartItem) => void;

	setItems: (items: CartItem[]) => void;

	updateItemData: (plan_id: string, data: Partial<CartItem>) => void;

	removeItem: (plan_id: string) => void;

	updateItemId: (plan_id: string, item_id: string) => void;

	updateQuantity: (plan_id: string, quantity: number) => void;

	increaseQuantity: (plan_id: string) => void;

	decreaseQuantity: (plan_id: string) => void;

	clear: () => void;

	hasItem: (plan_id: string) => boolean;

	getItem: (plan_id: string) => CartItem | undefined;

	totalItems: () => number;

	totalPrice: () => number;
}
