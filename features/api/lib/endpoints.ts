export const endpoints = {
	auth: {
		myLoginHistory: "authentication/my-login-history/",
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
		myNotifications: "notifications/",
		markAllAsRead: "notifications/mark-all-as-read/",
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
		purchaseStatistics: "finance/purchase-statistics/",
	},

	billing: {
		cart: "billing/my-cart/",
		checkout: "billing/checkout/",

		myOrders: "billing/my-orders/",
		// items
		addItem: "billing/my-cart/add-item/",
		updateItem: (id: string) => `billing/my-cart/update-item/${id}/`,
		removeItem: (id: string) => `billing/my-cart/remove-item/${id}/`,
	},

	commerce: {
		products: "commerce/products/",
		productDetails: (id: string) => `commerce/products/${id}/`,
		myV2rayServices: "commerce/my-v2ray-vpn-services/",
	},

	support: {
		myTickets: "support/my-tickets/",
		ticketDetails: (id: string) => `support/my-tickets/${id}/`,
		replyTicket: (id: string) => `support/my-tickets/${id}/reply/`,
	},
};
