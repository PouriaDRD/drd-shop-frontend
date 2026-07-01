import { Fragment } from "react";

import { Footer, Header } from "@/components/layouts";
import {
	CTA,
	Features,
	Hero,
	InfoSection,
	Pricing,
} from "@/components/pages/landing";
import { AnnouncementsAlert } from "@/features/notifications/components";

export default function LandingPage() {
	return (
		<Fragment>
			<AnnouncementsAlert />

			<Header />

			<main className="mx-auto flex max-w-6xl flex-col px-4 pb-8">
				<Hero />

				<Features />

				<Pricing />

				<CTA />

				<InfoSection />
			</main>

			<Footer />
		</Fragment>
	);
}
