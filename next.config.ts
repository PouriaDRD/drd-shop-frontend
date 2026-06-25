import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",

	typedRoutes: true,

	reactCompiler: true,

	reactStrictMode: process.env.NODE_ENV === "development",

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "127.0.0.1",
			},
			{
				protocol: "https",
				hostname: "localhost",
			},
		],
	},
	turbopack: {
		root: path.join(__dirname, ".."),
	},
};

export default nextConfig;
