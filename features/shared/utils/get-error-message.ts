import { ApiError } from "@/features/api/types";

export function getErrorMessage(error: ApiError): string {
	if (typeof error === "string") {
		return error;
	}

	if ("detail" in error) {
		return String(error.detail);
	}

	const firstKey = Object.keys(error)[0];

	if (!firstKey) {
		return "خطای ناشناخته ای رخ داده است";
	}

	const value = error[firstKey];

	return Array.isArray(value) ? value[0] : String(value);
}
