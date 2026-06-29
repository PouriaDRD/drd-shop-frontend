"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
	countdown?: number;
}

export default function useCountdown({ countdown = 90 }: Props) {
	const [secondsLeft, setSecondsLeft] = useState(10);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const start = useCallback(() => {
		setSecondsLeft(countdown);
	}, [countdown]);

	useEffect(() => {
		if (secondsLeft <= 0) {
			if (intervalRef.current) clearInterval(intervalRef.current);
			return;
		}
		intervalRef.current = setInterval(() => {
			setSecondsLeft((s) => s - 1);
		}, 1000);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [secondsLeft]);

	const canResend = secondsLeft === 0;

	const formatted = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

	return { formatted, canResend, restart: start };
}
