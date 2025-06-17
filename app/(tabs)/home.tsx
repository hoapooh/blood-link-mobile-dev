import HomePage from "@/features/home/ui/layout/home-page";
import { SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
const Index = () => {
	const { user } = useUser();

	return (
		<View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f]">
			{/* <Text className="text-4xl text-red-500 font-bold">
				Blood<Text className="text-black">Link</Text>
			</Text>
			<Text className="text-2xl text-gray-700 dark:text-gray-300 mt-4">
				Welcome, {user?.emailAddresses[0].emailAddress || "Guest"}!
			</Text> */}

			<SignedOut>
				<Link href="/(auth)/sign-in">
					<Text>Sign in</Text>
				</Link>
				<Link href="/(auth)/sign-up">
					<Text>Sign up</Text>
				</Link>
			</SignedOut>
			<HomePage/>
			{/* <CampaignDetail/> */}
		</View>
	);
};

export default Index;
