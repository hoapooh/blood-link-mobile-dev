import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useCreateEmergencyRequest } from "@/features/request/hooks";
import { CreateEmergencyRequestDto } from "@/interfaces/create-emergency-request";
import { AlertTriangle, HeartIcon, MapPin, Phone, Zap } from "lucide-react-native";
import React, { useState } from "react";
import BloodRequestForm from "./blood-request-form";

const EmergencyRequest = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { createRequestAsync, isLoading } = useCreateEmergencyRequest();
	const toast = useToast();

	const validateEmergencyRequest = (requestData: CreateEmergencyRequestDto): string | null => {
		// Required field validation
		if (!requestData.requiredVolume || requestData.requiredVolume < 1) {
			return "Thể tích máu phải ít nhất là 1ml";
		}

		if (requestData.requiredVolume > 5000) {
			return "Thể tích máu không thể vượt quá 5000ml";
		}

		if (!requestData.bloodGroup) {
			return "Vui lòng chọn nhóm máu";
		}

		if (!requestData.bloodRh) {
			return "Vui lòng chọn yếu tố Rh";
		}

		if (requestData.description && requestData.description.trim().length < 10) {
			return "Mô tả phải có ít nhất 10 ký tự";
		}

		return null;
	};

	const handleEmergencyRequest = () => {
		setIsFormOpen(true);
	};

	const handleFormSubmit = async (requestData: CreateEmergencyRequestDto) => {
		// Client-side validation
		const validationError = validateEmergencyRequest(requestData);
		if (validationError) {
			toast.show({
				placement: "top",
				render: ({ id }) => (
					<Toast nativeID={`toast-${id}`} action="error" variant="outline">
						<ToastTitle>Lỗi xác thực</ToastTitle>
						<ToastDescription>{validationError}</ToastDescription>
					</Toast>
				),
			});
			return;
		}

		try {
			await createRequestAsync(requestData);
			
			// Success notification
			toast.show({
				placement: "top",
				render: ({ id }) => (
					<Toast nativeID={`toast-${id}`} action="success" variant="outline">
						<ToastTitle>Thành công!</ToastTitle>
						<ToastDescription>
							Yêu cầu máu khẩn cấp đã được gửi thành công. Chúng tôi sẽ liên lạc ngay lập tức.
						</ToastDescription>
					</Toast>
				),
			});

			setIsFormOpen(false);
		} catch (error) {
			// Error notification
			const errorMessage = error instanceof Error ? error.message : "Có lỗi xảy ra khi gửi yêu cầu";
			
			toast.show({
				placement: "top",
				render: ({ id }) => (
					<Toast nativeID={`toast-${id}`} action="error" variant="outline">
						<ToastTitle>Gửi yêu cầu thất bại</ToastTitle>
						<ToastDescription>{errorMessage}</ToastDescription>
					</Toast>
				),
			});
		}
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
								Yêu cầu máu khẩn cấp
							</Text>
							<Text className="text-red-400 text-center leading-5">
								Gửi yêu cầu ngay lập tức đến những người hiến máu có sẵn trong khu vực của bạn. 
							</Text>
						</VStack>

						<Button variant="solid" className="w-full mt-4" onPress={handleEmergencyRequest}>
							<Icon as={Zap} size="sm" className="text-white mr-2" />
							<ButtonText className="text-white font-bold text-lg">
								Gửi yêu cầu khẩn cấp
							</ButtonText>
						</Button>
					</VStack>
				</Card>

				{/* How It Works */}
				<Card className="p-4 bg-[#fffafa] border border-red-200 rounded-xl">
					<VStack space="sm">
						<Text className="text-lg font-bold text-gray-900 text-center">
							Cách thức hoạt động
						</Text>

						<VStack space="md">
							<HStack className="items-start" space="sm">
								<VStack className="bg-red-100 p-2 rounded-full w-8 h-8 items-center justify-center">
									<Text className="text-red-600 font-bold text-sm">1</Text>
								</VStack>

								<VStack className="flex-1">
									<Text className="font-semibold text-gray-900">Gửi yêu cầu</Text>
									<Text className="text-sm text-gray-600">
										Cung cấp thông tin nhóm máu, số lượng máu cần
									</Text>
								</VStack>
							</HStack>

							<HStack className="items-start" space="sm">
								<VStack className="bg-red-100 p-2 rounded-full w-8 h-8 items-center justify-center">
									<Text className="text-red-600 font-bold text-sm">2</Text>
								</VStack>
								<VStack className="flex-1">
									<Text className="font-semibold text-gray-900">Kiểm tra tức thì</Text>
									<Text className="text-sm text-gray-600">
										Loại máu phù hợp sẽ được kiểm tra trong ngân hàng máu ngay lập tức
									</Text>
								</VStack>
							</HStack>

							<HStack className="items-start" space="sm">
								<VStack className="bg-red-100 p-2 rounded-full w-8 h-8 items-center justify-center">
									<Text className="text-red-600 font-bold text-sm">3</Text>
								</VStack>
								<VStack className="flex-1">
									<Text className="font-semibold text-gray-900">Liên hệ trực tiếp</Text>
									<Text className="text-sm text-gray-600">
										Người hiến máu có thể liên hệ trực tiếp với bạn để phối hợp việc hiến máu
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
							<Icon as={AlertTriangle} size="md" className="text-yellow-600 mr-2" />
							<Text className="font-bold text-yellow-800">Hướng dẫn</Text>
						</HStack>

						<VStack className="space-y-2 pl-1">
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">• </Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Chỉ sử dụng cho những trường hợp khẩn cấp thực sự cần hiến máu ngay lập tức
								</Text>
							</HStack>
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">• </Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Đảm bảo tất cả thông tin bệnh nhân và bệnh viện đều chính xác
								</Text>
							</HStack>
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">• </Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Sẵn sàng xác minh yêu cầu của bạn khi người hiến máu liên hệ
								</Text>
							</HStack>
							<HStack className="items-start space-x-2">
								<Text className="text-yellow-700 text-sm">• </Text>
								<Text className="text-sm text-yellow-700 flex-1">
									Chúng tôi sẽ từ chối yêu cầu của bạn nếu phát hiện có hành vi lạm dụng hoặc gian lận
								</Text>
							</HStack>
						</VStack>
					</VStack>
				</Card>

				{/* Quick Actions */}
				<VStack space="sm" className="bg-white p-4 rounded-xl border border-gray-200">
					<Text className="text-lg font-semibold text-gray-900">Liên hệ ngay</Text>

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
							<ButtonText className="text-red-600 font-medium">Tìm ngân hàng máu gần đây</ButtonText>
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
							<ButtonText className="text-red-600 font-medium">Đường dây nóng khẩn cấp</ButtonText>
						</Button>

					</VStack>
				</VStack>
			</VStack>

			<BloodRequestForm 
				isOpen={isFormOpen} 
				onClose={handleFormClose} 
				onSubmit={handleFormSubmit}
				isLoading={isLoading}
			/>
		</>
	);
};

export default EmergencyRequest;
