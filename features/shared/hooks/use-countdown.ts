"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const RESEND_SECONDS = 90; // 01:30 minutes

export default function useCountdown() {
	const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const start = useCallback(() => {
		setSecondsLeft(RESEND_SECONDS);
	}, []);

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
