import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, Download, ExternalLink } from "lucide-react";

import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import {
	badgeMap,
	downloadClients,
	downloadPlatformMap,
} from "@/features/shared/constants";
import { DownloadClient } from "@/features/shared/types";
import { cn } from "@/features/shared/utils";

import { SectionHeader } from "./section-header";

export function DownloadSection({ className }: { className?: string }) {
	return (
		<section id="downloads" className={cn("py-20", className)}>
			<SectionHeader
				eyebrow="دانلود"
				title="کلاینت مناسب دستگاه خود را انتخاب کنید"
				description="برای اتصال به سرویس از یکی از نرم‌افزارهای زیر استفاده کنید."
			/>

			<div className="grid gap-6 lg:grid-cols-2">
				{downloadClients.map((client) => (
					<DownloadCard key={client.id} client={client} />
				))}
			</div>
		</section>
	);
}

function DownloadCard({ client }: { client: DownloadClient }) {
	const directDownload = client.downloads.find(
		(d) => d.platform === "direct",
	);

	const links = client.downloads.filter((d) => d.platform !== "direct");

	return (
		<Card className="group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
			<CardHeader className="space-y-5">
				<div className="flex items-start justify-between">
					<div>
						{client.logo && (
							<Image
								src={client.logo}
								alt={client.title}
								width={56}
								height={56}
								className="size-14 rounded-2xl mb-2"
							/>
						)}

						<CardTitle className="text-xl">
							{client.title}
						</CardTitle>

						<p className="mt-2 text-sm text-muted-foreground leading-7">
							{client.description}
						</p>
					</div>

					{client.badge && (
						<Badge>{badgeMap[client.badge].label}</Badge>
					)}
				</div>

				<div className="flex flex-wrap gap-2">
					{client.platforms.map((platform) => {
						const item = downloadPlatformMap[platform];

						const Icon = item.icon;

						return (
							<Badge
								key={platform}
								variant="secondary"
								className="gap-1 rounded-full">
								<Icon className="size-3.5" />

								{item.label}
							</Badge>
						);
					})}
				</div>
			</CardHeader>

			<CardContent className="space-y-6">
				{directDownload && (
					<Button asChild size="lg" className="w-full">
						<Link href={directDownload.href as "/"}>
							<Download className="size-4" />
							دانلود مستقیم
							<ArrowLeft className="mr-auto size-4" />
						</Link>
					</Button>
				)}

				{links.length > 0 && (
					<div className="rounded-xl border bg-muted/30">
						{links.map((download, index) => {
							const item = downloadPlatformMap[download.platform];

							const Icon = item.icon;

							return (
								<Link
									key={download.platform}
									href={download.href as "/"}
									target="_blank"
									className={`flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted ${
										index !== links.length - 1
											? "border-b"
											: ""
									}`}>
									<div className="flex items-center gap-3">
										<div className="flex size-9 items-center justify-center rounded-lg bg-background">
											<Icon className="size-4" />
										</div>

										<span className="text-sm font-medium">
											{item.label}
										</span>
									</div>

									<ExternalLink className="size-4 text-muted-foreground" />
								</Link>
							);
						})}
					</div>
				)}
			</CardContent>
		</Card>
	);
}
