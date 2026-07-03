export type RefundToWalletStatus =
	| "pending"
	| "approved"
	| "rejected"
	| "canceled";

export type RefundToWallet = {
	id: number;
	amount: number;
	reason: string | null;
	status: RefundToWalletStatus;
	created_at: Date;
};
