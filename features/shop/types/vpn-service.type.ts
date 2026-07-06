export type VpnServiceStatus = "active" | "expired" | "unknown";

export type VpnServiceStats = {
	remaining_volume: {
		value: number;
		unit: "KB" | "MB" | "GB" | "TB";
	} | null;
	status: VpnServiceStatus;
};

export type VpnService = {
	id: string;
	plan_id: string;
	plan_title: string;
	product_id: string;
	product_title: string;
	subscription_link: string;
	content: string;
	expires_at: string; // API string
	created_at: string; // API string
	stats: VpnServiceStats;
};
