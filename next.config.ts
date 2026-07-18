import type { NextConfig } from "next";
import withPWA from "next-pwa";

import path from "path";

const nextConfig: NextConfig = {
	output: "standalone",

	typedRoutes: true,

	reactCompiler: true,

	reactStrictMode: process.env.NODE_ENV === "development",

	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "8000",
				pathname: "/media/**",
			},
			{
				protocol: "http",
				hostname: "127.0.0.1",
				port: "8000",
				pathname: "/media/**",
			},
		],
	},

	turbopack: {
		root: path.join(__dirname, ".."),
	},
};

export default withPWA({
	dest: "public",
	disable: process.env.NODE_ENV === "development",
})(nextConfig);
