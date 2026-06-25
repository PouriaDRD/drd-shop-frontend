import { ThemeSwitcher } from "@/features/preferences/components";

function LandingPage() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 mx-auto bg-card max-w-xs w-full">
			<h1>LandingPage</h1>
			<p>021</p>
			<ThemeSwitcher />
		</div>
	);
}

export default LandingPage;
