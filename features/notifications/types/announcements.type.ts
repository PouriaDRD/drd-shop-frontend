export type Announcement = {
	id: string;
	title: string;
	description: string;
	type: "info" | "success" | "warning" | "error";
	button_text: string;
	button_url: string;
	starts_at: string;
	expires_at: string | null;
	created_at: string;
};
