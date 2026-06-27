"use server";

import { VerifyOtpFormValues, VerifyOtpResponse } from "../types";

const API_URL = process.env.API_URL;

export default async function verifyOtpAction(
	data: VerifyOtpFormValues,
): Promise<VerifyOtpResponse> {
	try {
		const response = await fetch(`${API_URL}/authentication/verify-otp/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		return await response.json();
	} catch (error) {
		console.error("Error[verifyOtpAction]", error);

		return {
			success: false,
			message: "خطا در تایید کد",
			errors: "خطا در تایید کد",
		};
	}
}
