/**
 * Authentication API layer
 * All HTTP calls for auth feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import {
	LoginFormValues,
	LoginResponse,
	OtpType,
	RegisterFormValues,
	RegisterResponse,
	RequestOtpFormValues,
	RequestOtpResponse,
	VerifyOtpFormValues,
	VerifyOtpResponse,
} from "../types";

export const authApi = {
	login: (data: LoginFormValues) => {
		return apiClient.post<LoginResponse>(endpoints.auth.login, data);
	},

	register: (data: RegisterFormValues) => {
		return apiClient.post<RegisterResponse>(endpoints.auth.register, data);
	},

	requestOtp: (data: RequestOtpFormValues & { otp_type: OtpType }) => {
		return apiClient.post<RequestOtpResponse>(
			endpoints.auth.requestOtp,
			data,
		);
	},

	verifyOtp: (data: VerifyOtpFormValues) => {
		return apiClient.post<VerifyOtpResponse>(
			endpoints.auth.verifyOtp,
			data,
		);
	},
};
