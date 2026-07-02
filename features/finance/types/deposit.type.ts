import { z } from "zod";

import { requestDepositSchema } from "../schemas";

export type DepositStatus = "pending" | "approved" | "rejected" | "canceled";

export type DepositPaymentMethod = "card_to_card" | "online_gateway";

export type Deposit = {
	id: number;
	amount: number;
	reference_number: string;
	tracking_code: string;
	sender_name: string;
	sender_card_number: string;
	transaction_date: Date;
	transaction_time: string;
	payment_method: DepositPaymentMethod;
	status: DepositStatus;
	is_processed: boolean;
	note?: string | null;
	created_at: Date;
};

export type RequestDepositFieldValues = z.infer<typeof requestDepositSchema>;
