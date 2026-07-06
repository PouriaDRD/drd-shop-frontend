export type NotificationType = "info" | "success" | "warning" | "error";

export type Notification = {
	id: string;
	title: string;
	message: string;
	type: NotificationType;
	is_read: boolean;
	created_at: string;
};

export type NotificationList = {
	unread_count: number;
	notifications: Notification[];
};
