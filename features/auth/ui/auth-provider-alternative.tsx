import React, { useEffect, useRef } from "react";

import { setAuthToken } from "@/config/axios-instance";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import { useAuth, useUser } from "@clerk/clerk-expo";

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const { getToken, isSignedIn, isLoaded, sessionId } = useAuth();
	const { login, logout, initializeAuth } = useAuthStore();
	const { user } = useUser();

	// Keep track of previous values to avoid unnecessary re-runs
	const prevAuthState = useRef({ isSignedIn, sessionId, isLoaded });
	const syncInProgress = useRef(false);

	// Effect that only depends on the core auth state values
	useEffect(() => {
		// Avoid running if already in progress
		if (syncInProgress.current) return;

		// Only proceed if auth state actually changed
		const hasChanged =
			prevAuthState.current.isSignedIn !== isSignedIn ||
			prevAuthState.current.sessionId !== sessionId ||
			prevAuthState.current.isLoaded !== isLoaded;

		if (!hasChanged) return;

		prevAuthState.current = { isSignedIn, sessionId, isLoaded };

		const syncAuth = async () => {
			if (!isLoaded) return;

			syncInProgress.current = true;

			try {
				if (user || isSignedIn || sessionId) {
					const token = await getToken({
						template: "default",
					});

					if (token) {
						setAuthToken(token);
						await login(token);
					}
				} else {
					setAuthToken(null);
					await logout();
				}
			} catch (error) {
				console.error("Failed to sync Clerk token:", error);
			} finally {
				syncInProgress.current = false;
			}
		};

		syncAuth();
	}, [isSignedIn, isLoaded, sessionId]); // Only depend on the actual state values

	// Initialize auth on app start
	/* useEffect(() => {
		initializeAuth();
	}, [initializeAuth]); */

	// Auth sync is now handled in app/index.tsx for better routing control
	return <>{children}</>;
};
