import { setAuthToken } from "@/config/axios-instance";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

export const useAuthSync = () => {
	const { getToken, isSignedIn, isLoaded } = useAuth();
	const { login, logout, initializeAuth } = useAuthStore();

	useEffect(() => {
		const syncAuth = async () => {
			if (!isLoaded) return;

			if (isSignedIn) {
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
		};

		syncAuth();
	}, [isSignedIn, isLoaded, getToken, login, logout]);

	// Initialize auth on app start
	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return {
		isAuthenticated: isSignedIn && isLoaded,
		isLoading: !isLoaded,
	};
};
