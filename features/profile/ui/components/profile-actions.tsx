import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileActionsProps {
	onSignOut: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({ onSignOut }) => {
	const router = useRouter();
	const ActionButton = ({
		title,
		onPress,
		variant = "default",
	}: {
		title: string;
		onPress: () => void;
		variant?: "default" | "danger";
	}) => {
		const baseClasses = "px-6 py-4 rounded-lg mb-3";
		const variantClasses = variant === "danger" ? "bg-red-500" : "bg-gray-100 dark:bg-gray-800";
		const textClasses = variant === "danger" ? "text-white" : "text-gray-900 dark:text-white";

		return (
			<TouchableOpacity className={`${baseClasses} ${variantClasses}`} onPress={onPress}>
				<Text className={`${textClasses} font-semibold text-center text-base`}>{title}</Text>
			</TouchableOpacity>
		);
	};
	return (
		<View className="px-6 py-6">
			{/* <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hành động nhanh</Text> */}

			<View className="space-y-3">
				<ActionButton
					title="Xem lịch sử đăng ký hiến máu"
					onPress={() => {
						router.push("/(request)");
					}}
				/>

				{/* <ActionButton
					title="Cài đặt quyền riêng tư"
					onPress={() => {
						// TODO: Navigate to privacy settings
						console.log("Privacy settings pressed");
					}}
				/>

				<ActionButton
					title="Cài đặt thông báo"
					onPress={() => {
						// TODO: Navigate to notification settings
						console.log("Notification settings pressed");
					}}
				/> */}

				<ActionButton
					title="Trợ giúp & Hỗ trợ"
					onPress={() => {
						// TODO: Navigate to help screen
						console.log("Help & support pressed");
					}}
				/>
			</View>

				<ActionButton title="Đăng xuất" onPress={onSignOut} variant="danger" />
			
		</View>
	);
};

export default ProfileActions;
