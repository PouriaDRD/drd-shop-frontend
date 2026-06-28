export const endpoints = {
	auth: {
		login: "authentication/login/",
		register: "authentication/register/",
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
