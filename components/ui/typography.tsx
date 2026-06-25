import { cn } from "@/features/shared/utils";

interface TypographyProps {
	className?: string;
	children?: React.ReactNode;
}

export function H1({ className, children }: TypographyProps) {
	return (
		<h1
			className={cn(
				"scroll-m-20 text-2xl font-extrabold tracking-tight text-balance",
				className,
			)}>
			{children}
		</h1>
	);
}

export function H2({ className, children }: TypographyProps) {
	return (
		<h2
			className={cn(
				"scroll-m-20 text-xl font-semibold tracking-tight first:mt-0",
				className,
			)}>
			{children}
		</h2>
	);
}

export function H3({ className, children }: TypographyProps) {
	return (
		<h3
			className={cn(
				"scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}>
			{children}
		</h3>
	);
}

export function H4({ className, children }: TypographyProps) {
	return (
		<h4
			className={cn(
				"scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}>
			{children}
		</h4>
	);
}

export function P({ className, children }: TypographyProps) {
	return (
		<p className={cn("text-muted-foreground leading-7 text-sm", className)}>
			{children}
		</p>
	);
}
