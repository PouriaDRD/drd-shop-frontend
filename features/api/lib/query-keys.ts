export const queryKeys = {
	me: ["account", "me"] as const,

	wallet: ["finance", "wallet"] as const,

	transactions: ["finance", "transactions"] as const,

	// transaction: (id: string) => ["transactions", id] as const,
};
