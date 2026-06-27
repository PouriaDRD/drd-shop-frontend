import { RefreshCw } from "lucide-react";

import useCountdown from "../hooks/use-countdown";
import { cn } from "../utils";

interface Props {
	onResend: () => void;
}

function Countdown({ onResend }: Props) {
	const { formatted, canResend, restart } = useCountdown();

	const handleResend = () => {
		if (!canResend) return;
		restart();
		onResend();
	};

	return (
		<div className="flex w-full items-center justify-between">
			{/* countdown badge */}
			<div
				className={cn(
					"flex items-center gap-2r px-3 py-1.5 transition-opacity gap-2",
				)}>
				{!canResend && (
					<span className="size-1.5 rounded-full bg-primary animate-pulse" />
				)}
				<span
					className={cn(
						"font-mono text-sm font-semibold tabular-nums",
						canResend ? "text-muted-foreground" : "",
					)}>
					{formatted}
				</span>
			</div>

			{/* Resend*/}
			<button
				type="button"
				onClick={handleResend}
				disabled={!canResend}
				className={cn(
					"flex items-center gap-1.5 text-sm transition-colors px-1",
					canResend ? "" : "text-muted-foreground cursor-not-allowed",
				)}>
				<RefreshCw className="size-3.5" />
				ارسال مجدد
			</button>
		</div>
	);
}

export default Countdown;
