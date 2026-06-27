"use server";

import { RequestOtpFormValues, RequestOtpResponse } from "../types";

const API_URL = process.env.API_URL;

export default async function requestOtpAction(
	data: RequestOtpFormValues,
): Promise<RequestOtpResponse> {
	try {
		const response = await fetch(`${API_URL}/authentication/request-otp/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error[requestOtpAction]:", error);
		}

		return {
			success: false,
			message: "خطا در ارسال کد تایید",
			errors: "خطا در ارسال کد تایید",
		};
	}
}
