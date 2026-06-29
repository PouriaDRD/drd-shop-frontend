"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { OtpStoreState } from "../types/otp.type";

export const useOtpStore = create<OtpStoreState>()(
	persist(
		(set) => ({
			email: "",
			expires_in: 0,
			step: "request-otp",

			setEmail: (email) => set({ email }),
			setStep: (step) => set({ step }),
			setExpiresIn: (expires_in) => set({ expires_in }),

			set: (patch) => set((state) => ({ ...state, ...patch })),

			reset: () =>
				set({
					email: "",
					expires_in: 0,
					step: "request-otp",
				}),

			_hasHydrated: false,
			setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
		}),
		{
			name: "otp-store",
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
				step: state.step,
				expires_in: state.expires_in,
			}),
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
);
