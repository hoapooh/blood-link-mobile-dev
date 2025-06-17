import { Badge } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { ClockIcon, Icon, PhoneIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { MapPinIcon } from "lucide-react-native";
import React from "react";

// Mock data for available blood requests
const availableRequests = [
	{
		id: "1",
		bloodType: "O+",
		urgency: "Critical",
		location: "City Hospital",
		distance: "2.5 km",
		requiredUnits: 3,
		patientAge: 45,
		timePosted: "2 hours ago",
		contact: "+1234567890",
		description: "Urgent blood needed for surgery patient",
	},
	{
		id: "2",
		bloodType: "A-",
		urgency: "High",
		location: "Metro Medical Center",
		distance: "5.1 km",
		requiredUnits: 2,
		patientAge: 28,
		timePosted: "4 hours ago",
		contact: "+1234567891",
		description: "Blood needed for accident victim",
	},
	{
		id: "3",
		bloodType: "B+",
		urgency: "Medium",
		location: "Community Health Center",
		distance: "8.3 km",
		requiredUnits: 1,
		patientAge: 35,
		timePosted: "6 hours ago",
		contact: "+1234567892",
		description: "Blood required for scheduled surgery",
	},
];

const AvailableRequests = () => {
	const getUrgencyColor = (urgency: string) => {
		switch (urgency) {
			case "Critical":
				return "bg-red-500";
			case "High":
				return "bg-orange-500";
			case "Medium":
				return "bg-yellow-500";
			default:
				return "bg-green-500";
		}
	};

	return (
		<VStack className="p-4 pb-8" space="lg">
			<Text className="text-lg font-semibold text-typography-900 mb-2">
				Available Blood Requests Near You
			</Text>

			{availableRequests.map((request) => (
				<Card
					key={request.id}
					className="p-4 border border-outline-200 rounded-xl bg-white shadow-sm"
				>
					<VStack space="md">
						{/* Header with blood type and urgency */}
						<HStack className="justify-between items-center">
							<HStack className="items-center" space="md">
								<VStack className="bg-red-50 p-3 rounded-full items-center justify-center w-12 h-12 shrink-0">
									<Text className="text-red-600 font-bold text-lg">{request.bloodType}</Text>
								</VStack>
								<VStack>
									<Text className="font-semibold text-typography-900">
										{request.requiredUnits} Unit{request.requiredUnits > 1 ? "s" : ""} Needed
									</Text>
									<Text className="text-sm text-typography-600">
										Patient Age: {request.patientAge}
									</Text>
								</VStack>
							</HStack>
							<Badge className={`${getUrgencyColor(request.urgency)} px-3 py-1 rounded-full`}>
								<Text className="text-white font-medium text-xs">{request.urgency}</Text>
							</Badge>
						</HStack>

						{/* Description */}
						<Text className="text-sm text-typography-700">{request.description}</Text>

						{/* Location and time info */}
						<VStack className="space-y-2">
							<HStack className="items-center" space="sm">
								<Icon as={MapPinIcon} size="sm" className="text-typography-500" />
								<Text className="text-sm text-typography-600 flex-1">
									{request.location} • {request.distance}
								</Text>
							</HStack>

							<HStack className="items-center" space="sm">
								<Icon as={ClockIcon} size="sm" className="text-typography-500" />
								<Text className="text-sm text-typography-600">Posted {request.timePosted}</Text>
							</HStack>
						</VStack>

						{/* Action buttons */}
						<HStack className="pt-2" space="md">
							<Button
								variant="solid"
								action="primary"
								className="flex-1 bg-red-500"
								onPress={() => {
									// Handle volunteer action
									console.log("Volunteering for request:", request.id);
								}}
							>
								<ButtonText className="font-semibold text-white">Volunteer to Donate</ButtonText>
							</Button>

							<Button
								variant="outline"
								action="secondary"
								className="px-4 border-red-300"
								onPress={() => {
									// Handle contact action
									console.log("Contacting for request:", request.id);
								}}
							>
								<Icon as={PhoneIcon} size="sm" className="text-red-600" />
							</Button>
						</HStack>
					</VStack>
				</Card>
			))}

			{/* Empty state if no requests */}
			{availableRequests.length === 0 && (
				<VStack className="items-center justify-center py-12 space-y-3">
					<VStack className="bg-background-100 p-6 rounded-full">
						<Icon as={MapPinIcon} size="xl" className="text-typography-400" />
					</VStack>
					<Text className="text-lg font-medium text-typography-600">No requests available</Text>
					<Text className="text-sm text-typography-500 text-center">
						Check back later for blood donation requests in your area.
					</Text>
				</VStack>
			)}
		</VStack>
	);
};

export default AvailableRequests;
