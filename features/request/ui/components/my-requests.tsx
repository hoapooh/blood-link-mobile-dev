import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import {
	AlertCircleIcon,
	CalendarDaysIcon,
	CheckCircleIcon,
	ClockIcon,
	Icon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { MapPin, X } from "lucide-react-native";
import React from "react";

// Mock data for user's request history
const myRequests = [
	{
		id: "1",
		bloodType: "O+",
		status: "Completed",
		location: "City Hospital",
		donationDate: "2024-05-28",
		requestDate: "2024-05-26",
		unitsRequested: 2,
		unitsDonated: 2,
		recipient: "Emergency Surgery Patient",
		feedback: "Thank you for your life-saving donation!",
	},
	{
		id: "2",
		bloodType: "O+",
		status: "In Progress",
		location: "Metro Medical Center",
		donationDate: "2024-06-05",
		requestDate: "2024-06-03",
		unitsRequested: 1,
		unitsDonated: 0,
		recipient: "Cancer Treatment Patient",
		feedback: null,
	},
	{
		id: "3",
		bloodType: "O+",
		status: "Cancelled",
		location: "Community Health Center",
		donationDate: null,
		requestDate: "2024-05-20",
		unitsRequested: 1,
		unitsDonated: 0,
		recipient: "Scheduled Surgery Patient",
		feedback: "Request cancelled - patient condition improved",
	},
	{
		id: "4",
		bloodType: "O+",
		status: "Pending",
		location: "Regional Blood Bank",
		donationDate: "2024-06-10",
		requestDate: "2024-06-04",
		unitsRequested: 1,
		unitsDonated: 0,
		recipient: "Accident Victim",
		feedback: null,
	},
];

const MyRequests = () => {
	const getStatusInfo = (status: string) => {
		switch (status) {
			case "Completed":
				return {
					color: "bg-success-500",
					textColor: "text-success-600",
					icon: CheckCircleIcon,
					iconColor: "text-success-500",
				};
			case "In Progress":
				return {
					color: "bg-info-500",
					textColor: "text-info-600",
					icon: ClockIcon,
					iconColor: "text-info-500",
				};
			case "Pending":
				return {
					color: "bg-warning-500",
					textColor: "text-warning-600",
					icon: AlertCircleIcon,
					iconColor: "text-warning-500",
				};
			case "Cancelled":
				return {
					color: "bg-error-500",
					textColor: "text-error-600",
					icon: X,
					iconColor: "text-error-500",
				};
			default:
				return {
					color: "bg-background-500",
					textColor: "text-typography-600",
					icon: ClockIcon,
					iconColor: "text-typography-500",
				};
		}
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "Not scheduled";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<VStack className="p-4" space="xl">
			<Text className="text-lg font-semibold text-typography-900 mb-2">My Donation History</Text>
			{myRequests.map((request) => {
				const statusInfo = getStatusInfo(request.status);

				return (
					<Card
						key={request.id}
						className="p-4 border border-outline-200 rounded-xl bg-white shadow-sm"
					>
						<VStack space="md">
							{/* Header with blood type and status */}
							<HStack className="justify-between items-center">
								<HStack className="items-center" space="md">
									<VStack className="bg-red-50 rounded-full items-center justify-center w-12 h-12 shrink-0">
										<Text className="text-red-600 font-bold text-lg">{request.bloodType}</Text>
									</VStack>

									<VStack>
										<Text className="font-semibold text-typography-900">{request.recipient}</Text>
										<Text className="text-sm text-typography-600">
											{request.unitsRequested} unit{request.unitsRequested > 1 ? "s" : ""} requested
										</Text>
									</VStack>
								</HStack>

								<VStack className="items-end">
									<Badge className={`${statusInfo.color} px-3 py-1 rounded-full mb-1`}>
										<BadgeText className="text-white font-medium text-xs">
											{request.status}
										</BadgeText>
									</Badge>
									<Icon as={statusInfo.icon} size="sm" className={statusInfo.iconColor} />
								</VStack>
							</HStack>

							{/* Location and dates */}
							<VStack space="sm">
								<HStack className="items-center" space="sm">
									<Icon as={MapPin} size="sm" className="text-typography-500" />
									<Text className="text-sm text-typography-600 flex-1">{request.location}</Text>
								</HStack>

								<HStack className="items-center" space="sm">
									<Icon as={CalendarDaysIcon} size="sm" className="text-typography-500" />
									<Text className="text-sm text-typography-600">
										Requested: {formatDate(request.requestDate)}
									</Text>
								</HStack>

								{request.donationDate && (
									<HStack className="items-center" space="sm">
										<Icon as={CalendarDaysIcon} size="sm" className="text-success-500" />
										<Text className="text-sm text-success-600">
											Donation: {formatDate(request.donationDate)}
										</Text>
									</HStack>
								)}
							</VStack>

							{/* Progress indicator for completed donations */}
							{request.status === "Completed" && (
								<VStack className="bg-success-50 p-3 rounded-lg">
									<HStack className="justify-between items-center mb-1">
										<Text className="text-sm font-medium text-success-700">Donation Complete</Text>
										<Text className="text-sm font-bold text-success-700">
											{request.unitsDonated}/{request.unitsRequested}
										</Text>
									</HStack>
									<VStack className="bg-success-200 h-2 rounded-full">
										<VStack
											className="bg-success-500 h-2 rounded-full"
											style={{
												width: `${(request.unitsDonated / request.unitsRequested) * 100}%`,
											}}
										/>
									</VStack>
								</VStack>
							)}

							{/* Feedback section */}
							{request.feedback && (
								<VStack className="bg-background-50 p-3 rounded-lg">
									<Text className="text-sm font-medium text-typography-700 mb-1">Feedback:</Text>
									<Text className="text-sm text-typography-600 italic">
										&quot;{request.feedback}&quot;
									</Text>
								</VStack>
							)}

							{/* Action buttons based on status */}
							{request.status === "Pending" && (
								<HStack className="pt-2" space="md">
									<Button
										action="secondary"
										className="flex-1"
										onPress={() => {
											// Handle reschedule action
											console.log("Rescheduling request:", request.id);
										}}
									>
										<ButtonText>Reschedule</ButtonText>
									</Button>

									<Button
										variant="outline"
										action="negative"
										className="flex-1"
										onPress={() => {
											// Handle cancel action
											console.log("Cancelling request:", request.id);
										}}
									>
										<ButtonText>Cancel</ButtonText>
									</Button>
								</HStack>
							)}

							{request.status === "In Progress" && (
								<Button
									variant="solid"
									action="primary"
									className="w-full bg-red-500"
									onPress={() => {
										// Handle view details action
										console.log("Viewing details for request:", request.id);
									}}
								>
									<ButtonText className="text-white">View Details</ButtonText>
								</Button>
							)}
						</VStack>
					</Card>
				);
			})}

			{/* Empty state if no requests */}
			{myRequests.length === 0 && (
				<VStack className="items-center justify-center py-12 space-y-3">
					<VStack className="bg-background-100 p-6 rounded-full">
						<Icon as={CalendarDaysIcon} size="xl" className="text-typography-400" />
					</VStack>
					<Text className="text-lg font-medium text-typography-600">No donation history</Text>
					<Text className="text-sm text-typography-500 text-center">
						Your donation requests and history will appear here.
					</Text>
				</VStack>
			)}
		</VStack>
	);
};

export default MyRequests;
