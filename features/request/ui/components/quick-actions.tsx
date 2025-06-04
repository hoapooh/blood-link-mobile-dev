import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HeartIcon } from "lucide-react-native";
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

const QuickActions = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleCreateRequest = () => {
		setIsFormOpen(true);
	};

	const handleFormSubmit = (requestData: BloodRequestData) => {
		// Handle the form submission
		console.log("Emergency blood request submitted:", requestData);
		// Here you would typically send the data to your backend
		setIsFormOpen(false);
	};

	const handleFormClose = () => {
		setIsFormOpen(false);
	};

	return (
		<>
			<Card className="m-4 p-4 border border-outline-200 rounded-xl bg-gradient-to-r from-red-500 to-red-600 shadow-md">
				<VStack space="md">
					<HStack className="items-center" space="sm">
						<Icon as={HeartIcon} size="md" className="text-red-500" />
						<Text className="text-lg font-bold text-red-500">Need Blood Urgently?</Text>
					</HStack>

					<Text className="text-sm text-red-400 leading-5">
						Post a blood request and connect with donors in your area quickly and efficiently.
					</Text>

					<Button variant="solid" action="primary" className="mt-2" onPress={handleCreateRequest}>
						<Icon as={AddIcon} size="sm" className="text-white mr-2" />
						<ButtonText className="text-white font-semibold">Create Blood Request</ButtonText>
					</Button>
				</VStack>
			</Card>

			<BloodRequestForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
		</>
	);
};

export default QuickActions;
