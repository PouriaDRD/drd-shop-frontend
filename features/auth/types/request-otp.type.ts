import { z } from "zod";

import { requestOtpSchema } from "../schemas";

export type RequestOtpFormValues = z.infer<typeof requestOtpSchema>;

export type RequestOtpData = RequestOtpFormValues & {
	otp_id: string;
};

export type RequestOtpResponse = RequestOtpData;
