"use client";

import { PageLayout } from "@/components/layouts";
import { OtpCard } from "@/features/auth/components/cards";

function OtpPage() {
	return (
		<PageLayout className="flex items-center justify-center p-4">
			<OtpCard otpType="login" />
		</PageLayout>
	);
}

export default OtpPage;
