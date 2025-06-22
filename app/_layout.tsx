import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthProvider } from "@/features/auth/ui/auth-provider-alternative";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
	QueryClient,
	QueryClientProvider,
	focusManager,
	onlineManager,
} from "@tanstack/react-query";
import * as Network from "expo-network";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";
import "../global.css";

// Create a client
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000, // 1 seconds
			refetchOnMount: true,
			refetchOnWindowFocus: true,
		},
	},
});

onlineManager.setEventListener((setOnline) => {
	const eventSubscription = Network.addNetworkStateListener((state) => {
		setOnline(!!state.isConnected);
	});
	return eventSubscription.remove;
});

function onAppStateChange(status: AppStateStatus) {
	if (Platform.OS !== "web") {
		focusManager.setFocused(status === "active");
	}
}

export default function RootLayout() {
	useEffect(() => {
		const subscription = AppState.addEventListener("change", onAppStateChange);

		return () => subscription.remove();
	}, []);

	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

	if (!publishableKey) {
		throw new Error(
			"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
		);
	}

	return (
		<ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<GluestackUIProvider mode="light">
						<Stack screenOptions={{ headerShown: false }} />
					</GluestackUIProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
