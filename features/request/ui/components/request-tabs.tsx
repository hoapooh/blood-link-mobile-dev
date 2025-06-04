import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import AvailableRequests from "./available-requests";
import EmergencyRequest from "./emergency-request";
import MyRequests from "./my-requests";
import QuickActions from "./quick-actions";

const RequestTabs = () => {
	const [activeTab, setActiveTab] = useState<"emergency" | "available" | "history">("emergency");

	const getTabDescription = () => {
		switch (activeTab) {
			case "emergency":
				return "Send urgent blood requests to nearby donors";
			case "available":
				return "Find available blood requests in your area";
			case "history":
				return "Track your donation history and requests";
			default:
				return "";
		}
	};

	return (
		<VStack className="flex-1 bg-background-0">
			{/* Header */}
			<VStack className="px-6 pt-6 pb-4 bg-red-500">
				<Text className="text-2xl font-bold text-white mb-2">
					Blood<Text className="text-red-200">Link</Text>
				</Text>
				<Text className="text-red-100 text-base">{getTabDescription()}</Text>
			</VStack>

			{/* Tab Navigation */}
			<HStack className="bg-[#fffafa] border-b border-outline-200">
				<Button
					variant="outline"
					onPress={() => setActiveTab("emergency")}
					className={`flex-1 rounded-none py-4 border-b-2 h-full ${
						activeTab === "emergency"
							? "border-red-500 border-l-0 border-r-0 bg-red-50"
							: "border-transparent"
					}`}
				>
					<ButtonText
						className={`font-semibold text-sm ${
							activeTab === "emergency" ? "text-red-600" : "text-typography-600"
						}`}
					>
						Emergency
					</ButtonText>
				</Button>

				<Button
					variant="outline"
					onPress={() => setActiveTab("available")}
					className={`flex-1 rounded-none py-4 border-b-2 h-full ${
						activeTab === "available"
							? "border-red-500 border-l-0 border-r-0 bg-red-50"
							: "border-transparent"
					}`}
				>
					<ButtonText
						className={`font-semibold text-sm ${
							activeTab === "available" ? "text-red-600" : "text-typography-600"
						}`}
					>
						Available
					</ButtonText>
				</Button>

				<Button
					variant="outline"
					onPress={() => setActiveTab("history")}
					className={`flex-1 rounded-none py-4 border-b-2 h-full ${
						activeTab === "history"
							? "border-red-500 border-l-0 border-r-0 bg-red-50"
							: "border-transparent"
					}`}
				>
					<ButtonText
						className={`font-semibold text-sm ${
							activeTab === "history" ? "text-red-600" : "text-typography-600"
						}`}
					>
						My Requests
					</ButtonText>
				</Button>
			</HStack>

			{/* Tab Content */}
			<ScrollView className="flex-1">
				{activeTab === "emergency" && <EmergencyRequest />}

				{activeTab === "available" && (
					<>
						<QuickActions />
						<AvailableRequests />
					</>
				)}

				{activeTab === "history" && <MyRequests />}
			</ScrollView>
		</VStack>
	);
};

export default RequestTabs;
