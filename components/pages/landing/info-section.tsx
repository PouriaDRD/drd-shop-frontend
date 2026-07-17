"use client";

import Link from "next/link";

import { ArrowLeft, MessageCircle, Send } from "lucide-react";

import { InstagramIcon } from "@/components/icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Separator,
} from "@/components/ui";
import { FAQS, SOCIAL_CHANNELS } from "@/features/shared/constants";
import { SocialChannel } from "@/features/shared/types";

export function InfoSection() {
	return (
		<section id="info" className="py-16 md:py-20">
			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="shadow-none">
					<CardHeader>
						<CardTitle>سوالات متداول</CardTitle>
						<CardDescription>
							پاسخ رایج‌ترین سوالات قبل از خرید یا استفاده از
							سرویس‌ها.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<Accordion
							type="single"
							collapsible
							defaultValue="faq-0">
							{FAQS.map((faq, index) => (
								<AccordionItem
									key={faq.question}
									value={`faq-${index}`}>
									<AccordionTrigger className="text-right">
										{faq.question}
									</AccordionTrigger>
									<AccordionContent className="leading-7 text-muted-foreground">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</Card>

				<Card className="shadow-none">
					<CardHeader>
						<CardTitle>همراه ما باشید</CardTitle>
						<CardDescription>
							آپدیت سرورها، اخبار و اطلاعیه‌ها را سریع‌تر از همه
							دریافت کنید.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-1">
						{SOCIAL_CHANNELS.map((channel, index) => (
							<SocialRow
								channel={channel}
								isLast={index === SOCIAL_CHANNELS.length - 1}
								key={channel.id}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

function SocialRow({
	channel,
	isLast,
}: {
	channel: SocialChannel;
	isLast: boolean;
}) {
	const iconMap = {
		telegram: Send,
		bale: MessageCircle,
		instagram: InstagramIcon,
	} as const;

	const Icon = iconMap[channel.platform];

	return (
		<Link
			href={channel.href as "/"}
			target="_blank"
			rel="noopener noreferrer"
			className="group block">
			<div className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-muted/60">
				<div className="flex items-center gap-3">
					<div
						className="flex size-10 items-center justify-center rounded-lg text-white"
						style={{ background: channel.bg }}>
						<Icon className="size-4" />
					</div>
					<p className="text-sm font-medium">{channel.label}</p>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
						ورود
					</span>
					<ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
				</div>
			</div>

			{!isLast && <Separator className="opacity-40" />}
		</Link>
	);
}
