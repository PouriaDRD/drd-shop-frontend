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

	notifications: {
		announcements: "notifications/announcements/",
	},

	finance: {
		wallet: "finance/my-wallet/",
		deposits: "finance/my-deposits/",
		transactions: "finance/my-transactions/",

		// transaction: (id: string) => `finance/transactions/${id}/`,
	},
};
