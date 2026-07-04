export const queryKeys = {
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
	},

	notifications: {
		announcements: ["announcements"],
	},

	shop: {
		cart: ["shop", "my-cart"],
		products: ["shop", "products"],
		productDetails: (id: string) => ["shop", "products", id],
	},
};
