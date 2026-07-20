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
		<section id="downloads" className={cn("py-16 md:py-24", className)}>
			<SectionHeader
				eyebrow="دانلود"
				title="کلاینت مناسب دستگاه خود را انتخاب کنید"
				description="برای اتصال به سرویس از یکی از نرم‌افزارهای زیر استفاده کنید."
			/>

			<div className="grid gap-5 lg:grid-cols-2">
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
		<Card className="overflow-hidden rounded-2xl border shadow-none transition-colors hover:border-primary/30">
			<CardHeader className="space-y-5">
				<div className="flex items-start justify-between">
					<div>
						{client.logo && (
							<Image
								src={client.logo}
								alt={client.title}
								width={48}
								height={48}
								className="mb-3 size-12 rounded-xl"
							/>
						)}

						<CardTitle className="text-lg font-medium">
							{client.title}
						</CardTitle>

						<p
							suppressHydrationWarning
							className="mt-1.5 text-sm leading-7 text-muted-foreground">
							{client.description}
						</p>
					</div>

					{client.badge && (
						<Badge variant="secondary" className="rounded-full">
							{badgeMap[client.badge].label}
						</Badge>
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
								className="gap-1 rounded-full bg-muted/60 font-normal">
								<Icon className="size-3.5" />
								{item.label}
							</Badge>
						);
					})}
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{directDownload && (
					<Button asChild size="lg" className="w-full rounded-xl">
						<Link href={directDownload.href as "/"}>
							<Download className="size-4" />
							دانلود مستقیم
							<ArrowLeft className="mr-auto size-4" />
						</Link>
					</Button>
				)}

				{links.length > 0 && (
					<div className="divide-y overflow-hidden rounded-xl border">
						{links.map((download) => {
							const item = downloadPlatformMap[download.platform];
							const Icon = item.icon;

							return (
								<Link
									key={download.platform}
									href={download.href as "/"}
									target="_blank"
									className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-muted/50">
									<div className="flex items-center gap-3">
										<div className="flex size-8 items-center justify-center rounded-lg bg-muted">
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
