"use client";

import { useEffect, useMemo, useState } from "react";

import { Activity, Clock3, Server, ShieldCheck, Zap } from "lucide-react";

import { Badge, Card, CardContent } from "@/components/ui";
import { SERVERS } from "@/features/shared/constants";

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type ServerState = {
	ping: number;
	load: number;
};

/* -------------------------------------------------------------------------- */
/*                                   Utils                                    */
/* -------------------------------------------------------------------------- */

const clamp = (value: number, min: number, max: number) =>
	Math.min(max, Math.max(min, value));

const getPingColor = (ping: number) => {
	if (ping < 80) return "text-emerald-500";
	if (ping < 120) return "text-yellow-500";
	return "text-red-500";
};

/* -------------------------------------------------------------------------- */
/*                              Network Readout                               */
/* -------------------------------------------------------------------------- */

export function NetworkReadout({ compact = false }: { compact?: boolean }) {
	const [servers, setServers] = useState<ServerState[]>(
		SERVERS.map((server) => ({
			ping: server.ping,
			load: server.load,
		})),
	);

	const [lastSync, setLastSync] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setServers((current) =>
				current.map((server, index) => {
					const base = SERVERS[index];

					return {
						ping: clamp(
							server.ping + Math.floor(Math.random() * 9) - 4,
							base.ping - 6,
							base.ping + 8,
						),

						load: clamp(
							server.load + Math.floor(Math.random() * 7) - 3,
							10,
							95,
						),
					};
				}),
			);

			setLastSync(new Date());
		}, 1800);

		return () => clearInterval(interval);
	}, []);

	const averagePing = useMemo(() => {
		return Math.round(
			servers.reduce((sum, s) => sum + s.ping, 0) / servers.length,
		);
	}, [servers]);

	const health =
		averagePing < 35 ? "عالی" : averagePing < 80 ? "خوب" : "متوسط";

	return (
		<Card className="overflow-hidden w-full">
			<CardContent
				className={compact ? "space-y-4 p-5" : "space-y-6 p-6"}>
				<NetworkHeader lastSync={lastSync} />

				<NetworkSummary
					averagePing={averagePing}
					health={health}
					serverCount={SERVERS.length}
				/>

				<NetworkServerList servers={servers} />
			</CardContent>
		</Card>
	);
}

/* -------------------------------------------------------------------------- */
/*                              Network Header                                */
/* -------------------------------------------------------------------------- */

interface NetworkHeaderProps {
	lastSync: Date;
}

function NetworkHeader({ lastSync }: NetworkHeaderProps) {
	return (
		<div className="flex items-start justify-between">
			<div>
				<div className="flex items-center gap-2">
					<div className="relative">
						<div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />

						<div className="relative size-2.5 rounded-full bg-emerald-500" />
					</div>

					<span suppressHydrationWarning className="font-semibold">
						وضعیت شبکه
					</span>

					<Badge variant="secondary">فعال</Badge>
				</div>

				<p className="mt-2 text-sm text-muted-foreground">
					پایش لحظه‌ای زیرساخت شبکه
				</p>
			</div>

			<div className="text-right text-xs text-muted-foreground">
				<div
					suppressHydrationWarning
					className="flex items-center justify-end gap-1">
					<Clock3 className="size-3.5" />

					{lastSync.toLocaleTimeString("fa-IR")}
				</div>

				<div className="mt-1">
					پایداری{" "}
					<span className="font-medium text-foreground">99.98%</span>
				</div>
			</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*                              Network Summary                               */
/* -------------------------------------------------------------------------- */

interface NetworkSummaryProps {
	averagePing: number;
	health: string;
	serverCount: number;
}

function NetworkSummary({
	averagePing,
	health,
	serverCount,
}: NetworkSummaryProps) {
	return (
		<div className="grid grid-cols-3 gap-3">
			<SummaryCard icon={Zap} label="تأخیر" value={`${averagePing} ms`} />

			<SummaryCard icon={Activity} label="سلامت" value={health} />

			<SummaryCard
				icon={ShieldCheck}
				label="سرورها"
				value={serverCount}
			/>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*                               Summary Card                                 */
/* -------------------------------------------------------------------------- */

interface SummaryCardProps {
	icon: React.ElementType;
	label: string;
	value: React.ReactNode;
}

function SummaryCard({ icon: Icon, label, value }: SummaryCardProps) {
	return (
		<div className="rounded-lg border p-3">
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Icon className="size-4" />
				{label}
			</div>

			<div className="mt-2 text-xl font-semibold">{value}</div>
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*                             Network Server List                            */
/* -------------------------------------------------------------------------- */

interface NetworkServerListProps {
	servers: ServerState[];
}

function NetworkServerList({ servers }: NetworkServerListProps) {
	return (
		<div className="space-y-2">
			{SERVERS.map((server, index) => (
				<NetworkServerItem
					key={server.id}
					server={server}
					state={servers[index]}
				/>
			))}
		</div>
	);
}

/* -------------------------------------------------------------------------- */
/*                             Network Server Item                            */
/* -------------------------------------------------------------------------- */

interface NetworkServerItemProps {
	server: (typeof SERVERS)[number];
	state: ServerState;
}

function NetworkServerItem({ server, state }: NetworkServerItemProps) {
	return (
		<div
			className={`flex items-center justify-between rounded-lg border p-3
			transition-colors hover:bg-muted/50`}>
			<div className="flex items-center gap-3">
				<div className="rounded-md bg-muted p-2">
					<Server className="size-4" />
				</div>

				<div>
					<div className="font-medium">{server.id}</div>

					<div className="text-xs text-muted-foreground">
						{server.country} - {server.city}
					</div>
				</div>
			</div>

			<div className="flex items-center gap-8 text-sm tabular-nums">
				<div className="text-right">
					<div className="text-muted-foreground">بار</div>

					<div className="font-medium">{state.load}%</div>
				</div>

				<div className="text-right">
					<div className="text-muted-foreground">پینگ</div>

					<div
						className={`font-semibold ${getPingColor(state.ping)}`}>
						{state.ping} ms
					</div>
				</div>
			</div>
		</div>
	);
}
