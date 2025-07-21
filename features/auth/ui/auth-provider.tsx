import React, { useCallback, useEffect, useRef } from "react";

import { setAuthToken } from "@/config/axios-instance";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import { useAuth } from "@clerk/clerk-expo";

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const { getToken, isSignedIn, isLoaded, sessionId } = useAuth();
	const { login, logout, initializeAuth } = useAuthStore();

	// Keep track of previous values to avoid unnecessary re-runs
	const prevAuthState = useRef({ isSignedIn, sessionId, isLoaded });

	// Memoize the sync function to prevent unnecessary re-creations
	const syncAuth = useCallback(async () => {
		if (!isLoaded) return;

		// Only log when auth state actually changes
		const currentState = { isSignedIn, sessionId, isLoaded };
		if (
			prevAuthState.current.isSignedIn !== isSignedIn ||
			prevAuthState.current.sessionId !== sessionId ||
			prevAuthState.current.isLoaded !== isLoaded
		) {
			prevAuthState.current = currentState;
		}

		if (isSignedIn || sessionId) {
			try {
				const token = await getToken({
					template: "default",
				});

				if (token) {
					setAuthToken(token);
					await login(token);
				}
			} catch (error) {
				console.error("Failed to sync Clerk token:", error);
			}
		} else {
			setAuthToken(null);
			await logout();
		}
	}, [isSignedIn, isLoaded, sessionId, getToken, login, logout]);

	useEffect(() => {
		syncAuth();
	}, [syncAuth]);

	// Initialize auth on app start
	/* useEffect(() => {
		initializeAuth();
	}, [initializeAuth]); */

	// Auth sync is now handled in app/index.tsx for better routing control
	return <>{children}</>;
};
