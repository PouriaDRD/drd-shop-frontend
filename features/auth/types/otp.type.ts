import { z } from "zod";

import { requestOtpSchema, verifyOtpSchema } from "../schemas";

import { Tokens } from "./token.type";

export type OtpStep = "request-otp" | "verify-otp";
export const OTP_TYPES = [
	"login",
	"register",
	"verify_email",
	"reset_password",
] as const;

export type OtpType = (typeof OTP_TYPES)[number];

// ─── Request OTP ────────────────────────────────────────────────────────────
export type RequestOtpFormValues = z.infer<typeof requestOtpSchema>;

export type RequestOtpData = {
	email: string;
	expires_in: number;
};

export type RequestOtpResponse = RequestOtpData;

// ─── Verify OTP ─────────────────────────────────────────────────────────────
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export type VerifyOtpData = Tokens & {
	user: string;
};

export type VerifyOtpResponse = VerifyOtpData;

// ─── Store ──────────────────────────────────────────────────────────────────
export interface OtpStoreState {
	email: string;
	expires_in: number;
	step: OtpStep;
	_hasHydrated: boolean;

	setEmail: (email: string) => void;
	setStep: (step: OtpStep) => void;
	setExpiresIn: (expires_in: number) => void;

	set: (patch: Partial<OtpStoreState>) => void;

	setHasHydrated: (state: boolean) => void;
	reset: () => void;
}
