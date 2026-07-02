/**
 * Finance API layer
 *
 * All HTTP calls for finance feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import { Deposit, Transaction, Wallet } from "../types";

export const financeApi = {
	myWallet: () => {
		return apiClient.get<Wallet>(endpoints.finance.wallet);
	},

	myDeposits: () => {
		return apiClient.get<Deposit[]>(endpoints.finance.deposits);
	},

	myTransactions: () => {
		return apiClient.get<Transaction[]>(endpoints.finance.transactions);
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
