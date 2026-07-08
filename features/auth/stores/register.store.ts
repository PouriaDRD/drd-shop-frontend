"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { RegisterStoreState } from "../types/register.type";

export const useRegisterStore = create<RegisterStoreState>()(
	persist(
		(set) => ({
			email: "",
			referral_code: "",
			password: "",
			password_confirm: "",

			set: (patch) => set((state) => ({ ...state, ...patch })),

			reset: () =>
				set({
					email: "",
					referral_code: "",
					password: "",
					password_confirm: "",
				}),

			_hasHydrated: false,
			setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
		}),
		{
			name: "rgs-store",

			// Store in Browser's localStorage only if browser is available
			storage: createJSONStorage(() => {
				if (typeof window !== "undefined") {
					return localStorage;
				}
				return {
					getItem: () => null,
					setItem: () => {},
					removeItem: () => {},
				};
			}),

			// Only save these states to storage (Not Password)
			partialize: (state) => ({
				email: state.email,
				referral_code: state.referral_code,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
);
