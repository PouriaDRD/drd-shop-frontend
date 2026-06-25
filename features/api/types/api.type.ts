/**
 * Base success response.
 */
export interface ApiSuccessResponse<T = unknown> {
	success: true;
	message: string;
	data: T;
}

/**
 * Base error response.
 */
export interface ApiErrorResponse {
	success: false;
	message: string;
	errors: string | Record<string, string | string[]>;
}

/**
 * Union of all API responses.
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
