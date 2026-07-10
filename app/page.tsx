import { Fragment } from "react";

import { Footer, Header } from "@/components/layouts";
import { CTA, Features, Hero, InfoSection } from "@/components/pages/landing";
import { AnnouncementsAlert } from "@/features/notifications/components/alerts";
import { Products } from "@/features/shop/components";

export default function LandingPage() {
	return (
		<Fragment>
			<AnnouncementsAlert />
			<Header />

			<main className="mx-auto flex max-w-6xl flex-col divide-y px-4 pb-8">
				<Hero />
				<Features />
				<Products />
				<CTA />
				<InfoSection />
			</main>

			<Footer />
		</Fragment>
	);
}
