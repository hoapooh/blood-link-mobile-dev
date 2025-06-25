import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh, IBloodInfoData } from "@/interfaces/blood";
import { ArrowLeft } from "lucide-react-native";
import React from "react";

interface BloodTypeDetailViewProps {
	bloodInfo: IBloodInfoData;
	onBack: () => void;
	onCompatibilityCheck: (group: BloodGroup, rh: BloodRh) => void;
}

const BloodTypeDetailView: React.FC<BloodTypeDetailViewProps> = ({
	bloodInfo,
	onBack,
	onCompatibilityCheck,
}) => {
	const getCardColor = (group: BloodGroup, rh: BloodRh) => {
		if (group === BloodGroup.O) {
			return rh === BloodRh.POSITIVE ? "bg-red-50 border-red-200" : "bg-red-100 border-red-300";
		}
		if (group === BloodGroup.A) {
			return rh === BloodRh.POSITIVE ? "bg-blue-50 border-blue-200" : "bg-blue-100 border-blue-300";
		}
		if (group === BloodGroup.B) {
			return rh === BloodRh.POSITIVE
				? "bg-green-50 border-green-200"
				: "bg-green-100 border-green-300";
		}
		if (group === BloodGroup.AB) {
			return rh === BloodRh.POSITIVE
				? "bg-purple-50 border-purple-200"
				: "bg-purple-100 border-purple-300";
		}
		return "bg-gray-50 border-gray-200";
	};

	const getTextColor = (group: BloodGroup) => {
		if (group === BloodGroup.O) return "text-red-600";
		if (group === BloodGroup.A) return "text-blue-600";
		if (group === BloodGroup.B) return "text-green-600";
		if (group === BloodGroup.AB) return "text-purple-600";
		return "text-gray-600";
	};

	return (
		<VStack className="flex-1 bg-gray-50">
			{/* Header */}
			<HStack className="bg-white p-4 justify-between items-center">
				<Button variant="outline" onPress={onBack} className="flex-row items-center">
					<ButtonIcon as={ArrowLeft} />
					<ButtonText>Quay lại</ButtonText>
				</Button>
			</HStack>

			<ScrollView className="flex-1">
				<VStack className="p-4" space="lg">
					{/* Blood Type Header Card */}
					<Card className={`p-6 ${getCardColor(bloodInfo.group, bloodInfo.rh)}`}>
						<VStack className="items-center" space="md">
							<Text className={`text-3xl font-bold text-center ${getTextColor(bloodInfo.group)}`}>
								{bloodInfo.group}
								{bloodInfo.rh}
							</Text>
							<Badge className="bg-gray-600">
								<BadgeText className="text-white font-semibold">{bloodInfo.frequency}</BadgeText>
							</Badge>
						</VStack>
					</Card>

					{/* Navigation Tabs */}
					<VStack className="bg-white rounded-lg p-2" space="sm">
						<Button variant="solid" className="flex-1 bg-red-600">
							<ButtonText className="text-white">Thông tin chung</ButtonText>
						</Button>
						<Button
							variant="outline"
							className="flex-1"
							onPress={() => onCompatibilityCheck(bloodInfo.group, bloodInfo.rh)}
						>
							<ButtonText>Khả năng tương thích</ButtonText>
						</Button>
					</VStack>

					{/* Information Cards */}
					<VStack space="lg">
						{/* Description */}
						<Card className="p-6 bg-white">
							<VStack space="md">
								<Text className="text-xl font-bold text-gray-800">Mô tả</Text>
								<Text className="text-gray-600 leading-6">{bloodInfo.description}</Text>
							</VStack>
						</Card>

						{/* Characteristics */}
						<Card className="p-6 bg-white">
							<VStack space="md">
								<Text className="text-xl font-bold text-gray-800">Đặc điểm</Text>
								<Text className="text-gray-600 leading-6">{bloodInfo.characteristics}</Text>
							</VStack>
						</Card>

						{/* Blood Type Information Table */}
						<Card className="p-6 bg-white">
							<VStack space="md">
								<Text className="text-xl font-bold text-center text-gray-800">
									Thông tin nhóm máu {bloodInfo.group}
									{bloodInfo.rh}
								</Text>
								<Divider />

								<VStack space="sm">
									<HStack className="justify-between items-center py-2">
										<Text className="font-semibold text-gray-700">Tần suất</Text>
										<Text className="text-gray-600">{bloodInfo.frequency}</Text>
									</HStack>
									<Divider />

									<VStack space="xs" className="py-2">
										<Text className="font-semibold text-gray-700">Có thể hiến cho</Text>
										<Text className="text-green-600">{bloodInfo.canDonateTo}</Text>
									</VStack>
									<Divider />

									<VStack space="xs" className="py-2">
										<Text className="font-semibold text-gray-700">Có thể nhận từ</Text>
										<Text className="text-blue-600">{bloodInfo.canReceiveFrom}</Text>
									</VStack>

									{bloodInfo.specialNotes && (
										<>
											<Divider />
											<VStack space="xs" className="py-2">
												<Text className="font-semibold text-gray-700">Ghi chú đặc biệt</Text>
												<Text className="text-orange-600">{bloodInfo.specialNotes}</Text>
											</VStack>
										</>
									)}
								</VStack>
							</VStack>
						</Card>
					</VStack>
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default BloodTypeDetailView;
