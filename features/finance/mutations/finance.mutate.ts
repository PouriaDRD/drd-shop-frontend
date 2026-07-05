"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/features/api/lib";

import { financeApi } from "../api";

export const useCards = () => {
	return useQuery({
		queryKey: queryKeys.finance.cards,
		queryFn: financeApi.cards,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useMyWallet = () => {
	return useQuery({
		queryKey: queryKeys.finance.wallet,
		queryFn: financeApi.myWallet,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useMyDeposits = () => {
	return useQuery({
		queryKey: queryKeys.finance.deposits,
		queryFn: financeApi.myDeposits,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useMyPurchases = () => {
	return useQuery({
		queryKey: queryKeys.finance.purchases,
		queryFn: financeApi.myPurchases,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useMyRefundToWallet = () => {
	return useQuery({
		queryKey: queryKeys.finance.refundToWallet,
		queryFn: financeApi.myRefundToWallet,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useMyRefundToUser = () => {
	return useQuery({
		queryKey: queryKeys.finance.refundToUser,
		queryFn: financeApi.myRefundToUser,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export const useMyTransactions = () => {
	return useQuery({
		queryKey: queryKeys.finance.transactions,
		queryFn: financeApi.myTransactions,
		// auto refresh every 120 seconds
		refetchInterval: 120 * 1000,
	});
};

export function useRequestDeposit() {
	return useMutation({
		mutationFn: (data: FormData) => financeApi.requestDepositApi(data),
	});
}
