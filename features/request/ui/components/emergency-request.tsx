import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AlertTriangle, Clock, HeartIcon, MapPin, Phone, Zap } from "lucide-react-native";
import React, { useState } from "react";
import BloodRequestForm from "./blood-request-form";

interface BloodRequestData {
	bloodType: string;
	unitsNeeded: string;
	urgencyLevel: string;
	patientName: string;
	contactNumber: string;
	hospitalName: string;
	hospitalAddress: string;
	additionalNotes: string;
}

const EmergencyRequest = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleEmergencyRequest = () => {
		setIsFormOpen(true);
	};

	const handleFormSubmit = (requestData: BloodRequestData) => {
		console.log("Emergency blood request submitted:", requestData);
		// Here you would typically send the data to your backend API
		// and trigger immediate notifications to nearby donors
		setIsFormOpen(false);
	};

	const handleFormClose = () => {
		setIsFormOpen(false);
	};

	return (
		<>
			<VStack className="p-4" space="lg">
				{/* Emergency Alert Header */}
				<Card variant="elevated" className="p-6 rounded-xl border border-red-500">
					<VStack className="items-center text-center" space="sm">
						<VStack className="bg-red-100 p-3 rounded-full">
							<Icon as={HeartIcon} size="xl" className="text-red-500" />
						</VStack>

						<VStack className="space-y-2">
							<Text className="text-2xl font-bold text-center text-red-500">
								Emergency Blood Request
							</Text>
							<Text className="text-red-400 text-center leading-5">
								Send immediate requests to available donors in your area. Get help when every minute
								counts.
							</Text>
						</VStack>

						<Button variant="solid" className="w-full mt-4" onPress={handleEmergencyRequest}>
							<Icon as={Zap} size="sm" className="text-white mr-2" />
							<ButtonText className="text-white font-bold text-lg">
								Send Emergency Request
							</ButtonText>
						</Button>
					</VStack>
				</Card>

				{/* How It Works */}
				<Card className="p-4 bg-[#fffafa] border border-red-200 rounded-xl">
					<VStack space="sm">
						<Text className="text-lg font-bold text-gray-900 text-center">
							How Emergency Requests Work
						</Text>

						<VStack space="md">
							<HStack className="items-start" space="sm">
								<VStack className="bg-red-100 p-2 rounded-full w-8 h-8 items-center justify-center">
									<Text className="text-red-600 font-bold text-sm">1</Text>
								</VStack>

								<VStack className="flex-1">
									<Text className="font-semibold text-gray-900">Submit Request</Text>
									<Text className="text-sm text-gray-600">
										Provide patient details, blood type, and urgency level
									</Text>
								</VStack>
							</HStack>

							<HStack className="items-start" space="sm">
								<VStack className="bg-red-100 p-2 rounded-full w-8 h-8 items-center justify-center">
									<Text className="text-red-600 font-bold text-sm">2</Text>
								</VStack>
								<VStack className="flex-1">
									<Text className="font-semibold text-gray-900">Instant Notifications</Text>
									<Text className="text-sm text-gray-600">
										Compatible donors within 10km radius are notified immediately
									</Text>
								</VStack>
							</HStack>

							<HStack className="items-start" space="sm">
								<VStack className="bg-red-100 p-2 rounded-full w-8 h-8 items-center justify-center">
									<Text className="text-red-600 font-bold text-sm">3</Text>
								</VStack>
								<VStack className="flex-1">
									<Text className="font-semibold text-gray-900">Direct Contact</Text>
									<Text className="text-sm text-gray-600">
										Donors can contact you directly to coordinate donation
									</Text>
								</VStack>
							</HStack>
						</VStack>
					</VStack>
				</Card>

				{/* Emergency Guidelines */}
				<Card className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl">
					<VStack className="space-y-3">
						<HStack className="items-center space-x-2">
							<Icon as={AlertTriangle} size="md" className="text-yellow-600" />
							<Text className="font-bold text-yellow-800">Emergency Guidelines</Text>
						</HStack>

						<VStack className="space-y-2 pl-1">
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">•</Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Only use for genuine emergencies requiring immediate blood donation
								</Text>
							</HStack>
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">•</Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Ensure all patient and hospital information is accurate
								</Text>
							</HStack>
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">•</Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Be prepared to verify your request when donors contact you
								</Text>
							</HStack>
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">•</Text>
								<Text className="text-sm text-yellow-700 flex-1">
									For non-urgent requests, use the regular request system
								</Text>
							</HStack>
						</VStack>
					</VStack>
				</Card>

				{/* Quick Actions */}
				<VStack space="sm" className="bg-white p-4 rounded-xl border border-gray-200">
					<Text className="text-lg font-semibold text-gray-900">Quick Actions</Text>

					<VStack space="md">
						<Button
							variant="outline"
							action="secondary"
							className="w-full border-red-300 bg-[#fffafa]"
							onPress={() => {
								// Navigate to find blood banks
								console.log("Finding nearby blood banks");
							}}
						>
							<Icon as={MapPin} size="sm" className="text-red-600 mr-3" />
							<ButtonText className="text-red-600 font-medium">Find Nearby Blood Banks</ButtonText>
						</Button>

						<Button
							variant="outline"
							action="secondary"
							className="w-full border-red-300 bg-[#fffafa]"
							onPress={() => {
								// Navigate to emergency contacts
								console.log("Viewing emergency contacts");
							}}
						>
							<Icon as={Phone} size="sm" className="text-red-600 mr-3" />
							<ButtonText className="text-red-600 font-medium">Emergency Helpline</ButtonText>
						</Button>

						<Button
							variant="outline"
							action="secondary"
							className="w-full border-red-300 bg-[#fffafa]"
							onPress={() => {
								// Navigate to request history
								console.log("Viewing request history");
							}}
						>
							<Icon as={Clock} size="sm" className="text-red-600 mr-3" />
							<ButtonText className="text-red-600 font-medium">My Request History</ButtonText>
						</Button>
					</VStack>
				</VStack>
			</VStack>

			<BloodRequestForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
		</>
	);
};

export default EmergencyRequest;
