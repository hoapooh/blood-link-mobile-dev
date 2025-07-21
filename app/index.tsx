import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuthStore } from "@/store/slice/auth/auth-store";

const IndexPage = () => {
	const { isAuthenticated, isLoading, token } = useAuthStore();

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f]">
				<ActivityIndicator size="large" color="#ef4444" />
			</View>
		);
	}

	// Redirect based on authentication status
	if (isAuthenticated) {
		return <Redirect href="/(tabs)/home" />;
	}

	return <Redirect href="/(auth)/sign-in" />;
};

export default IndexPage;
