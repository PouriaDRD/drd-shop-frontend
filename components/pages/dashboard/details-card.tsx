import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui";
import ConfirmEmailDialog from "@/features/auth/components/dialogs/confirm-email-dialog";
import LogoutDialog from "@/features/auth/components/dialogs/logout-dialog";
import { toIranDateTime } from "@/features/shared/utils";
import { User } from "@/features/user/types";

interface Props {
	user: User;
}

export function DetailsCard({ user }: Props) {
	const lastLogin = toIranDateTime(user.last_login);
	const createdAt = toIranDateTime(user.created_at);

	const rows: Array<{ label: string; value: React.ReactNode }> = [
		{
			label: "وضعیت ایمیل",
			value: (
				<span
					className={
						user.email_verified
							? "text-primary text-sm"
							: "text-destructive text-sm"
					}>
					{user.email_verified ? "تأیید شده" : "تأیید نشده"}
				</span>
			),
		},
		{ label: "آخرین ورود", value: lastLogin.dateWithMonthName },
		{ label: "تاریخ عضویت", value: createdAt.dateWithMonthName },
	];
	const initials = user.email.slice(0, 2).toUpperCase();

	return (
		<Card className="pb-0 md:pb-6 w-full">
			<CardHeader className="flex flex-row justify-between w-full">
				{/* Avatar */}
				<div className="space-y-2">
					<Avatar size="lg">
						<AvatarImage
							src="/images/avatar-fallback.png"
							className="p-2 bg-muted"
						/>
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>

					<div className="text-start">
						<p className="font-medium text-sm text-foreground">
							{user.email}
						</p>
					</div>
				</div>
				{!user.email_verified && <ConfirmEmailDialog />}
			</CardHeader>
			<CardContent>
				<div className="divide-y divide-border">
					{rows.map(({ label, value }) => (
						<div
							key={label}
							className="flex justify-between items-center py-2.5">
							<span className="text-sm text-muted-foreground">
								{label}
							</span>
							<span className="text-sm font-medium text-foreground">
								{value}
							</span>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className="bg-muted flex md:hidden items-center justify-center">
				<LogoutDialog collapsed={false} />
			</CardFooter>
		</Card>
	);
}
