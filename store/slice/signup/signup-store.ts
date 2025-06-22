import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LocationData, Page1Data, Page2Data, SignUpSlice } from "./index";

export const useSignUpStore = create<SignUpSlice>()(
	devtools(
		(set, get) => ({
			// Initial state
			currentPage: 1,
			page1Data: null,
			page2Data: null,
			locationData: {},
			isSigningUp: false,
			pendingVerification: false,
			clerkErrors: null,

			// Actions
			setCurrentPage: (page: number) => {
				set({ currentPage: page });
			},

			setPage1Data: (data: Page1Data) => {
				set({ page1Data: data });
			},

			setPage2Data: (data: Page2Data) => {
				set({ page2Data: data });
			},

			setLocationData: (data: LocationData) => {
				set({ locationData: data });
			},

			setIsSigningUp: (loading: boolean) => {
				set({ isSigningUp: loading });
			},

			setPendingVerification: (pending: boolean) => {
				set({ pendingVerification: pending });
			},

			setClerkErrors: (errors: any[] | null) => {
				set({ clerkErrors: errors });
			},

			resetSignUpState: () => {
				set({
					currentPage: 1,
					page1Data: null,
					page2Data: null,
					locationData: {},
					isSigningUp: false,
					pendingVerification: false,
					clerkErrors: null,
				});
			},

			goToNextPage: () => {
				const { currentPage } = get();
				if (currentPage < 2) {
					set({ currentPage: currentPage + 1 });
				}
			},

			goToPreviousPage: () => {
				const { currentPage } = get();
				if (currentPage > 1) {
					set({ currentPage: currentPage - 1 });
				}
			},
		}),
		{
			name: "signup-storage",
		}
	)
);
