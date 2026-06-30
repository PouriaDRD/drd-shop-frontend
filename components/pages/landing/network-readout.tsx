"use client";

import { useEffect, useState } from "react";

import { liveServers } from "./landing.data";

// The signature visual of the site: a live-feeling monospace readout
// that reinforces "this is real infrastructure," not stock marketing copy.
export function NetworkReadout({ compact = false }: { compact?: boolean }) {
	const [pings, setPings] = useState(liveServers.map((s) => s.ping));
	const [tick, setTick] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setPings((prev) =>
				prev.map((p, i) => {
					const base = liveServers[i].ping;
					const jitter = Math.round((Math.random() + 1) * 6);
					return Math.max(8, base + jitter);
				}),
			);
			setTick((t) => t + 1);
		}, 2200);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			dir="ltr"
			className={`rounded-xl border bg-zinc-800 dark:bg-zinc-900 font-mono ${
				compact
					? "px-4 py-3 text-[11px]"
					: "px-5 py-4 text-xs sm:text-[13px]"
			}`}>
			<div className="mb-2 flex items-center justify-between text-muted-foreground">
				<div className="flex items-center gap-2">
					<span className="relative flex h-2 w-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-green-600" />
					</span>
					<span className="text-green-400">live network status</span>
				</div>
				<span suppressHydrationWarning>
					uptime 99.98% · sync #{tick}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				{liveServers.map((server, i) => (
					<div
						key={server.id}
						className="flex items-center justify-between gap-3">
						<span className="text-green-400">
							{server.id}{" "}
							<span className="text-muted-foreground">
								/ {server.city}
							</span>
						</span>
						<span className="flex items-center gap-3 tabular-nums">
							<span className="text-muted-foreground">
								load {server.load}%
							</span>
							<span className="text-green-500">{pings[i]}ms</span>
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
