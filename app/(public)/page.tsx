import { Fragment } from "react";

import { Footer, Header } from "@/components/layouts";
import {
	// CTA,
	DownloadSection,
	Features,
	Hero,
	InfoSection,
	ServerStatus,
} from "@/components/pages/landing";
import { AnnouncementsAlert } from "@/features/notifications/components/alerts";
import { Products } from "@/features/shop/components";

export default function LandingPage() {
	return (
		<Fragment>
			<Header />

			<div className="mx-auto max-w-7xl px-4 pt-6">
				<AnnouncementsAlert />
			</div>

			<main className="mx-auto max-w-7xl px-4 relative">
				{/* <div className="hidden md:block absolute -top-40 -right-40 h-150 w-150 rounded-full bg-primary/8 blur-3xl dark:bg-primary/15" /> */}

				<Hero />

				<ServerStatus />

				<Features />

				<Products />

				<DownloadSection />

				{/* <CTA /> */}

				<InfoSection />
			</main>

			<Footer />
		</Fragment>
	);
}
