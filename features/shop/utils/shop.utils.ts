import { FeatureKey, Plan } from "../types";

/**
 * Extracts a specific feature value from a plan's features array.
 * Returns null if the feature isn't found.
 */
export function getFeature(plan: Plan, key: FeatureKey): string | null {
	return plan.features.find((f) => f.feature === key)?.value ?? null;
}

/**
 * Returns a human-readable device limit string.
 * API returns "-1" for unlimited.
 */
export function deviceLabel(plan: Plan): string {
	const val = getFeature(plan, "محدودیت دستگاه");
	if (val === "-1" || val === null) return "اتصال نامحدود";
	return `${val} دستگاه`;
}

/**
 * Extracts the plan tier (Ultra / Pro / Basic) from its title.
 * Title format from API: "{group} - {tier}"  e.g. "مستقیم - Ultra"
 */
export function planTier(plan: Plan): string {
	return plan.title.split(" - ")[1] ?? plan.title;
}

/**
 * Extracts the plan group (مستقیم / تونل شده) from its title.
 */
export function planGroup(plan: Plan): string {
	return plan.title.split(" - ")[0] ?? plan.title;
}

/**
 * Groups plans by their prefix (مستقیم / تونل شده / ...).
 * Returns a Map preserving insertion order.
 */
export function groupPlansByType(plans: Plan[]): Map<string, Plan[]> {
	const map = new Map<string, Plan[]>();
	for (const plan of plans) {
		const group = planGroup(plan);
		if (!map.has(group)) map.set(group, []);
		map.get(group)!.push(plan);
	}
	return map;
}

// ─── Helper: which plan in a group is "featured" ─────────────────────────────
const TIER_ORDER: Record<string, number> = { Ultra: 0, Pro: 1, Basic: 2 };

export function isFeatured(plan: Plan, plans: Plan[]): boolean {
	// The middle tier in the group gets featured.
	// If only 1 plan, it's featured. For 3 (Ultra/Pro/Basic) → Pro.
	if (plans.length === 1) return true;
	const sorted = [...plans].sort(
		(a, b) =>
			(TIER_ORDER[planTier(a)] ?? 99) - (TIER_ORDER[planTier(b)] ?? 99),
	);
	const midIndex = Math.floor(sorted.length / 2);
	return sorted[midIndex]?.id === plan.id;
}
