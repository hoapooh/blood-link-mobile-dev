import { Tabs } from "expo-router";

import { NotificationBell } from "@/features/reminders";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

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
				headerLeft: () => (
					<MaterialIcons name="health-and-safety" className="ml-4" size={26} color={"#ef4444"} />
				),
				headerRight: () => <NotificationBell />,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Trang chủ",
					headerTitle: "Blood Link",
					headerTitleAlign: "left",
					headerShown: true,
					tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
				}}
			/>
			
			<Tabs.Screen
				name="blood-search"
				options={{
					title: "Thông tin máu",
					headerTitleAlign: "left",
					headerShown: true,
					tabBarIcon: ({ color }) => <Ionicons name="search" size={26} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="request"
				options={{
					title: "Yêu cầu",
					headerShown: true,
					headerTitleAlign: "left",
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="form-select" size={26} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="near-by"
				options={{
					title: "Gần đây",
					headerTitle: "Tìm kiếm gần đây",
					headerTitleAlign: "left",
					headerShown: true,
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="near-me" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Hồ sơ",
					headerTitleAlign: "left",
					headerShown: true,
					tabBarIcon: ({ color }) => <Ionicons name="water" size={26} color={color} />,
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;