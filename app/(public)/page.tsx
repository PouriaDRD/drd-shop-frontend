import Link from "next/link";

import { PageLayout } from "@/components/layouts";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { ThemeSwitcher } from "@/features/preferences/components";

function LandingPage() {
	return (
		<PageLayout className="p-4">
			<Card className="mx-auto max-w-xs w-full">
				<CardHeader className="flex flex-col items-center">
					<CardTitle>صفحه اصلی</CardTitle>
					<CardDescription>024 تست</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col items-center gap-2">
					<ThemeSwitcher />
					<Link href={"/auth"}>
						<Button>ورود</Button>
					</Link>
				</CardContent>
			</Card>
		</PageLayout>
	);
}

export default LandingPage;
