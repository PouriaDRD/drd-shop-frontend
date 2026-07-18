import { type NextRequest, NextResponse } from "next/server";

import { getSession } from "@/features/auth/actions";

export async function proxy(request: NextRequest) {
	try {
		// Check if the user is authenticated
		const session = await getSession();

		// Allow the request to proceed if authenticated
		if (session) {
			return NextResponse.next();
		}

		// Create redirect URL
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/auth/login";
		redirectUrl.search = "";

		// Preserve only the path and query (avoid localhost / host issues)
		const next =
			request.nextUrl.pathname +
			(request.nextUrl.search || "") +
			(request.nextUrl.hash || "");

		redirectUrl.searchParams.set("next", next);

		return NextResponse.redirect(redirectUrl, {
			status: 303,
		});
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Proxy error:", error);

			console.log({
				url: request.url,
				nextUrl: request.nextUrl.href,
				host: request.headers.get("host"),
				forwardedHost: request.headers.get("x-forwarded-host"),
				forwardedProto: request.headers.get("x-forwarded-proto"),
			});
		}

		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/auth/login";
		redirectUrl.search = "";

		redirectUrl.searchParams.set(
			"next",
			request.nextUrl.pathname +
				(request.nextUrl.search || "") +
				(request.nextUrl.hash || ""),
		);

		return NextResponse.redirect(redirectUrl, {
			status: 303,
		});
	}
}

export const config = {
	matcher: ["/panel/:path*", "/checkout/:path*"],
};
