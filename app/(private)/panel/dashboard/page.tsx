"use client";

import {
	Badge,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { ThemeSwitcher } from "@/features/preferences/components";
import { toIranDateTime } from "@/features/shared/utils";
import { useUser } from "@/features/user/context";
import { User, UserRole, UserStatus } from "@/features/user/types/user.type";

function PanelDashboardPage() {
	const { user, isAuthenticated, isLoading } = useUser();

	if (isLoading) return <div>Loading user...</div>;
	if (!isAuthenticated || !user) return <div>User not found...</div>;

	return (
		<div className="p-6 flex justify-center">
			<UserInfoCard user={user} />
		</div>
	);
}

export default PanelDashboardPage;

type Props = {
	user: User;
};

function getRoleVariant(role: UserRole) {
	switch (role) {
		case "superuser":
			return "destructive";
		case "admin":
			return "default";
		default:
			return "secondary";
	}
}

function getStatusVariant(status: UserStatus) {
	switch (status) {
		case "active":
			return "default";
		case "inactive":
			return "secondary";
		case "banned":
			return "destructive";
	}
}

function UserInfoCard({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login);
	const createdAt = toIranDateTime(user.created_at);

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-lg">User Profile</CardTitle>
				<ThemeSwitcher />
			</CardHeader>

			<CardContent className="space-y-3 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Email</span>
					<span className="font-medium">{user.email}</span>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-muted-foreground">Role</span>
					<Badge variant={getRoleVariant(user.role)}>
						{user.role}
					</Badge>
				</div>

				<div className="flex justify-between items-center">
					<span className="text-muted-foreground">Status</span>
					<Badge variant={getStatusVariant(user.status)}>
						{user.status}
					</Badge>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">Verified</span>
					<span className="font-medium">
						{user.email_verified ? "Yes" : "No"}
					</span>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">Last login</span>
					<span className="font-medium">
						{lastLogin.dateWithMonthName}
					</span>
				</div>

				<div className="flex justify-between">
					<span className="text-muted-foreground">Created at</span>
					<span className="font-medium">
						{createdAt.dateWithMonthName}
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
