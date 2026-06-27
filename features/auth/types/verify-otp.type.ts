import { z } from "zod";

import { verifyOtpSchema } from "../schemas";

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export type Tokens = {
	access: string;
	refresh: string;
	access_expires_at: Date;
	refresh_expires_at: Date;
};

export type VerifyOtpData = {
	tokens: Tokens;
	is_new: boolean;
};

export type VerifyOtpResponse = VerifyOtpData;
