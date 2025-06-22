import { useAuthStore } from "@/store/slice/auth/auth-store";
import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const IndexPage = () => {
	const { isAuthenticated, isLoading, token } = useAuthStore();

	console.log(JSON.stringify({ token, isAuthenticated }, null, 2));

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
