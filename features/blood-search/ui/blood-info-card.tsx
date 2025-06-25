import { Badge, BadgeText } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IBloodInfoData } from "@/interfaces/blood";
import React from "react";

interface BloodInfoCardProps {
	bloodInfo: IBloodInfoData;
}

const BloodInfoCard: React.FC<BloodInfoCardProps> = ({ bloodInfo }) => {
	return (
		<Card className="p-4 m-2">
			<VStack space="sm">
				{/* Blood Type Header */}
				<HStack className="items-center justify-between">
					<HStack className="items-center" space="sm">
						<Text className="text-2xl font-bold text-red-600">
							{bloodInfo.group}
							{bloodInfo.rh}
						</Text>
						<Badge variant="outline">
							<BadgeText>{bloodInfo.frequency}</BadgeText>
						</Badge>
					</HStack>
				</HStack>

				<Divider />

				{/* Description */}
				<VStack space="xs">
					<Text className="font-semibold">Mô tả:</Text>
					<Text className="text-sm text-gray-600">{bloodInfo.description}</Text>
				</VStack>

				{/* Characteristics */}
				<VStack space="xs">
					<Text className="font-semibold">Đặc điểm:</Text>
					<Text className="text-sm text-gray-600">{bloodInfo.characteristics}</Text>
				</VStack>

				{/* Can Donate To */}
				<VStack space="xs">
					<Text className="font-semibold">Có thể hiến cho:</Text>
					<Text className="text-sm text-green-600">{bloodInfo.canDonateTo}</Text>
				</VStack>

				{/* Can Receive From */}
				<VStack space="xs">
					<Text className="font-semibold">Có thể nhận từ:</Text>
					<Text className="text-sm text-blue-600">{bloodInfo.canReceiveFrom}</Text>
				</VStack>

				{/* Special Notes */}
				{bloodInfo.specialNotes && (
					<VStack space="xs">
						<Text className="font-semibold">Ghi chú đặc biệt:</Text>
						<Text className="text-sm text-orange-600 italic">{bloodInfo.specialNotes}</Text>
					</VStack>
				)}
			</VStack>
		</Card>
	);
};

export default BloodInfoCard;
