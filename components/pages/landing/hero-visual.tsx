"use client";

import { useMemo } from "react";

import { motion } from "framer-motion";
import { Globe, Server, Smartphone, Wifi } from "lucide-react";

import { AppIcon } from "@/components/icons";

interface Props {
	particlesNum?: number;
}

export function HeroVisual({ particlesNum = 20 }: Props) {
	const particles = useMemo(
		() =>
			Array.from({ length: particlesNum }).map((_, index) => ({
				id: index,
				left: 8 + ((index * 37) % 84),
				top: 8 + ((index * 53) % 84),
				size: index % 4 === 0 ? "size-1.5" : "size-1",
				duration: 4 + (index % 5),
				delay: index * 0.12,
				direction: index % 2 === 0 ? 12 : -12,
			})),
		[particlesNum],
	);

	const mainPath =
		"M120 130 C170 70 230 70 280 130 C300 200 250 260 200 290 C140 260 90 200 120 130";

	return (
		<div className="relative mx-auto aspect-square w-full max-w-lg lg:max-w-none h-112.5 md:h-fit">
			<div className="relative h-full w-full overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl shadow-black/10 dark:shadow-black/40">
				{/* Grid */}
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.08]" />

				{/* Center ambient */}
				<div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

				{/* Particles */}
				{particles.map((particle) => (
					<motion.span
						key={particle.id}
						className={`${particle.size} absolute rounded-full bg-primary/70`}
						style={{
							left: `${particle.left}%`,
							top: `${particle.top}%`,
						}}
						animate={{
							x: [0, particle.direction, 0],
							y: [0, -30, 0],
							scale: [1, 1.5, 1],
							opacity: [0.25, 1, 0.25],
						}}
						transition={{
							duration: particle.duration,
							delay: particle.delay,
							repeat: Infinity,
							ease: "easeInOut",
						}}
					/>
				))}

				{/* Status */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs backdrop-blur">
					<motion.span
						animate={{
							scale: [1, 1.5, 1],
						}}
						transition={{
							duration: 2,
							repeat: Infinity,
						}}
						className="size-2 rounded-full bg-primary"
					/>

					<span className="font-medium">Network Active</span>
				</motion.div>

				{/* Latency */}
				<motion.div
					initial={{ opacity: 0, x: 10 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						delay: 0.2,
					}}
					className="absolute right-5 top-5 rounded-xl border border-border bg-background/80 px-3 py-2 text-xs text-left backdrop-blur">
					<div className="flex items-center gap-2">
						<Wifi className="size-4 text-primary" />

						<span className="font-semibold font-mono!">68ms</span>
					</div>

					<div className="text-muted-foreground">Latency</div>
				</motion.div>

				{/* Network paths */}
				<svg
					viewBox="0 0 400 400"
					className="absolute inset-0 size-full text-primary/40">
					<motion.path
						d="M120 130 C170 70 230 70 280 130"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeDasharray="8 14"
						animate={{
							strokeDashoffset: [0, -150],
						}}
						transition={{
							duration: 7,
							repeat: Infinity,
							ease: "linear",
						}}
					/>

					<motion.path
						d="M280 130 C300 200 250 260 200 290"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeDasharray="8 14"
						animate={{
							strokeDashoffset: [0, -150],
						}}
						transition={{
							duration: 7,
							repeat: Infinity,
							ease: "linear",
							delay: 0.5,
						}}
					/>

					<motion.path
						d="M200 290 C140 260 90 200 120 130"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeDasharray="8 14"
						animate={{
							strokeDashoffset: [0, -150],
						}}
						transition={{
							duration: 7,
							repeat: Infinity,
							ease: "linear",
							delay: 1,
						}}
					/>

					{/* Packet glow */}
					<circle r="10" fill="#4468c7" opacity="0.12">
						<animateMotion
							dur="6s"
							repeatCount="indefinite"
							path={mainPath}
						/>
					</circle>

					{/* Packet */}
					<circle r="4" fill="#476fd8">
						<animateMotion
							dur="6s"
							repeatCount="indefinite"
							path={mainPath}
						/>
					</circle>
				</svg>

				{/* Center Globe */}
				<motion.div
					animate={{
						y: [0, -10, 0],
					}}
					transition={{
						duration: 5,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					className="absolute left-1/2 top-1/2 z-10 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-xl">
					<AppIcon className="size-8 text-primary" />
				</motion.div>

				<VisualNode
					icon={Smartphone}
					label="Client"
					position="left-[30%] top-[32%]"
				/>

				<VisualNode
					icon={Server}
					label="VPN Server"
					position="left-[70%] top-[32%]"
					delay={1}
				/>

				<VisualNode
					icon={Globe}
					label="Internet"
					position="left-[50%] top-[78%]"
					delay={3.2}
				/>
			</div>
		</div>
	);
}

function VisualNode({
	icon: Icon,
	label,
	position,
	delay = 0,
}: {
	icon: typeof Globe;
	label: string;
	position: string;
	delay?: number;
}) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				scale: 0.85,
			}}
			animate={{
				opacity: 1,
				scale: 1,
				y: [0, -12, 0],
			}}
			transition={{
				delay,
				duration: 0.6,
				y: {
					duration: 5,
					repeat: Infinity,
					ease: "easeInOut",
				},
			}}
			className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${position}`}>
			<div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-lg">
				<Icon className="size-7 text-primary" />
			</div>

			<span className="mt-2 whitespace-nowrap text-center text-xs font-medium text-foreground/80">
				{label}
			</span>
		</motion.div>
	);
}
