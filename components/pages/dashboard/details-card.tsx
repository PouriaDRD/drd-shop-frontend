"use client";

import { useState } from "react";

import {
	CalendarDays,
	Check,
	Copy,
	DollarSignIcon,
	Link,
	Users,
	VerifiedIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui";
import {
	ConfirmEmailDialog,
	LogoutDialog,
} from "@/features/auth/components/dialogs";
import { toIranDateTime } from "@/features/shared/utils";
import { User } from "@/features/user/types";

interface Props {
	user: User;
}

export function DetailsCard({ user }: Props) {
	const [copied, setCopied] = useState<"code" | "link" | null>(null);

	const createdAt = toIranDateTime(user.created_at);

	const lastLogin = toIranDateTime(user.last_login);

	const initials = user.email.slice(0, 2).toUpperCase();

	const referralLink = `${window.location.origin}/register?ref=${user.referral_code}`;

	const copyText = async (value: string, type: "code" | "link") => {
		await navigator.clipboard.writeText(value);

		setCopied(type);

		toast.success(type === "code" ? "کد دعوت کپی شد" : "لینک دعوت کپی شد");

		setTimeout(() => {
			setCopied(null);
		}, 2000);
	};

	return (
		<Card className="overflow-hidden pb-0 md:pb-6">
			{/* Header */}

			<CardHeader className="flex flex-row items-center justify-between">
				<div className="flex items-center gap-3">
					<Avatar size="lg">
						<AvatarImage
							src="/images/avatar-fallback.png"
							className="bg-muted p-2"
						/>

						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>

					<div className="space-y-1">
						<div className="flex items-center gap-1">
							<p className="text-sm font-semibold">
								{user.email}
							</p>

							{user.email_verified && (
								<VerifiedIcon className="size-4 text-primary" />
							)}
						</div>

						<p className="text-xs text-muted-foreground">
							عضویت: {createdAt.dateWithMonthName}
						</p>
					</div>
				</div>

				{!user.email_verified && <ConfirmEmailDialog />}
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Stats */}

				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					<div className="rounded-xl border bg-muted/30 p-4 space-y-2">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Users className="size-4" />

							<span className="text-xs">تعداد دعوت‌ها</span>
						</div>

						<p className="text-xl font-bold">
							{user.total_referrals}
						</p>
					</div>

					<div className="rounded-xl border bg-muted/30 p-4 space-y-2">
						<div className="flex items-center gap-0.5 text-muted-foreground">
							<DollarSignIcon className="size-4" />

							<span className="text-xs">درآمد از کد دعوت</span>
						</div>

						<p className="text-xs font-medium">
							{user.total_paid.toLocaleString("fa-IR")} تومان
						</p>
					</div>

					<div className="rounded-xl border bg-muted/30 p-4 space-y-2">
						<div className=" flex items-center gap-2 text-muted-foreground">
							<CalendarDays className="size-4" />

							<span className="text-xs">آخرین ورود</span>
						</div>

						<p className="text-xs font-medium">
							{lastLogin.dateWithMonthName}
						</p>
					</div>
				</div>

				{/* Referral Section */}

				<div className=" rounded-xl border bg-muted/20 p-4 space-y-4">
					<div className="flex items-center gap-2">
						<Link className="size-5 text-primary" />

						<div>
							<p className="text-sm font-semibold">دعوت دوستان</p>

							<p className="text-xs text-muted-foreground">
								به ازای هر خرید موفقی که دوستانتان داشته باشند،
								مقداری از مبلغ آن به شما هدیه داده می شود!
							</p>
						</div>
					</div>

					{/* Code */}

					<div className="flex items-center justify-between gap-3 rounded-lg border bg-background p-3">
						<div>
							<p className="text-xs text-muted-foreground">
								کد دعوت
							</p>

							<p className="font-mono text-sm font-semibold">
								{user.referral_code}
							</p>
						</div>

						<Button
							size="sm"
							variant="outline"
							onClick={() =>
								copyText(user.referral_code, "code")
							}>
							{copied === "code" ? (
								<Check className="size-4 ml-1" />
							) : (
								<Copy className="size-4 ml-1" />
							)}
							کپی کد
						</Button>
					</div>

					{/* Link */}

					<div
						className={`flex flex-col md:flex-row
							items-center
							justify-between
							gap-3
							rounded-lg
							border
							bg-background
							p-3`}>
						<div className="min-w-0">
							<p className="text-xs text-muted-foreground">
								لینک دعوت
							</p>

							<p
								dir="lrt"
								className="text-xs text-muted-foreground wrap-break-word">
								{referralLink}
							</p>
						</div>

						<Button
							size="sm"
							variant="outline"
							onClick={() => copyText(referralLink, "link")}>
							{copied === "link" ? (
								<Check className="size-4 ml-1" />
							) : (
								<Copy className="size-4 ml-1" />
							)}
							کپی لینک
						</Button>
					</div>
				</div>
			</CardContent>

			<CardFooter className="bg-muted flex justify-center md:hidden">
				<LogoutDialog collapsed={false} />
			</CardFooter>
		</Card>
	);
}
