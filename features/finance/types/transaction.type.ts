export type TransactionStatus =
	| "pending"
	| "approved"
	| "rejected"
	| "canceled";

export type TransactionType =
	| "deposit"
	| "purchase"
	| "refund_to_wallet"
	| "refund_to_user"
	| "withdraw"
	| "adjustment"
	| "referral_reward";

export type Transaction = {
	id: number;
	amount: number;
	type: TransactionType;
	status: TransactionStatus;
	description?: string | null;
	created_at: Date;
};
