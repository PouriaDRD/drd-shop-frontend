import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

import { Theme } from "../types";

export const THEMES: Theme[] = [
	{
		value: "light",
		label: "روشن",
		icon: SunIcon,
	},
	{
		value: "dark",
		label: "تاریک",
		icon: MoonIcon,
	},
	{
		value: "system",
		label: "سیستم",
		icon: LaptopIcon,
	},
];
