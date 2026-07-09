import type { MetadataRoute } from "next";

function siteMap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://pouria-drd.ir",
			lastModified: "06/06/2026",
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
export default siteMap;
