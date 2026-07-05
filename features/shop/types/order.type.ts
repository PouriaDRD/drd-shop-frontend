import { Plan } from "./product.type";

export type OrderStatus = "pending" | "paid" | "failed" | "canceled";

export type Order = {
	id: string;
	status: OrderStatus;
	total_price: number;
	created_at: Date;
	items: OrderItem[];
};

export type OrderItem = {
	id: string;
	product_id: string;
	product_title: string;
	quantity: number;
	price: number;
	plan: Plan;
};
