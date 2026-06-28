"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { useMeQuery } from "../mutations";
import { User } from "../types";

// =========================
// Types
// =========================

type UserContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
	isAuthenticated: boolean;
	clearUser: () => void;
	isLoading: boolean;
	refetchUser: () => void;
};

// =========================
// Context
// =========================

const UserContext = createContext<UserContextType | undefined>(undefined);

// =========================
// Provider
// =========================

export function UserProvider({ children }: { children: ReactNode }) {
	const [localUser, setLocalUser] = useState<User | null | undefined>(
		undefined,
	);

	const { data, isLoading, refetch } = useMeQuery();

	const queryUser = data?.success ? data.data : null;

	const user = localUser === undefined ? queryUser : localUser;

	const setUser = (user: User | null) => {
		setLocalUser(user);
	};

	const clearUser = () => {
		setLocalUser(null);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				isAuthenticated: !!user,
				clearUser,
				isLoading,
				refetchUser: refetch,
			}}>
			{children}
		</UserContext.Provider>
	);
}

// =========================
// Hook (THIS WAS MISSING)
// =========================

export function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error("useUser must be used within UserProvider");
	}

	return context;
}
