export type DownloadPlatform =
	| "windows"
	| "android"
	| "ios"
	| "macos"
	| "linux"
	| "github"
	| "google-play"
	| "app-store"
	| "microsoft-store"
	| "direct";

export type DownloadBadge = "recommended" | "popular" | "opensource" | "new";

export type DownloadLink = {
	platform: DownloadPlatform;
	href: string;
};

export type DownloadClient = {
	id: string;
	title: string;
	description: string;

	logo?: string;

	badge?: DownloadBadge;

	platforms: DownloadPlatform[];

	downloads: DownloadLink[];
};
