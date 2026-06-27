export const endpoints = {
	auth: {
		requestOtp: "authentication/request-otp/",
		verifyOtp: "authentication/verify-otp/",
		refresh: "authentication/refresh/",
	},

	account: {
		me: "accounts/me/",
	},

	finance: {
		wallet: "finance/wallet/",

		transactions: "finance/transactions/",

		// transaction: (id: string) => `finance/transactions/${id}/`,
	},
};
