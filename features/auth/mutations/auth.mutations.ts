import { useMutation } from "@tanstack/react-query";

import { authApi } from "../api";

export function useLogin() {
	return useMutation({
		mutationFn: authApi.login,
	});
}

export function useRegister() {
	return useMutation({
		mutationFn: authApi.register,
	});
}

export function useRequestOtp() {
	return useMutation({
		mutationFn: authApi.requestOtp,
	});
}

export function useVerifyOtp() {
	return useMutation({
		mutationFn: authApi.verifyOtp,
	});
}
