import { IUser } from "@/interfaces/user";
import {
	clearAuthLocalStorage,
	getTokenFromLocalStorage,
	getUserInfoFromLocalStorage,
	setTokenToLocalStorage,
} from "@/utils/auth-utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { AuthSlice } from "./index";

export const useAuthStore = create<AuthSlice>()(
	devtools(
		(set, get) => ({
			token: null,
			user: null,
			isAuthenticated: false,
			isLoading: false,
			error: null,

			setUserData: (user: IUser) => {
				set({ user, isAuthenticated: true });
			},

			login: async (token: string) => {
				try {
					set({ isLoading: true, error: null });
					await setTokenToLocalStorage(token);
					set({ token, isAuthenticated: true, isLoading: false });
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : "Login failed",
						isLoading: false,
					});
					throw error;
				}
			},

			logout: async () => {
				try {
					set({ isLoading: true });
					await clearAuthLocalStorage();
					set({
						token: null,
						user: null,
						isAuthenticated: false,
						isLoading: false,
						error: null,
					});
				} catch (error) {
					set({
						error: error instanceof Error ? error.message : "Logout failed",
						isLoading: false,
					});
					throw error;
				}
			},

			initializeAuth: async () => {
				try {
					set({ isLoading: true });
					const [token, userInfo] = await Promise.all([
						getTokenFromLocalStorage(),
						getUserInfoFromLocalStorage(),
					]);

					if (token && userInfo) {
						set({
							token,
							user: userInfo,
							isAuthenticated: true,
							isLoading: false,
						});
					} else {
						set({ isLoading: false });
					}
				} catch (error) {
					console.error("Failed to initialize auth:", error);
					set({
						error: error instanceof Error ? error.message : "Auth initialization failed",
						isLoading: false,
					});
				}
			},
		}),
		{
			name: "auth-storage",
		}
	)
);
