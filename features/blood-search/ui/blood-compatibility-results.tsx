import { Divider } from "@/components/ui/divider";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
	BloodGroup,
	BloodRh,
	BloodTypeComponent,
	IBloodCompatibilityData,
} from "@/interfaces/blood";
import React from "react";
import BloodInfoCard from "./blood-info-card";
import BloodSearchSummary from "./blood-search-summary";

interface BloodCompatibilityResultsProps {
	compatibility: IBloodCompatibilityData | undefined;
	isLoading: boolean;
	selectedGroup: BloodGroup;
	selectedRh: BloodRh;
	selectedComponent: BloodTypeComponent;
}

const getComponentTypeLabel = (componentType: string) => {
	switch (componentType) {
		case "whole_blood":
			return "Toàn phần";
		case "red_cells":
			return "Hồng cầu";
		case "plasma":
			return "Huyết tương";
		case "platelets":
			return "Tiểu cầu";
		default:
			return componentType;
	}
};

const BloodCompatibilityResults: React.FC<BloodCompatibilityResultsProps> = ({
	compatibility,
	isLoading,
	selectedGroup,
	selectedRh,
	selectedComponent,
}) => {
	if (isLoading) {
		return (
			<VStack className="flex-1 justify-center items-center p-4">
				<Text className="text-lg">Đang tải thông tin tương thích...</Text>
				<Text className="text-sm text-gray-600 mt-2">Vui lòng chờ trong giây lát</Text>
			</VStack>
		);
	}
	if (!compatibility) {
		return (
			<VStack className="flex-1 justify-center items-center p-4">
				<Text className="text-lg text-red-600">Không thể tải thông tin</Text>
				<Text className="text-sm text-gray-600 mt-2">Vui lòng thử lại sau</Text>
			</VStack>
		);
	}

	// Additional safety check for the component properties
	if (!compatibility.compatibleDonors || !compatibility.compatibleRecipients) {
		return (
			<VStack className="flex-1 justify-center items-center p-4">
				<Text className="text-lg text-orange-600">Dữ liệu không đầy đủ</Text>
				<Text className="text-sm text-gray-600 mt-2">Vui lòng thử tìm kiếm lại</Text>
			</VStack>
		);
	}
	return (
		<VStack className="flex-1">
			<BloodSearchSummary group={selectedGroup} rh={selectedRh} componentType={selectedComponent} />
			<ScrollView className="flex-1">
				<VStack space="lg" className="p-4">
					{/* Header */}
					<Text className="text-xl font-bold text-center">
						Kết quả tương thích - {getComponentTypeLabel(compatibility.componentType)}
					</Text>

					{/* Compatible Donors Section */}
					<VStack space="md">
						<Text className="text-lg font-semibold text-green-700">
							Những nhóm máu có thể hiến <Text></Text>
							<Text>({compatibility.compatibleDonors?.length || 0} nhóm)</Text>
						</Text>
						<Text className="text-sm text-gray-600">
							Danh sách các nhóm máu có thể hiến <Text></Text>
							{getComponentTypeLabel(compatibility.componentType).toLowerCase()} cho bạn:
						</Text>
						{compatibility.compatibleDonors?.map((donor, index) => (
							<BloodInfoCard key={`donor-${index}`} bloodInfo={donor} />
						)) || <Text className="text-center text-gray-500">Không có dữ liệu</Text>}
					</VStack>
					<Divider className="my-6" />

					{/* Compatible Recipients Section */}
					<VStack space="md">
						<Text className="text-lg font-semibold text-blue-700">
							Những nhóm máu có thể nhận ({compatibility.compatibleRecipients?.length || 0} nhóm)
						</Text>
						<Text className="text-sm text-gray-600">
							Danh sách các nhóm máu có thể nhận <Text></Text>
							{getComponentTypeLabel(compatibility.componentType).toLowerCase()} từ bạn:
						</Text>
						{compatibility.compatibleRecipients?.map((recipient, index) => (
							<BloodInfoCard key={`recipient-${index}`} bloodInfo={recipient} />
						)) || <Text className="text-center text-gray-500">Không có dữ liệu</Text>}
					</VStack>
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default BloodCompatibilityResults;
