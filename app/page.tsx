import { Fragment } from "react";

import { Footer, Header } from "@/components/layouts";
import {
	CTA,
	DownloadSection,
	Features,
	Hero,
	InfoSection,
} from "@/components/pages/landing";
import { AnnouncementsAlert } from "@/features/notifications/components/alerts";
import { Products } from "@/features/shop/components";

export default function LandingPage() {
	return (
		<Fragment>
			<Header />
			<div className="mx-auto max-w-7xl pt-12">
				<AnnouncementsAlert />
			</div>
			<main className="mx-auto flex max-w-7xl flex-col divide-y px-4 pb-8">
				<Hero />
				<Features />
				<Products />
				<DownloadSection />
				<CTA />
				<InfoSection />
			</main>

			<Footer />
		</Fragment>
	);
}
