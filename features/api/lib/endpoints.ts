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
		cards: "finance/cards/",
		wallet: "finance/my-wallet/",
		deposits: "finance/my-deposits/",
		purchases: "finance/my-purchases/",
		transactions: "finance/my-transactions/",
		requestDeposit: "finance/request-deposit/",
		refundToUser: "finance/my-refund-to-user/",
		refundToWallet: "finance/my-refund-to-wallet/",
	},

	shop: {
		cart: "shop/my-cart/",
		products: "shop/products/",
		productDetails: (id: string) => `shop/products/${id}/`,
		// items
		addItem: "shop/my-cart/add-item/",
		updateItem: (id: string) => `shop/my-cart/update-item/${id}/`,
		removeItem: (id: string) => `shop/my-cart/remove-item/${id}/`,
	},
};
