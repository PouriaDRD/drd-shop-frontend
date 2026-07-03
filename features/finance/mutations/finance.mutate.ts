"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { financeApi } from "../api";

export const useCards = () => {
	return useQuery({
		queryKey: queryKeys.finance.cards,
		queryFn: financeApi.cards,
		// auto refresh every 90 seconds
		refetchInterval: 90 * 1000,
	});
};

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

export const useMyPurchases = () => {
	return useQuery({
		queryKey: queryKeys.finance.purchases,
		queryFn: financeApi.myPurchases,
	});
};

export const useMyRefundToWallet = () => {
	return useQuery({
		queryKey: queryKeys.finance.refundToWallet,
		queryFn: financeApi.myRefundToWallet,
	});
};

export const useMyRefundToUser = () => {
	return useQuery({
		queryKey: queryKeys.finance.refundToUser,
		queryFn: financeApi.myRefundToUser,
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
