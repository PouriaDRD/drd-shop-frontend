import { cn } from "@/features/shared/utils";

interface Props {
	className?: string;
	children?: React.ReactNode;
}

function PageLayout({ children, className }: Props) {
	return (
		<main className={cn("flex-1 h-full w-full p-4 sm:p-6 ", className)}>
			{children}
		</main>
	);
}

export default PageLayout;
