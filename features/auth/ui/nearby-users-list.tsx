import { ArrowLeft, Phone, User } from "lucide-react-native";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { ScrollView } from "@/components/ui/scroll-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IUserData } from "@/interfaces/user";

interface NearbyUsersListProps {
	users: IUserData[];
	isLoading: boolean;
	onViewOnMap: () => void;
	onBackToFilter: () => void;
}

const NearbyUsersList = ({
	users,
	isLoading,
	onViewOnMap,
	onBackToFilter,
}: NearbyUsersListProps) => {
	if (isLoading) {
		return (
			<VStack className="flex-1 justify-center items-center p-4">
				<Text className="text-lg">Đang tìm kiếm người hiến máu gần đây...</Text>
			</VStack>
		);
	}

	if (!users || users.length === 0) {
		return (
			<VStack className="flex-1 justify-center items-center p-4" space="xs">
				<Text className="text-lg text-gray-600 text-center">
					Không tìm thấy người hiến máu nào trong tiêu chí tìm kiếm của bạn
				</Text>
				<Text className="text-sm text-gray-500 text-center mt-2">
					Hãy thử mở rộng bán kính tìm kiếm hoặc chọn các nhóm máu khác
				</Text>
				<Button variant="outline" onPress={onBackToFilter} size="sm">
					<ButtonIcon as={ArrowLeft} />
					<ButtonText>Quay lại</ButtonText>
				</Button>
			</VStack>
		);
	}

	return (
		<VStack className="flex-1 bg-gray-50">
			{/* Header with Back and View on Map buttons */}
			<HStack className="bg-white p-4 justify-between items-center border-b border-gray-200">
				<Button variant="outline" onPress={onBackToFilter} size="sm">
					<ButtonIcon as={ArrowLeft} />
					<ButtonText>Quay lại</ButtonText>
				</Button>
				<Text className="text-lg font-semibold">Tìm thấy {users.length} người</Text>
			</HStack>

			<HStack className="px-4 pt-4">
				<Button onPress={onViewOnMap} className="w-full">
					<ButtonText>Xem trên bản đồ</ButtonText>
				</Button>
			</HStack>

			{/* Users List */}
			<ScrollView className="flex-1">
				<VStack className="p-4" space="md">
					{users.map((user) => (
						<Card key={user.id} className="p-4 bg-white shadow-sm rounded-lg">
							<VStack space="sm">
								{/* User Name */}
								<HStack className="items-center" space="sm">
									<User size={20} color="#6B7280" />
									<Text className="font-semibold text-lg">
										{user.firstName || user.lastName
											? `${user.firstName || ""} ${user.lastName || ""}`.trim()
											: "Anonymous Donor"}
									</Text>
								</HStack>

								{/* Phone Number */}
								{user.phone && (
									<HStack className="items-center" space="sm">
										<Phone size={18} color="#6B7280" />
										<Text className="text-gray-700">{user.phone}</Text>
									</HStack>
								)}

								{/* Blood Type */}
								<HStack className="items-center justify-between">
									<VStack>
										<Text className="text-sm text-gray-500">Nhóm máu</Text>
										<Text className="font-medium text-red-600">
											{user.bloodType.group}
											{user.bloodType.rh}
										</Text>
									</VStack>

									{/* Location Info */}
									{user.districtName && (
										<VStack className="items-end">
											<Text className="text-sm text-gray-500">Địa chỉ</Text>
											<Text className="text-sm text-gray-700">
												{user.districtName}
												{user.provinceName && `, ${user.provinceName}`}
											</Text>
										</VStack>
									)}
								</HStack>
							</VStack>
						</Card>
					))}
				</VStack>
			</ScrollView>
		</VStack>
	);
};

export default NearbyUsersList;
