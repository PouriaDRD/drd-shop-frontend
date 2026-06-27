"use client";

import { PageLayout } from "@/components/layouts";
import { AuthCard } from "@/features/auth/components/cards";

function AuthPage() {
	return (
		<PageLayout className="flex items-center justify-center p-4">
			<AuthCard />
		</PageLayout>
	);
}

export default AuthPage;
