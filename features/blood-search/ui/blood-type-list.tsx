import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh, IBloodInfoData } from "@/interfaces/blood";
import { Search } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import BloodTypeCard from "./blood-type-card";

interface BloodTypeListProps {
	bloodTypes: IBloodInfoData[];
	isLoading: boolean;
	onViewDetails: (group: BloodGroup, rh: BloodRh) => void;
}

const BloodTypeList: React.FC<BloodTypeListProps> = ({ bloodTypes, isLoading, onViewDetails }) => {
	const [searchQuery, setSearchQuery] = useState("");

	// Filter blood types based on search query
	const filteredBloodTypes = bloodTypes.filter((bloodType) => {
		const searchTerm = searchQuery.toLowerCase();
		const bloodTypeString = `${bloodType.group}${bloodType.rh}`.toLowerCase();
		return (
			bloodTypeString.includes(searchTerm) || bloodType.frequency.toLowerCase().includes(searchTerm)
		);
	});

	// Sort blood types in standard order: O+, O-, A+, A-, B+, B-, AB+, AB-
	const sortedBloodTypes = filteredBloodTypes.sort((a, b) => {
		const order = ["O", "A", "B", "AB"];
		const groupOrder = order.indexOf(a.group) - order.indexOf(b.group);
		if (groupOrder !== 0) return groupOrder;
		// If same group, positive comes before negative
		return a.rh === "+" ? -1 : 1;
	});

	if (isLoading) {
		return (
			<VStack className="flex-1 justify-center items-center p-4">
				<Text className="text-lg">Đang tải thông tin nhóm máu...</Text>
				<Text className="text-sm text-gray-600 mt-2">Vui lòng chờ trong giây lát</Text>
			</VStack>
		);
	}

	return (
		<VStack className="flex-1 bg-gray-50">
			{/* Header */}
			<VStack className="bg-white p-6 pb-6 shadow-sm" space="lg">
				<Text className="text-2xl font-bold text-center text-gray-800">Thông tin nhóm máu</Text>

				{/* Search Input with Button */}
				<HStack space="sm" className="items-center">
					<Input className="bg-gray-50 border-gray-200 flex-1 rounded-lg">
						<InputSlot className="pl-3">
							<InputIcon as={Search} className="text-gray-400" size="md" />
						</InputSlot>
						<InputField
							placeholder="Tìm kiếm loại máu (A+, 0+, v.v)"
							value={searchQuery}
							onChangeText={setSearchQuery}
							className="text-gray-700 pl-2"
						/>
					</Input>
					<Button className="bg-red-500 rounded-lg">
						<ButtonText className="text-white font-semibold">Tìm kiếm</ButtonText>
					</Button>
				</HStack>
			</VStack>

			{/* Blood Type Grid */}
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<View className="flex-1 p-4">
					<View className="flex-row flex-wrap justify-between">
						{sortedBloodTypes.map((bloodType) => (
							<View key={`${bloodType.group}${bloodType.rh}`} className="w-1/2">
								<BloodTypeCard bloodInfo={bloodType} onViewDetails={onViewDetails} />
							</View>
						))}
					</View>
				</View>
			</ScrollView>

			{filteredBloodTypes.length === 0 && !isLoading && (
				<VStack className="flex-1 justify-center items-center p-4">
					<Text className="text-lg text-gray-600">Không tìm thấy nhóm máu</Text>
					<Text className="text-sm text-gray-500 mt-2">Thử tìm kiếm với từ khóa khác</Text>
				</VStack>
			)}
		</VStack>
	);
};

export default BloodTypeList;
