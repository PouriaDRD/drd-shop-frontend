import Link from "next/link";

import { MessageCircle, Send } from "lucide-react";

import { InstagramIcon } from "@/components/icons";

import { socialChannels } from "./landing.data";

const iconMap = {
	telegram: Send,
	bale: MessageCircle,
	instagram: InstagramIcon,
};

export function SocialChannels() {
	return (
		<section className="border-t bg-background">
			<div className="mx-auto max-w-6xl px-5 py-20">
				<p className="mb-2 text-xs text-muted-foreground">
					همراه ما باشید
				</p>
				<h2 className="mb-10 max-w-md text-2xl font-medium leading-[1.4] tracking-tight text-foreground sm:text-[28px]">
					اخبار، آپدیت سرورها و تخفیف‌ها را اول از همه اینجا ببین
				</h2>

				<div
					className={`grid grid-cols-2 gap-3 sm:grid-cols-${socialChannels.length}`}>
					{socialChannels.map((channel) => {
						const Icon = iconMap[channel.platform];
						return (
							<Link
								key={channel.id}
								href={channel.href as "/"}
								target="_blank"
								rel="noopener noreferrer"
								className={`group flex flex-col gap-4 rounded-xl border p-4
                                bg-card transition-colors hover:border-black/16 sm:p-5`}>
								<span
									className="flex h-9 w-9 items-center justify-center rounded-[10px]"
									style={{ background: channel.bg }}>
									<Icon
										className="h-4.5 w-4.5 text-white"
										strokeWidth={2}
									/>
								</span>
								<div>
									<p className="text-sm font-medium text-foreground">
										{channel.label}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
