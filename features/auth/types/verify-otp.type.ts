import { z } from "zod";

import { verifyOtpSchema } from "../schemas";

import { Tokens } from "./token.type";

export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>;

export type VerifyOtpData = {
	tokens: Tokens;
	is_new: boolean;
};

export type VerifyOtpResponse = VerifyOtpData;
