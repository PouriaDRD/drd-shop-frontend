"use client";

import { useState } from "react";

import { ChevronDown } from "lucide-react";

import { faqs } from "./landing.data";

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section id="faq" className="border-t bg-background">
			<div className="mx-auto max-w-3xl px-5 py-20">
				<p className="mb-2 text-xs text-muted-foreground">
					سوالات متداول
				</p>
				<h2 className="mb-10 text-2xl font-medium tracking-tight text-foreground sm:text-[28px]">
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
		</section>
	);
}
