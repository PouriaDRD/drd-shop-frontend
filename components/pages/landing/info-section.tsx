"use client";

import Link from "next/link";

import { ArrowLeft, MessageCircle, Send } from "lucide-react";

import { InstagramIcon } from "@/components/icons";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Separator,
} from "@/components/ui";
import { FAQS, SOCIAL_CHANNELS } from "@/features/shared/constants";
import { SocialChannel } from "@/features/shared/types";

export function InfoSection() {
	return (
		<section id="info" className="py-28">
			<div className="grid gap-6 lg:grid-cols-2">
				{/* FAQ */}

				<div className="rounded-3xl border p-6 sm:p-8">
					<div className="mb-8">
						<p className="text-sm text-muted-foreground">FAQ</p>

						<h2 className="mt-2 text-2xl font-bold">
							سوالات متداول
						</h2>

						<p className="mt-3 text-sm leading-7 text-muted-foreground">
							پاسخ سوال‌هایی که قبل از خرید ممکن است داشته باشید.
						</p>
					</div>

					<Accordion type="single" collapsible defaultValue="faq-0">
						{FAQS.map((faq, index) => (
							<AccordionItem
								key={faq.question}
								value={`faq-${index}`}>
								<AccordionTrigger
									className="
										text-right
										text-sm
										">
									{faq.question}
								</AccordionTrigger>

								<AccordionContent
									className="
										leading-7
										text-muted-foreground
										">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				{/* Social */}

				<div className="rounded-3xl border p-6 sm:p-8">
					<div className="mb-8">
						<p className="text-sm text-muted-foreground">
							Community
						</p>

						<h2 className="mt-2 text-2xl ont-bold">
							همراه ما باشید
						</h2>

						<p className="mt-3 text-sm leading-7 text-muted-foreground">
							آخرین اخبار، وضعیت سرورها و بروزرسانی‌ها.
						</p>
					</div>

					<div className="space-y-2">
						{SOCIAL_CHANNELS.map((channel, index) => (
							<SocialRow
								key={channel.id}
								channel={channel}
								last={index === SOCIAL_CHANNELS.length - 1}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function SocialRow({
	channel,

	last,
}: {
	channel: SocialChannel;

	last: boolean;
}) {
	const icons = {
		telegram: Send,

		bale: MessageCircle,

		instagram: InstagramIcon,
	} as const;

	const Icon = icons[channel.platform];

	return (
		<>
			<Link
				href={channel.href as "/"}
				target="_blank"
				rel="noopener noreferrer"
				className="group block">
				<div className="flex items-center justify-between rounded-2xl p-3 transition-colors hover:bg-muted/60">
					<div className="flex items-center gap-4">
						<div
							className="flex size-11 items-center justify-center rounded-xl text-white"
							style={{
								background: channel.bg,
							}}>
							<Icon className="size-5" />
						</div>

						<div>
							<p className="text-sm font-medium">
								{channel.label}
							</p>

							<p className="mt-1 text-xs text-muted-foreground">
								مشاهده کانال
							</p>
						</div>
					</div>

					<ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
				</div>
			</Link>

			{!last && <Separator className="my-2 opacity-40" />}
		</>
	);
}
