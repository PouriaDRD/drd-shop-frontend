export type SocialChannel = {
	id: string;
	platform: "telegram" | "bale" | "instagram";
	label: string;
	followers: string;
	href: string;
	bg: string; // brand background color, used only for the small icon chip
};
