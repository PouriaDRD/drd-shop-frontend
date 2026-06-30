"use client";

import Link from "next/link";

import { MessageCircle, Send } from "lucide-react";

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
} from "@/components/ui";

import { faqs, socialChannels } from "./landing.data";

const iconMap = {
	telegram: Send,
	bale: MessageCircle,
	instagram: InstagramIcon,
} as const;

export function InfoSection() {
	return (
		<section id="info" className="border-t bg-background">
			<div className="container mx-auto grid gap-8 py-20 lg:grid-cols-2">
				{/* FAQ */}
				<Card className="border-border/60 shadow-none">
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

									<AccordionContent className="leading-7 text-muted-foreground">
										{faq.answer}
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
				</Card>

				{/* Socials */}
				<Card className="border-border/60 shadow-none">
					<CardHeader>
						<CardTitle>همراه ما باشید</CardTitle>

						<CardDescription>
							اخبار، اطلاعیه‌ها، تخفیف‌ها و آپدیت سرورها را زودتر
							از همه دریافت کنید.
						</CardDescription>
					</CardHeader>

					<CardContent>
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
							{socialChannels.map((channel) => {
								const Icon = iconMap[channel.platform];

								return (
									<Link
										key={channel.id}
										href={channel.href as "/"}
										target="_blank"
										rel="noopener noreferrer">
										<Card className="h-full border-border/60 transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
											<CardContent className="flex flex-col items-center justify-center gap-4 p-6 text-center">
												<div
													className="flex size-12 items-center justify-center rounded-2xl"
													style={{
														background: channel.bg,
													}}>
													<Icon className="size-5 text-white" />
												</div>

												<div>
													<p className="font-medium">
														{channel.label}
													</p>

													<p className="mt-1 text-xs text-muted-foreground">
														عضویت
													</p>
												</div>
											</CardContent>
										</Card>
									</Link>
								);
							})}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
