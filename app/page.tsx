import { Footer, Header } from "@/components/layouts";
import {
	CTA,
	FAQ,
	Features,
	Hero,
	Pricing,
	ServerStatus,
	SocialChannels,
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
			<FAQ />
			<SocialChannels />
			<CTA />
			<Footer />
		</main>
	);
}
