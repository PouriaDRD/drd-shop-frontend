"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { Check, Copy, ExternalLink, Eye } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

import {
	Button,
	Card,
	CardContent,
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

/* =========================
   MAIN DIALOG
========================= */
export function V2rayVPNDialog({ service }: Props) {
	const [copied, setCopied] = useState<"" | "subscription" | "content">("");

	const copy = async (value: string, type: "subscription" | "content") => {
		await navigator.clipboard.writeText(value);
		setCopied(type);
		setTimeout(() => setCopied(""), 1500);
	};

	const subQR = useMemo(
		() => service.subscription_link,
		[service.subscription_link],
	);

	const configQR = useMemo(() => service.content, [service.content]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="outline">
					<Eye className="size-4" />
					لینک‌ها
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-3xl">
				<DialogHeader>
					<DialogTitle>اطلاعات سرویس</DialogTitle>
					<DialogDescription>
						Subscription و V2Ray Config
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="max-h-[75vh] pr-2">
					<div className="grid gap-6 p-4">
						<V2raySection
							qr={configQR}
							content={service.content}
							copy={copy}
							copied={copied}
						/>

						<Separator />

						<SubscriptionSection
							service={service}
							qr={subQR}
							copy={copy}
							copied={copied}
						/>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}

/* =========================
   V2RAY CONFIG SECTION
========================= */
function V2raySection({
	qr,
	content,
	copy,
	copied,
}: {
	qr: string;
	content: string;
	copy: (v: string, t: "subscription" | "content") => void;
	copied: string;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">V2Ray Config</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<QRCodeBlock value={qr} />

				<Textarea
					dir="ltr"
					readOnly
					value={content}
					className="min-h-32 text-xs"
				/>

				<div className="flex justify-end">
					<CopyButton
						label="کپی کانفیگ"
						active={copied === "content"}
						onClick={() => copy(content, "content")}
					/>
				</div>
			</CardContent>
		</Card>
	);
}

/* =========================
   SUBSCRIPTION SECTION
========================= */
function SubscriptionSection({
	service,
	qr,
	copy,
	copied,
}: {
	service: VpnService;
	qr: string;
	copy: (v: string, t: "subscription" | "content") => void;
	copied: string;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">Subscription Link</CardTitle>
			</CardHeader>

			<CardContent className="space-y-4">
				<QRCodeBlock value={qr} />

				<div className="flex gap-2">
					{" "}
					<Input
						dir="ltr"
						readOnly
						value={service.subscription_link}
						className="text-xs"
					/>
					<Button
						size="icon"
						variant="outline"
						onClick={() =>
							copy(service.subscription_link, "subscription")
						}>
						{copied === "subscription" ? (
							<Check className="size-4" />
						) : (
							<Copy className="size-4" />
						)}
					</Button>
					<Button size="icon" variant="outline" asChild>
						<Link
							href={service.subscription_link as "/"}
							target="_blank">
							<ExternalLink className="size-4" />
						</Link>
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

/* =========================
   QR BLOCK
========================= */
function QRCodeBlock({ value }: { value: string }) {
	return (
		<div className="flex justify-center">
			<div className="rounded-lg border bg-white p-3">
				<QRCodeCanvas value={value} size={170} />
			</div>
		</div>
	);
}

/* =========================
   COPY BUTTON
========================= */
function CopyButton({
	label,
	active,
	onClick,
}: {
	label: string;
	active: boolean;
	onClick: () => void;
}) {
	return (
		<Button variant="outline" onClick={onClick}>
			{active ? (
				<>
					<Check className="size-4" />
					کپی شد
				</>
			) : (
				label
			)}
		</Button>
	);
}
