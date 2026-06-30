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
import { NotificationAlert } from "@/features/shared/components";

export default function LandingPage() {
	return (
		<main>
			<Header />
			<NotificationAlert />
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
