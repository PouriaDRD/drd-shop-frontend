"use client";

import { PageLayout } from "@/components/layouts";
import { RegisterCard } from "@/features/auth/components/cards";

function RegisterPage() {
	return (
		<PageLayout className="flex items-center justify-center">
			<RegisterCard />
		</PageLayout>
	);
}

export default RegisterPage;
