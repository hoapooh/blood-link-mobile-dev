import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import EmergencyRequest from "./emergency-request";
import MyRequests from "./my-requests";

const RequestTabs = () => {
	const [activeTab, setActiveTab] = useState<"emergency" | "history">("emergency");

	
	return (
		<VStack className="flex-1 bg-background-0">
			
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
						Yêu cầu khẩn cấp
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
						Lịch sử yêu cầu
					</ButtonText>
				</Button>
			</HStack>

			{/* Tab Content */}
			<ScrollView className="flex-1">
				{activeTab === "emergency" && <EmergencyRequest />}

				

				{activeTab === "history" && <MyRequests />}
			</ScrollView>
		</VStack>
	);
};

export default RequestTabs;
