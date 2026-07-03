/**
 * Finance API layer
 *
 * All HTTP calls for finance feature
 */

import { apiClient, endpoints } from "@/features/api/lib";
import { Card } from "@/features/shared/types";

import {
	Deposit,
	RefundToUser,
	RefundToWallet,
	Transaction,
	Wallet,
} from "../types";

export const financeApi = {
	cards: () => {
		return apiClient.get<Card[]>(endpoints.finance.cards);
	},

	myWallet: () => {
		return apiClient.get<Wallet>(endpoints.finance.wallet);
	},

	myDeposits: () => {
		return apiClient.get<Deposit[]>(endpoints.finance.deposits);
	},

	myTransactions: () => {
		return apiClient.get<Transaction[]>(endpoints.finance.transactions);
	},

	myRefundToWallet: () => {
		return apiClient.get<RefundToWallet[]>(
			endpoints.finance.refundToWallet,
		);
	},

	myRefundToUser: () => {
		return apiClient.get<RefundToUser[]>(endpoints.finance.refundToUser);
	},

	async requestDepositApi(data: FormData) {
		return apiClient.post<Deposit>(
			endpoints.finance.requestDeposit,
			data,
			undefined,
			true, // isMultipart
		);
	},
};
