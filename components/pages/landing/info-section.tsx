"use client";

import { useState } from "react";

import Link from "next/link";

import { ChevronDown, MessageCircle, Send } from "lucide-react";

import { InstagramIcon } from "@/components/icons";

import { faqs, socialChannels } from "./landing.data";

const iconMap = {
	telegram: Send,
	bale: MessageCircle,
	instagram: InstagramIcon,
};

export function InfoSection() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section id="info" className="border-t bg-background">
			<div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-20 lg:grid-cols-2">
				{/* ================= FAQ ================= */}
				<div>
					<p className="mb-2 text-xs text-muted-foreground">
						سوالات متداول
					</p>

					<h2 className="mb-8 text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
						قبل از شروع، اینها را بدان
					</h2>

					<div className="flex flex-col">
						{faqs.map((faq, index) => {
							const isOpen = openIndex === index;

							return (
								<div key={faq.question} className="border-b">
									<button
										onClick={() =>
											setOpenIndex(isOpen ? null : index)
										}
										className="flex w-full items-center justify-between gap-4 py-5 text-right"
										aria-expanded={isOpen}>
										<span className="text-[15px] font-medium text-foreground">
											{faq.question}
										</span>

										<ChevronDown
											className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${
												isOpen ? "rotate-180" : ""
											}`}
										/>
									</button>

									{isOpen && (
										<p className="pb-5 text-sm leading-7 text-muted-foreground">
											{faq.answer}
										</p>
									)}
								</div>
							);
						})}
					</div>
				</div>

				{/* ================= SOCIAL ================= */}
				<div>
					<p className="mb-2 text-xs text-muted-foreground">
						همراه ما باشید
					</p>

					<h2 className="mb-8 text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
						اخبار و آپدیت‌ها را زودتر از همه ببین
					</h2>

					<div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
						{socialChannels.map((channel) => {
							const Icon = iconMap[channel.platform];

							return (
								<Link
									key={channel.id}
									href={channel.href as "/"}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex flex-col gap-4 rounded-xl border bg-card p-4 transition-colors hover:border-foreground/10 sm:p-5">
									<span
										className="flex h-9 w-9 items-center justify-center rounded-[10px]"
										style={{ background: channel.bg }}>
										<Icon
											className="h-4.5 w-4.5 text-white"
											strokeWidth={2}
										/>
									</span>

									<p className="text-sm font-medium text-foreground">
										{channel.label}
									</p>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
