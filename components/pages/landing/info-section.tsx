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

import { faqs, socialChannels } from "./landing.data";

const iconMap = {
	telegram: Send,
	bale: MessageCircle,
	instagram: InstagramIcon,
} as const;

export function InfoSection() {
	return (
		<section id="info" className="bg-background">
			<div className="container mx-auto grid gap-8 py-20 lg:grid-cols-2">
				{/* ---------------- FAQ ---------------- */}
				<Card className="border bg-background shadow-none">
					<CardHeader>
						<CardTitle>سوالات متداول</CardTitle>
						<CardDescription>
							پاسخ رایج‌ترین سوالات قبل از خرید یا استفاده از
							سرویس‌ها.
						</CardDescription>
					</CardHeader>

					<CardContent className="pt-2">
						<Accordion
							type="single"
							collapsible
							defaultValue="faq-0"
							className="w-full">
							{faqs.map((faq, index) => (
								<AccordionItem
									key={faq.question}
									value={`faq-${index}`}>
									<AccordionTrigger className="text-right">
										{faq.question}
									</AccordionTrigger>

									<AccordionContent className="text-muted-foreground leading-7">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</Card>

				{/* ------------- COMMUNITY CARD (REDESIGNED SOCIALS) ------------- */}
				<Card className="relative overflow-hidden border bg-linear-to-br from-background to-muted/30">
					<CardHeader>
						<CardTitle>همراه ما باشید</CardTitle>
						<CardDescription>
							آپدیت سرورها، اخبار و اطلاعیه‌ها را سریع‌تر از همه
							دریافت کنید.
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-2">
						{socialChannels.map((channel, index) => {
							const Icon = iconMap[channel.platform];

							return (
								<Link
									key={channel.id}
									href={channel.href as "/"}
									target="_blank"
									rel="noopener noreferrer"
									className="group block">
									<div
										className="
											flex items-center justify-between
											rounded-xl px-3 py-3
											transition-all duration-200
											hover:bg-muted/60
											hover:scale-[1.01]
										">
										{/* Left */}
										<div className="flex items-center gap-3">
											<div
												className="
													flex size-10 items-center justify-center
													rounded-lg text-white shadow-sm
												"
												style={{
													background: channel.bg,
												}}>
												<Icon className="size-4" />
											</div>

											<div>
												<p className="text-sm font-medium">
													{channel.label}
												</p>
											</div>
										</div>

										{/* Right */}
										<div className="flex items-center gap-2">
											<span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
												ورود
											</span>

											<ArrowLeft className="size-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
										</div>
									</div>

									{index !== socialChannels.length - 1 && (
										<Separator className="opacity-40" />
									)}
								</Link>
							);
						})}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
