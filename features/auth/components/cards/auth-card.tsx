"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import { RequestOtpData } from "../../types";

import RequestOtpCard from "./request-otp-card";
import VerifyOtpCard from "./verify-otp-card";

function AuthCard() {
	const searchParams = useSearchParams();

	const [step, setStep] = useState<"request" | "verify">("request");
	const [otpData, setOtpData] = useState<RequestOtpData | null>(null);

	const handleOnRequestSuccess = (data: RequestOtpData) => {
		setOtpData(data);
		setStep("verify");
	};

	const handleOnEditPhone = () => {
		setOtpData(null);
		setStep("request");
	};

	const handleOnVerifySuccess = () => {
		setOtpData(null);
		setStep("request");
		window.location.href = searchParams.get("next") ?? "/user/profile";
	};

	if (step === "request") {
		return <RequestOtpCard onSuccess={handleOnRequestSuccess} />;
	}
	if (!otpData) return null;

	return (
		<VerifyOtpCard
			otpId={otpData.otp_id}
			phoneNumber={otpData.phone_number}
			onSuccess={handleOnVerifySuccess}
			onEditPhone={handleOnEditPhone}
		/>
	);
}

export default AuthCard;
