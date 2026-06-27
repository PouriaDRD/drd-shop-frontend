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

export const authApi = {
	/**
	 * Request OTP code
	 */
	requestOtp: (data: RequestOtpFormValues) => {
		return apiClient.post<RequestOtpResponse>(
			endpoints.auth.requestOtp,
			data,
		);
	},

	/**
	 * Verify OTP and get JWT tokens
	 */
	verifyOtp: (data: VerifyOtpFormValues) => {
		return apiClient.post<VerifyOtpResponse>(
			endpoints.auth.verifyOtp,
			data,
		);
	},
};
