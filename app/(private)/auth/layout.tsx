import { PropsWithChildren } from "react";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
	return <main className="h-dvh">{children} </main>;
}
