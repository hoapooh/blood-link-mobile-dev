import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import {
	AlertCircleIcon,
	CalendarDaysIcon,
	CheckCircleIcon,
	ClockIcon,
	Icon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetEmergencyRequests } from "@/features/request/hooks";
import { IBloodType } from "@/interfaces/emergency-request";
import { AlertTriangle, X } from "lucide-react-native";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

const MyRequests = () => {
	const { emergencyRequests, isLoading, isError, error, refetch } = useGetEmergencyRequests();

	const getStatusInfo = (status: string) => {
		switch (status) {
			case "approved":
				return {
					color: "bg-success-500",
					textColor: "text-success-600",
					icon: CheckCircleIcon,
					iconColor: "text-success-500",
				};
			case "pending":
				return {
					color: "bg-warning-500",
					textColor: "text-warning-600",
					icon: AlertCircleIcon,
					iconColor: "text-warning-500",
				};
			case "rejected":
				return {
					color: "bg-error-500",
					textColor: "text-error-600",
					icon: X,
					iconColor: "text-error-500",
				};
			default:
				return {
					color: "bg-background-500",
					textColor: "text-typography-600",
					icon: ClockIcon,
					iconColor: "text-typography-500",
				};
		}
	};

	const formatDate = (dateString: string | null) => {
		if (!dateString) return "Not scheduled";
		const date = new Date(dateString);
		return date.toLocaleDateString("vi-VN", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		});
	};

	const getBloodTypeComponentDisplay = (component: string) => {
		switch (component) {
			case "whole_blood":
				return "Máu toàn phần";
			case "plasma":
				return "Huyết tương";
			case "red_cells":
				return "Hồng cầu";
			case "platelets":
				return "Tiểu cầu";
			default:
				return component.replace(/_/g, ' ');
		}
	};

	const getBloodTypeDisplay = (bloodType: IBloodType) => {
		if (bloodType && bloodType.group && bloodType.rh) {
			return `${bloodType.group}${bloodType.rh}`;
		}
		return "N/A";
	};

	

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center py-8">
				<ActivityIndicator size="large" color="#ef4444" />
				<Text className="text-typography-600 mt-4">Đang tải yêu cầu khẩn cấp...</Text>
			</View>
		);
	}

	if (isError) {
		return (
			<View className="flex-1 items-center justify-center bg-background-50 px-6">
				<Text className="text-red-500 text-center mb-4">
					{error instanceof Error
						? error.message
						: "Không thể tải yêu cầu khẩn cấp"}
				</Text>
				<TouchableOpacity
					onPress={() => refetch()}
					className="bg-red-500 px-6 py-3 rounded-lg"
				>
					<Text className="text-white font-semibold">Thử lại</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<VStack className="p-4" space="xl">
			<Text className="text-lg font-semibold text-typography-900 mb-2">Yêu cầu khẩn cấp của tôi</Text>
			{emergencyRequests.map((request) => {
				const statusInfo = getStatusInfo(request.status);
				const bloodTypeDisplay = getBloodTypeDisplay(request.bloodType);
				const bloodTypeComponentDisplay = getBloodTypeComponentDisplay(request.bloodTypeComponent);

				return (
					<Card
						key={request.id}
						className="p-4 border border-outline-200 rounded-xl bg-white shadow-sm"
					>
						<VStack space="md">

							{/* Header with blood type and status */}
							<HStack className="justify-between items-center">
								<HStack className="items-center" space="md">
									<VStack className="bg-red-50 rounded-full items-center justify-center w-12 h-12 shrink-0">
										<Text className="text-red-600 font-bold text-lg">{bloodTypeDisplay}</Text>
									</VStack>
									<VStack>
										<Text className="font-semibold text-typography-900">
											{bloodTypeComponentDisplay}
										</Text>
										<Text className="text-sm text-typography-600">
											Cần {request.requiredVolume}ml
										</Text>
									</VStack>
								</HStack>

								<VStack className="items-end">
									<Badge className={`${statusInfo.color} px-3 py-1 rounded-full mb-1`}>
										<BadgeText className="text-white font-medium text-xs capitalize">
											{request.status === "pending" ? "Đang chờ" : 
											 request.status === "approved" ? "Đã duyệt" : 
											 request.status === "rejected" ? "Bị từ chối" : request.status}
										</BadgeText>
									</Badge>
									<Icon as={statusInfo.icon} size="sm" className={statusInfo.iconColor} />
								</VStack>
							</HStack>

							{/* Start date */}
							<VStack space="sm">
								<HStack className="items-center" space="sm">
									<Icon as={CalendarDaysIcon} size="sm" className="text-typography-500" />
									<Text className="text-sm text-typography-600">
										Ngày gửi yêu cầu: {formatDate(request.startDate)}
									</Text>
								</HStack>
							</VStack>

							{/* Description */}
							{request.description && (
								<VStack className="bg-background-50 p-3 rounded-lg">
									<Text className="text-sm font-medium text-typography-700 mb-1">Mô tả:</Text>
									<Text className="text-sm text-typography-600">
										{request.description}
									</Text>
								</VStack>
							)}

							{/* Rejection reason */}
							{request.rejectionReason && request.status === "rejected" && (
								<VStack className="bg-error-50 p-3 rounded-lg">
									<Text className="text-sm font-medium text-error-700 mb-1">Lý do từ chối:</Text>
									<Text className="text-sm text-error-600">
										{request.rejectionReason}
									</Text>
								</VStack>
							)}

							{/* Action buttons based on status */}
							{request.status === "pending" && (
								<HStack className="pt-2" space="md">
									<Button
										variant="outline"
										action="primary"
										className="flex-1"
										onPress={() => {
											// Handle view details action
											console.log("Viewing details for request:", request.id);
										}}
									>
										<ButtonText>Xem chi tiết</ButtonText>
									</Button>
								</HStack>
							)}

							{request.status === "approved" && (
								<VStack className="pt-2" space="sm">
									<Button
										variant="solid"
										action="primary"
										className="w-full bg-green-500"
										onPress={() => {
											// Handle view collection details
											console.log("Viewing collection details for request:", request.id);
										}}
									>
										<ButtonText className="text-white">Xem chi tiết thu thập</ButtonText>
									</Button>
								</VStack>
							)}

							{request.status === "rejected" && (
								<Button
									variant="outline"
									action="secondary"
									className="w-full"
									onPress={() => {
										// Handle create new request
										console.log("Creating new request similar to:", request.id);
									}}
								>
									<ButtonText>Tạo yêu cầu mới</ButtonText>
								</Button>
							)}
						</VStack>
					</Card>
				);
			})}

			{/* Empty state if no requests */}
			{emergencyRequests.length === 0 && (
				<VStack className="items-center justify-center py-12 space-y-3">
					<VStack className="bg-red-50 p-6 rounded-full">
						<Icon as={AlertTriangle} size="xl" className="text-red-400" />
					</VStack>
					<Text className="text-lg font-medium text-typography-600">Không tìm thấy yêu cầu khẩn cấp</Text>
					<Text className="text-sm text-typography-500 text-center max-w-xs">
						Các yêu cầu máu khẩn cấp của bạn sẽ xuất hiện ở đây. Tạo yêu cầu mới nếu bạn cần hỗ trợ máu khẩn cấp.
					</Text>
					<Button 
						variant="outline" 
						action="primary" 
						className="mt-4"
						onPress={() => {
							// Navigate to create emergency request
							console.log("Navigate to create emergency request");
						}}
					>
						<ButtonText>Tạo yêu cầu khẩn cấp</ButtonText>
					</Button>
				</VStack>
			)}
		</VStack>
	);
};

export default MyRequests;
