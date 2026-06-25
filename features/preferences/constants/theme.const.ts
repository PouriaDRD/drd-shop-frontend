import { Theme } from "../types";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";

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
