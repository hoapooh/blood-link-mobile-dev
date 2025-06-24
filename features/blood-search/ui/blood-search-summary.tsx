import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import React from "react";

interface BloodSearchSummaryProps {
	group: BloodGroup;
	rh: BloodRh;
	componentType: BloodTypeComponent;
}

const BloodSearchSummary: React.FC<BloodSearchSummaryProps> = ({ group, rh, componentType }) => {
	const getComponentTypeLabel = (type: BloodTypeComponent) => {
		switch (type) {
			case BloodTypeComponent.WHOLE_BLOOD:
				return "Toàn phần";
			case BloodTypeComponent.RED_CELLS:
				return "Hồng cầu";
			case BloodTypeComponent.PLASMA:
				return "Huyết tương";
			case BloodTypeComponent.PLATELETS:
				return "Tiểu cầu";
			default:
				return type;
		}
	};

	return (
		<Card className="p-4 m-4 bg-red-50">
			<VStack space="sm">
				<Text className="font-semibold text-center">Thông tin tìm kiếm</Text>
				<HStack className="justify-center items-start" space="md">
					<VStack className="items-center">
						<Text className="text-sm text-gray-600">Nhóm máu</Text>
						<Badge variant="solid" className="bg-red-600">
							<BadgeText className="text-white font-bold text-lg">
								{group}
								{rh}
							</BadgeText>
						</Badge>
					</VStack>
					<VStack className="items-center" space="sm">
						<Text className="text-sm text-gray-600">Thành phần</Text>
						<Badge variant="outline">
							<BadgeText>{getComponentTypeLabel(componentType)}</BadgeText>
						</Badge>
					</VStack>
				</HStack>
			</VStack>
		</Card>
	);
};

export default BloodSearchSummary;
