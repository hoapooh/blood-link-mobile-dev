import { IUser } from "@/interfaces/user";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface ProfileHeaderProps {
	user: IUser | null;
	isLoading: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isLoading }) => {
	if (isLoading) {
		return (
			<View className="bg-red-500 px-6 py-8">
				<View className="items-center">
					<ActivityIndicator size="large" color="#ffffff" />
				</View>
			</View>
		);
	}
	const displayName =
		user?.data?.firstName && user?.data?.lastName
			? `${user.data.lastName} ${user.data.firstName}`
			: user?.data?.firstName || "Người dùng";

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase())
			.slice(0, 2)
			.join("");
	};

	return (
		<View className="bg-red-500 px-6 py-8">
			<View className="items-center">
				{/* Avatar */}
				<View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
					<Text className="text-red-500 text-2xl font-bold">{getInitials(displayName)}</Text>
				</View>
				{/* Name */}
				<Text className="text-white text-2xl font-bold mb-2">{displayName}</Text> {/* Email */}
				<Text className="text-red-100 text-base mb-1">
					{user?.data?.account.email || "Không có email"}
				</Text>
				{/* Blood Type */}
				{user?.data?.bloodType && (
					<View className="bg-red-600 px-3 py-1 rounded-full mt-2">
						<Text className="text-white font-semibold">Nhóm máu: {user.data.bloodType}</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default ProfileHeader;
