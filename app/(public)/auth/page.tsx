"use client";

import { useState } from "react";

import { PageLayout } from "@/components/layouts";
import RequestOtpCard from "@/features/auth/components/request-otp-card";
import VerifyOtpCard from "@/features/auth/components/verify-otp-card";
import { RequestOtpData } from "@/features/auth/types";

function AuthPage() {
	const [otpData, setOtpData] = useState<RequestOtpData | null>(null);

	return (
		<PageLayout className="flex items-center justify-center p-4">
			{!otpData ? (
				<RequestOtpCard onSuccess={setOtpData} />
			) : (
				<VerifyOtpCard
					otpId={otpData.otp_id}
					phoneNumber={otpData.phone_number}
				/>
			)}
		</PageLayout>
	);
}

export default AuthPage;
