import { SignOutButton } from "@/features/auth/ui/components/sign-out-button";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					alignItems: "center",
					justifyContent: "center",
					paddingTop: 10,
					height: 70,
					borderTopWidth: 0,
					elevation: 0,
					shadowOpacity: 0,
					backgroundColor: "#fffafa",
				},
				headerStyle: {
					backgroundColor: "#fffafa",
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0,
				},
				headerTitleStyle: {
					fontWeight: "bold",
				},
				headerTintColor: "#ef4444",
				tabBarActiveTintColor: "#ef4444",
				tabBarInactiveTintColor: "#6b7280",
				headerShadowVisible: false,
				headerTitleAlign: "center",
				headerRight: () => <SignOutButton />,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Trang chủ",
					headerShown: true,
					tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="blood-search"
				options={{
					title: "Thông tin máu",
					headerShown: true,
					tabBarIcon: ({ color }) => <Ionicons name="search" size={26} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="request"
				options={{
					title: "Yêu cầu",
					headerShown: true,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="form-select" size={26} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Hồ sơ",
					headerShown: true,
					tabBarIcon: ({ color }) => <Ionicons name="water" size={26} color={color} />,
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
