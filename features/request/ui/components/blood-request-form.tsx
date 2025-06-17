import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/components/ui/modal";
import {
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectIcon,
	SelectInput,
	SelectItem,
	SelectPortal,
	SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { ChevronDown, HeartIcon, X } from "lucide-react-native";
import React, { useState } from "react";

interface BloodRequestFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (requestData: BloodRequestData) => void;
}

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

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({ isOpen, onClose, onSubmit }) => {
	const [formData, setFormData] = useState<BloodRequestData>({
		bloodType: "",
		unitsNeeded: "",
		urgencyLevel: "",
		patientName: "",
		contactNumber: "",
		hospitalName: "",
		hospitalAddress: "",
		additionalNotes: "",
	});

	const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
	const urgencyLevels = ["Critical (0-2 hours)", "Urgent (2-6 hours)", "Routine (6-24 hours)"];

	const handleInputChange = (field: keyof BloodRequestData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = () => {
		// Validate required fields
		const requiredFields = [
			"bloodType",
			"unitsNeeded",
			"urgencyLevel",
			"patientName",
			"contactNumber",
			"hospitalName",
		];
		const missingFields = requiredFields.filter(
			(field) => !formData[field as keyof BloodRequestData]
		);

		if (missingFields.length > 0) {
			// Handle validation error
			console.log("Missing required fields:", missingFields);
			return;
		}

		onSubmit(formData);
		handleClose();
	};

	const handleClose = () => {
		setFormData({
			bloodType: "",
			unitsNeeded: "",
			urgencyLevel: "",
			patientName: "",
			contactNumber: "",
			hospitalName: "",
			hospitalAddress: "",
			additionalNotes: "",
		});
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} size="lg">
			<ModalBackdrop />
			<ModalContent className="bg-[#fffafa] max-w-md mx-4">
				<ModalHeader className="pb-4">
					<HStack className="items-center justify-between w-full">
						<HStack className="items-center space-x-3">
							<Icon as={HeartIcon} size="lg" className="text-red-500" />
							<Text className="text-xl font-bold text-gray-900">Emergency Blood Request</Text>
						</HStack>
						<Button
							variant="outline"
							size="sm"
							className="border-0 bg-transparent"
							onPress={handleClose}
						>
							<Icon as={X} size="md" className="text-gray-500" />
						</Button>
					</HStack>
				</ModalHeader>

				<ModalBody className="py-0">
					<VStack className="space-y-5">
						{/* Critical Information Card */}
						<Card className="p-4 bg-red-50 border border-red-200 rounded-xl">
							<VStack className="space-y-3">
								<HStack className="space-x-4">
									<VStack className="flex-1">
										<Text className="text-sm font-medium text-gray-700 mb-2">Blood Type *</Text>
										<Select onValueChange={(value) => handleInputChange("bloodType", value)}>
											<SelectTrigger className="border border-gray-300 bg-white">
												<SelectInput placeholder="Select blood type" className="text-gray-900" />
												<SelectIcon as={ChevronDown} className="text-gray-500" />
											</SelectTrigger>
											<SelectPortal>
												<SelectBackdrop />
												<SelectContent className="bg-white">
													<SelectDragIndicatorWrapper>
														<SelectDragIndicator />
													</SelectDragIndicatorWrapper>
													{bloodTypes.map((type) => (
														<SelectItem key={type} label={type} value={type} />
													))}
												</SelectContent>
											</SelectPortal>
										</Select>
									</VStack>

									<VStack className="flex-1">
										<Text className="text-sm font-medium text-gray-700 mb-2">Units Needed *</Text>
										<Input className="border border-gray-300 bg-white">
											<InputField
												placeholder="e.g. 2"
												value={formData.unitsNeeded}
												onChangeText={(value) => handleInputChange("unitsNeeded", value)}
												keyboardType="numeric"
												className="text-gray-900"
											/>
										</Input>
									</VStack>
								</HStack>

								<VStack>
									<Text className="text-sm font-medium text-gray-700 mb-2">Urgency Level *</Text>
									<Select onValueChange={(value) => handleInputChange("urgencyLevel", value)}>
										<SelectTrigger className="border border-gray-300 bg-white">
											<SelectInput placeholder="Select urgency level" className="text-gray-900" />
											<SelectIcon as={ChevronDown} className="text-gray-500" />
										</SelectTrigger>
										<SelectPortal>
											<SelectBackdrop />
											<SelectContent className="bg-white">
												<SelectDragIndicatorWrapper>
													<SelectDragIndicator />
												</SelectDragIndicatorWrapper>
												{urgencyLevels.map((level) => (
													<SelectItem key={level} label={level} value={level} />
												))}
											</SelectContent>
										</SelectPortal>
									</Select>
								</VStack>
							</VStack>
						</Card>

						{/* Patient Information */}
						<VStack className="space-y-4">
							<Text className="text-lg font-semibold text-gray-900">Patient Information</Text>

							<VStack className="space-y-1">
								<Text className="text-sm font-medium text-gray-700">Patient Name *</Text>
								<Input className="border border-gray-300 bg-white">
									<InputField
										placeholder="Enter patient name"
										value={formData.patientName}
										onChangeText={(value) => handleInputChange("patientName", value)}
										className="text-gray-900"
									/>
								</Input>
							</VStack>

							<VStack className="space-y-1">
								<Text className="text-sm font-medium text-gray-700">Contact Number *</Text>
								<Input className="border border-gray-300 bg-white">
									<InputField
										placeholder="Enter contact number"
										value={formData.contactNumber}
										onChangeText={(value) => handleInputChange("contactNumber", value)}
										keyboardType="phone-pad"
										className="text-gray-900"
									/>
								</Input>
							</VStack>
						</VStack>

						{/* Hospital Information */}
						<VStack className="space-y-4">
							<Text className="text-lg font-semibold text-gray-900">Hospital Information</Text>

							<VStack className="space-y-1">
								<Text className="text-sm font-medium text-gray-700">Hospital/Clinic Name *</Text>
								<Input className="border border-gray-300 bg-white">
									<InputField
										placeholder="Enter hospital name"
										value={formData.hospitalName}
										onChangeText={(value) => handleInputChange("hospitalName", value)}
										className="text-gray-900"
									/>
								</Input>
							</VStack>

							<VStack className="space-y-1">
								<Text className="text-sm font-medium text-gray-700">Hospital Address</Text>
								<Textarea className="border border-gray-300 bg-white">
									<TextareaInput
										placeholder="Enter hospital address"
										value={formData.hospitalAddress}
										onChangeText={(value) => handleInputChange("hospitalAddress", value)}
										className="text-gray-900"
									/>
								</Textarea>
							</VStack>
						</VStack>

						{/* Additional Notes */}
						<VStack className="space-y-1">
							<Text className="text-sm font-medium text-gray-700">Additional Notes</Text>
							<Textarea className="border border-gray-300 bg-white">
								<TextareaInput
									placeholder="Any additional information that might help donors..."
									value={formData.additionalNotes}
									onChangeText={(value) => handleInputChange("additionalNotes", value)}
									numberOfLines={3}
									className="text-gray-900"
								/>
							</Textarea>
						</VStack>

						{/* Disclaimer */}
						<Card className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
							<Text className="text-xs text-yellow-800 leading-relaxed">
								⚠️ This is an emergency request system. Please ensure all information is accurate.
								Donors will be notified immediately and may contact you directly.
							</Text>
						</Card>
					</VStack>
				</ModalBody>

				<ModalFooter className="pt-6">
					<HStack className="space-x-3 w-full">
						<Button
							variant="outline"
							action="secondary"
							className="flex-1 border-gray-300"
							onPress={handleClose}
						>
							<ButtonText className="text-gray-700">Cancel</ButtonText>
						</Button>

						<Button
							variant="solid"
							action="primary"
							className="flex-1 bg-red-500"
							onPress={handleSubmit}
						>
							<Icon as={HeartIcon} size="sm" className="text-white mr-2" />
							<ButtonText className="text-white font-semibold">Send Emergency Request</ButtonText>
						</Button>
					</HStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default BloodRequestForm;
