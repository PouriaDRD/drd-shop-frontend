import { Footer, Header } from "@/components/layouts";
import {
	CTA,
	Features,
	Hero,
	InfoSection,
	Pricing,
	ServerStatus,
} from "@/components/pages/landing";
import { AnnouncementsAlert } from "@/features/notifications/components";

export default function LandingPage() {
	return (
		<main>
			<Header />
			<AnnouncementsAlert />
			<Hero />
			<Features />
			<ServerStatus />
			<Pricing />
			<InfoSection />
			<CTA />
			<Footer />
		</main>
	);
}
