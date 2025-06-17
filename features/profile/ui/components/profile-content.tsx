import useGetProfile from "@/features/profile/hooks/use-get-profile";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import React from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ProfileActions from "./profile-actions";
import ProfileHeader from "./profile-header";
import ProfileInfo from "./profile-info";

const ProfileContent = () => {
	const { signOut } = useClerk();
	const { user: authUser, logout } = useAuthStore();
	const { user, isLoading, isError, error, refetch } = useGetProfile();
	const handleSignOut = async () => {
		Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
			{
				text: "Hủy",
				style: "cancel",
			},
			{
				text: "Đăng xuất",
				style: "destructive",
				onPress: async () => {
					try {
						await logout();
						await signOut();
						// Redirect to your desired page
						Linking.openURL(Linking.createURL("/sign-in"));
					} catch (error) {
						console.error("Sign out error:", error);
					}
				},
			},
		]);
	};

	if (isError) {
		return (
			<View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f] px-6">
				<Text className="text-red-500 text-center mb-4">
					{error instanceof Error ? error.message : "Không thể tải thông tin hồ sơ"}
				</Text>
				<TouchableOpacity onPress={() => refetch()} className="bg-red-500 px-6 py-3 rounded-lg">
					<Text className="text-white font-semibold">Thử lại</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-[#fffafa] dark:bg-[#1f1f1f]">
			<View className="pb-6">
				<ProfileHeader user={user || authUser} isLoading={isLoading} />
				<ProfileInfo user={user || authUser} isLoading={isLoading} />
				<ProfileActions onSignOut={handleSignOut} />
			</View>
		</ScrollView>
	);
};

export default ProfileContent;
