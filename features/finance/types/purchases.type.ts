export type PurchasesStatus = "pending" | "approved" | "rejected" | "canceled";

export type Purchases = {
	id: string;
	amount: number;
	reason: string | null;
	status: PurchasesStatus;
	is_processed: boolean;
	created_at: Date;
};
