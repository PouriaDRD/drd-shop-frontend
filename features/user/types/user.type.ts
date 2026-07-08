import { Wallet } from "@/features/finance/types";

export type UserRole = "superuser" | "admin" | "user";

export type UserStatus = "active" | "inactive" | "banned";

export type User = {
	id: number;
	email: string;
	email_verified: boolean;
	role: UserRole;
	status: UserStatus;
	last_login: Date;
	created_at: Date;
	referral_code: string;
	total_referrals: number;
	wallet: Wallet;
};
