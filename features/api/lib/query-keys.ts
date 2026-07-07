export const queryKeys = {
	auth: {
		myLoginHistory: ["authentication", "my-login-history"],
	},

	accounts: {
		me: ["accounts", "me"],
	},

	finance: {
		cards: ["finance", "cards"],
		wallet: ["finance", "my-wallet"],
		deposits: ["finance", "my-deposits"],
		purchases: ["finance", "my-purchases"],
		transactions: ["finance", "my-transactions"],
		refundToUser: ["finance", "my-refund-to-user"],
		refundToWallet: ["finance", "my-refund-to-wallet"],
		purchaseStatistics: ["finance", "purchase-statistics"],
	},

	notifications: {
		announcements: ["announcements"],
		myNotifications: ["notifications", "my-notifications"],
	},

	billing: {
		cart: ["billing", "my-cart"],
		myOrders: ["billing", "my-orders"],
	},

	commerce: {
		products: ["commerce", "products"],
		productDetails: (id: string) => ["commerce", "products", id],
		myV2rayServices: ["commerce", "my-v2ray-services"],
	},
};
