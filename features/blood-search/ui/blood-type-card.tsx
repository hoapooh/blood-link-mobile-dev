import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh, IBloodInfoData } from "@/interfaces/blood";
import React from "react";

interface BloodTypeCardProps {
	bloodInfo: IBloodInfoData;
	onViewDetails: (group: BloodGroup, rh: BloodRh) => void;
}

const BloodTypeCard: React.FC<BloodTypeCardProps> = ({ bloodInfo, onViewDetails }) => {
	const getCardColor = (group: BloodGroup, rh: BloodRh) => {
		if (group === BloodGroup.O) {
			return rh === BloodRh.POSITIVE ? "bg-red-100 border-red-200" : "bg-red-50 border-red-150";
		}
		if (group === BloodGroup.A) {
			return rh === BloodRh.POSITIVE ? "bg-blue-100 border-blue-200" : "bg-blue-50 border-blue-150";
		}
		if (group === BloodGroup.B) {
			return rh === BloodRh.POSITIVE
				? "bg-green-100 border-green-200"
				: "bg-green-50 border-green-150";
		}
		if (group === BloodGroup.AB) {
			return rh === BloodRh.POSITIVE
				? "bg-purple-100 border-purple-200"
				: "bg-purple-50 border-purple-150";
		}
		return "bg-gray-50 border-gray-200";
	};

	const getBadgeColor = (rh: BloodRh) => {
		return rh === BloodRh.POSITIVE ? "bg-red-500" : "bg-gray-600";
	};

	const getBadgeText = (rh: BloodRh) => {
		return rh === BloodRh.POSITIVE ? "Dương tính" : "Âm tính";
	};

	return (
		<Card className={`p-4 m-2 rounded-xl shadow-sm ${getCardColor(bloodInfo.group, bloodInfo.rh)}`}>
			<VStack space="md" className="flex-1">
				{/* Blood Type Header */}
				<VStack className="items-center" space="sm">
					<Text className="text-3xl font-bold text-gray-800">
						{bloodInfo.group}
						{bloodInfo.rh}
					</Text>
					<Badge className={`${getBadgeColor(bloodInfo.rh)} rounded-full px-3`}>
						<BadgeText className="text-white font-semibold text-xs">
							{getBadgeText(bloodInfo.rh)}
						</BadgeText>
					</Badge>
				</VStack>

				{/* Frequency */}
				<Text className="text-center text-gray-600 font-medium text-sm">{bloodInfo.frequency}</Text>

				{/* Spacer to push button to bottom */}
				{/* <VStack className="flex-1" /> */}

				{/* View Details Button */}
				<Button
					variant="solid"
					className="bg-white border border-gray-300 rounded-lg"
					onPress={() => onViewDetails(bloodInfo.group, bloodInfo.rh)}
				>
					<ButtonText className="text-gray-700 font-semibold text-sm">Xem chi tiết</ButtonText>
				</Button>
			</VStack>
		</Card>
	);
};

export default BloodTypeCard;
