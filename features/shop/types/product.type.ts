export type ProductType = "vpn";

export type Product = {
	id: string;
	slug: string;
	title: string;
	description: string | null;
	type: ProductType;
};

export type ProductDetail = {
	id: string;
	slug: string;
	title: string;
	description: string;
	type: ProductType;
	plans: Plan[];
};

export type PlanFeature = {
	feature: string;
	value: string;
};

// Known feature keys coming from the API
export type FeatureKey = "محدودیت دستگاه" | "لوکیشن" | "ترافیک" | "روز";

export type Plan = {
	id: string;
	title: string;
	description: string | null;
	price: number;
	is_available: boolean;
	features: PlanFeature[];
};
