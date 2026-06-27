"use client";

import Link from "next/link";

import { toast } from "sonner";

import { PageLayout } from "@/components/layouts";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { ThemeSwitcher } from "@/features/preferences/components";

function LandingPage() {
	return (
		<PageLayout className="flex items-center justify-center p-4">
			<Card className="mx-auto max-w-full sm:max-w-xs w-full">
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
				<CardFooter className="grid grid-cols-3 gap-4">
					<Button
						variant="outline"
						onClick={() => toast("Event has been created")}>
						Default
					</Button>
					<Button
						variant="outline"
						onClick={() => toast.success("Event has been created")}>
						Success
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.info(
								"Be at the area 10 minutes before the event time",
							)
						}>
						Info
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.warning(
								"Event start time cannot be earlier than 8am",
							)
						}>
						Warning
					</Button>
					<Button
						variant="outline"
						onClick={() =>
							toast.error("Event has not been created")
						}>
						Error
					</Button>
					<Button
						variant="outline"
						onClick={() => {
							toast.promise<{ name: string }>(
								() =>
									new Promise((resolve) =>
										setTimeout(
											() => resolve({ name: "Event" }),
											2000,
										),
									),
								{
									loading: "Loading...",
									success: (data) =>
										`${data.name} has been created`,
									error: "Error",
								},
							);
						}}>
						Promise
					</Button>
				</CardFooter>
			</Card>
		</PageLayout>
	);
}

export default LandingPage;
