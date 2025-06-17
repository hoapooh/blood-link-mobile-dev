import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
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
			staleTime: 1000 * 60, // 1 minutes
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

	return (
		<ClerkProvider tokenCache={tokenCache}>
			<QueryClientProvider client={queryClient}>
				<GluestackUIProvider mode="light">
					<Stack screenOptions={{ headerShown: false }} />
				</GluestackUIProvider>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
