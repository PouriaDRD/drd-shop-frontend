import { ApiErrorResponse } from "@/features/api";

export function getErrorMessage(error: ApiErrorResponse): string {
	if (typeof error.errors === "string") {
		return error.errors;
	}

	if ("detail" in error.errors) {
		return String(error.errors.detail);
	}

	const firstKey = Object.keys(error.errors)[0];

	if (!firstKey) {
		return error.message;
	}

	const value = error.errors[firstKey];

	return Array.isArray(value) ? value[0] : String(value);
}
