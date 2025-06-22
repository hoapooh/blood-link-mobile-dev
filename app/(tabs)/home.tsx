import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { Text, View } from "react-native";

const Index = () => {
	const { user } = useUser();

	return (
		<View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f]">
			<Text className="text-4xl text-red-500 font-bold">
				Blood<Text className="text-black">Link</Text>
			</Text>
			<Text className="text-xl text-gray-700 dark:text-gray-300 mt-4 text-center">
				Welcome, {user?.emailAddresses[0].emailAddress || "Guest"}!
			</Text>
		</View>
	);
};

export default Index;
