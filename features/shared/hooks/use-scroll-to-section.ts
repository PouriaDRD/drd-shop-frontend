"use client";

import { useEffect } from "react";

export function useScrollToSection() {
	useEffect(() => {
		const targetId = sessionStorage.getItem("scroll_to");
		if (!targetId) return;

		const scroll = () => {
			const el = document.getElementById(targetId);

			if (!el) return false;

			el.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});

			sessionStorage.removeItem("scroll_to");
			return true;
		};

		if (scroll()) return;

		let attempts = 0;

		const tryScroll = () => {
			attempts++;

			if (scroll() || attempts > 50) return;

			requestAnimationFrame(tryScroll);
		};

		requestAnimationFrame(tryScroll);
	}, []);
}
