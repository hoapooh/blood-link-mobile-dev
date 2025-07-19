import { SignOutButton } from "@/features/auth/ui/components/sign-out-button";
import React from "react";
import { HStack } from "./hstack";
import { Text } from "./text";
import { VStack } from "./vstack";

interface CustomHeaderProps {
	title?: string;
	showSignOut?: boolean;
}

export const CustomHeader = ({ title, showSignOut = true }: CustomHeaderProps) => (
	<VStack className="px-6 pt-6 pb-4 bg-red-500">
		<HStack className="items-center justify-between">
			<Text className="text-2xl font-bold text-white">
				Blood<Text className="text-red-200">Link</Text>
			</Text>
			{showSignOut && <SignOutButton />}
		</HStack>
	</VStack>
);
