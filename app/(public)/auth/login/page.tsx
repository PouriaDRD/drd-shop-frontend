"use client";

import { PageLayout } from "@/components/layouts";
import { LoginCard } from "@/features/auth/components/cards";

function LoginPage() {
	return (
		<PageLayout className="flex items-center justify-center">
			<LoginCard />
		</PageLayout>
	);
}

export default LoginPage;
