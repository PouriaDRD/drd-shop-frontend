"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { Check, Copy, ExternalLink, Eye } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	ScrollArea,
	Separator,
	Textarea,
} from "@/components/ui";

import { VpnService } from "../../types";

interface Props {
	service: VpnService;
}

export function VPNServiceDialog({ service }: Props) {
	const [copied, setCopied] = useState<"" | "subscription" | "content">("");

	const copy = async (value: string, type: "subscription" | "content") => {
		await navigator.clipboard.writeText(value);
		setCopied(type);
		setTimeout(() => setCopied(""), 1500);
	};

	const subQRValue = useMemo(() => {
		return service.subscription_link;
	}, [service.subscription_link]);

	const v2rayQRValue = useMemo(() => {
		return service.content;
	}, [service.content]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<Eye className="size-4" />
					مشاهده لینک‌ها
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>اطلاعات سرویس</DialogTitle>
					<DialogDescription>
						Subscription و کانفیگ V2Ray
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="max-h-[70vh]">
					<div className="grid gap-4 p-4">
						{/* QR SECTION */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									V2Ray Config QR Code
								</CardTitle>
								<CardDescription>
									اسکن برای اضافه کردن سریع سرویس
								</CardDescription>
							</CardHeader>

							<CardContent className="flex justify-center">
								<div className="rounded-lg border p-3 bg-white">
									<QRCodeCanvas
										value={v2rayQRValue}
										size={180}
									/>
								</div>
							</CardContent>
						</Card>

						{/* CONFIG */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									V2Ray Config
								</CardTitle>
								<CardDescription>
									لینک کانفیگ مستقیم
								</CardDescription>
							</CardHeader>

							<CardContent className="space-y-3">
								<Textarea
									dir="ltr"
									readOnly
									value={service.content}
									className="min-h-40 font-mono text-xs"
								/>

								<div className="flex justify-end">
									<Button
										variant="outline"
										onClick={() =>
											copy(service.content, "content")
										}>
										{copied === "content" ? (
											<>
												<Check className="size-4" />
												کپی شد
											</>
										) : (
											<>
												<Copy className="size-4" />
												کپی کانفیگ
											</>
										)}
									</Button>
								</div>
							</CardContent>
						</Card>

						<Separator />

						{/* QR SECTION */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									QR Code اشتراک
								</CardTitle>
								<CardDescription>
									اسکن برای اضافه کردن سریع سرویس
								</CardDescription>
							</CardHeader>

							<CardContent className="flex justify-center">
								<div className="rounded-lg border p-3 bg-white">
									<QRCodeCanvas
										value={subQRValue}
										size={180}
									/>
								</div>
							</CardContent>
						</Card>

						{/* SUBSCRIPTION */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">
									لینک اشتراک
								</CardTitle>
								<CardDescription>
									برای اپلیکیشن‌های Sub
								</CardDescription>
							</CardHeader>

							<CardContent className="space-y-2">
								<div className="flex gap-2">
									<Button
										size="icon"
										variant="outline"
										onClick={() =>
											copy(
												service.subscription_link,
												"subscription",
											)
										}>
										{copied === "subscription" ? (
											<Check className="size-4" />
										) : (
											<Copy className="size-4" />
										)}
									</Button>

									<Button
										size="icon"
										variant="outline"
										asChild>
										<Link
											href={
												service.subscription_link as "/"
											}
											target="_blank">
											<ExternalLink className="size-4" />
										</Link>
									</Button>

									<Input
										dir="ltr"
										readOnly
										value={service.subscription_link}
										className="font-mono text-xs"
									/>
								</div>
							</CardContent>
						</Card>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
