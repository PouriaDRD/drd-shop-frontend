"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { financeApi } from "../api";

export const useMyWallet = () => {
	return useQuery({
		queryKey: queryKeys.finance.wallet,
		queryFn: financeApi.myWallet,
	});
};

export const useMyDeposits = () => {
	return useQuery({
		queryKey: queryKeys.finance.deposits,
		queryFn: financeApi.myDeposits,
	});
};

export const useMyTransactions = () => {
	return useQuery({
		queryKey: queryKeys.finance.transactions,
		queryFn: financeApi.myTransactions,
	});
};

export function useRequestDeposit() {
	return useMutation({
		mutationFn: (data: FormData) => financeApi.requestDepositApi(data),
	});
}
