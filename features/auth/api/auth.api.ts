/**
 * Authentication API layer
 * All HTTP calls for auth feature
 */

import { apiClient, endpoints } from "@/features/api/lib";

import {
	RequestOtpFormValues,
	RequestOtpResponse,
	VerifyOtpFormValues,
	VerifyOtpResponse,
} from "../types";
import { LoginFormValues, LoginResponse } from "../types/login.type";
import { RegisterFormValues, RegisterResponse } from "../types/register.type";

export const authApi = {
	login: (data: LoginFormValues) => {
		return apiClient.post<LoginResponse>(endpoints.auth.login, data);
	},

	register: (data: RegisterFormValues) => {
		return apiClient.post<RegisterResponse>(endpoints.auth.register, data);
	},

	requestOtp: (data: RequestOtpFormValues) => {
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
