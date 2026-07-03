export type RefundToUserStatus =
	| "pending"
	| "approved"
	| "rejected"
	| "canceled";

export type RefundToUserPaymentMethod = "card_to_card" | "online_gateway";

export type RefundToUser = {
	id: number;
	amount: number;
	reference_number: string;
	tracking_code: string;
	receiver_name: string;
	receiver_card_number: string;
	receiver_iban: string;
	transaction_date: Date;
	transaction_time: string;
	payment_method: RefundToUserPaymentMethod;
	status: RefundToUserStatus;
	is_processed: boolean;
	reason: string | null;
	created_at: Date;
};
