import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<GluestackUIProvider mode="light">
				<Stack screenOptions={{ headerShown: false }} />
			</GluestackUIProvider>
		</ClerkProvider>
	);
}
