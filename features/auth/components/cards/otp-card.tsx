"use client";

import { useOtpStore } from "../../stores";
import { OtpType } from "../../types";

import RequestOtpCard from "./request-otp-card";
import VerifyOtpCard from "./verify-otp-card";

interface Props {
	otpType: OtpType;
}

export default function OtpCard({ otpType }: Props) {
	const step = useOtpStore((s) => s.step);

	if (step === "request-otp") return <RequestOtpCard otpType={otpType} />;
	return <VerifyOtpCard otpType={otpType} />;
}
