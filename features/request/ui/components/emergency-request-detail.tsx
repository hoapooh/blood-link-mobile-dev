import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetEmergencyRequestDetail } from "@/features/request/hooks";
import dayjs from "dayjs";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPin,
  UserIcon,
  X
} from "lucide-react-native";
import React from "react";
import { ScrollView } from "react-native";

interface EmergencyRequestDetailProps {
  requestId: string;
}

const EmergencyRequestDetail: React.FC<EmergencyRequestDetailProps> = ({ requestId }) => {
  const { emergencyRequest, isLoading, isError, error } = useGetEmergencyRequestDetail(requestId);
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Đã duyệt",
          icon: CheckCircleIcon,
        };
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Đang chờ",
          icon: AlertCircleIcon,
        };
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Bị từ chối",
          icon: X,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          label: status,
          icon: ClockIcon,
        };
    }
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

  const getBloodTypeDisplay = (bloodType: { group: string; rh: string }) => {
    if (bloodType && bloodType.group && bloodType.rh) {
      return bloodType.group + bloodType.rh;
    }
    return "N/A";
  };

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center p-6">
        <Spinner size="large" className="text-red-500" />
        <Text className="text-lg text-gray-600 mt-4">Đang tải thông tin...</Text>
      </Box>
    );
  }

  if (isError || !emergencyRequest) {
    return (
      <Box className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-red-600 text-center">
          {(error?.message || "Không thể tải thông tin yêu cầu khẩn cấp") + ""}
        </Text>
      </Box>
    );
  }

  const statusInfo = getStatusInfo(emergencyRequest.status);
  const bloodTypeDisplay = getBloodTypeDisplay(emergencyRequest.bloodType);
  const bloodTypeComponentDisplay = getBloodTypeComponentDisplay(emergencyRequest.bloodTypeComponent);

  return (
            
    <ScrollView 
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        padding: 16, 
        paddingBottom: 32 
      }}
    >
      <VStack space="lg">
        {/* Header with Status and Blood Type */}
        <Card className="p-6 bg-white border border-outline-200 rounded-xl shadow-sm">
          <VStack space="md">
            <HStack className="justify-between items-center">
              <Text className="text-xl font-bold text-gray-900">
                Chi tiết yêu cầu khẩn cấp
              </Text>
              <Badge className={`${statusInfo.bg} px-3 py-1 rounded-full`}>
                <BadgeText className={`${statusInfo.text} text-sm font-medium`}>
                  {statusInfo.label + ""}
                </BadgeText>
              </Badge>
            </HStack>
            
            {/* Blood Type Display */}
            <HStack className="items-center bg-red-50 p-4 rounded-lg" space="md">
              <VStack className="bg-red-100 rounded-full items-center justify-center w-16 h-16">
                <Text className="text-red-600 font-bold text-xl">{bloodTypeDisplay + ""}</Text>
              </VStack>
              <VStack className="flex-1">
                <Text className="text-lg font-bold text-red-600">
                  {bloodTypeComponentDisplay + ""}
                </Text>
                <Text className="text-sm text-gray-600">
                  {"Cần " + emergencyRequest.requiredVolume + "ml"}
                </Text>
                {(emergencyRequest.usedVolume != null && emergencyRequest.usedVolume > 0) ? (
                  <Text className="text-sm text-green-600">
                    {"Đã thu thập: " + emergencyRequest.usedVolume + "ml"}
                  </Text>
                ) : null}
              </VStack>
            </HStack>

            {/* Dates */}
            <HStack className="items-center" space="sm">
              <Text className="text-sm text-gray-600">
                {"Ngày tạo: " + dayjs(emergencyRequest.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Text className="text-sm text-gray-600">
                {"Cập nhật lần cuối: " + dayjs(emergencyRequest.updatedAt).format("DD/MM/YYYY HH:mm")}
              </Text>
            </HStack>
          </VStack>
        </Card>

        {/* Request Information */}
        <Card className="p-6 bg-white border border-outline-200 rounded-xl shadow-sm">
          <VStack space="md">
            <Text className="text-lg font-bold text-gray-900">
              Thông tin yêu cầu
            </Text>

            {/* Location */}
            <HStack className="items-center" space="sm">
              <Icon as={MapPin} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                {"Địa điểm: " + emergencyRequest.wardName + ", " + emergencyRequest.districtName + ", " + emergencyRequest.provinceName}
              </Text>
            </HStack>

            {/* Requester Information */}
            {emergencyRequest.requestedBy && (
              <HStack className="items-center" space="sm">
                <Icon as={UserIcon} size="sm" className="text-red-500" />
                <Text className="text-sm text-gray-600">
                  {"Email người yêu cầu: " + emergencyRequest.requestedBy.email}
                </Text>
              </HStack>
            )}

            
          </VStack>
        </Card>

        {/* Description */}
        {emergencyRequest.description && (
          <Card className="p-6 bg-white border border-outline-200 rounded-xl shadow-sm">
            <VStack space="md">
              <Text className="text-lg font-bold text-gray-900">
                Mô tả tình trạng
              </Text>
              <Text className="text-sm text-gray-700 leading-6">
                {emergencyRequest.description + ""}
              </Text>
            </VStack>
          </Card>
        )}

        {/* Rejection Reason */}
        {emergencyRequest.rejectionReason && emergencyRequest.status === "rejected" && (
          <Card className="p-6 bg-red-50 border border-red-200 rounded-xl shadow-sm">
            <VStack space="md">
              <HStack className="items-center" space="sm">
                <Icon as={X} size="sm" className="text-red-600" />
                <Text className="text-lg font-bold text-red-700">
                  Lý do từ chối
                </Text>
              </HStack>
              <Text className="text-sm text-red-700 leading-6">
                {emergencyRequest.rejectionReason + ""}
              </Text>
            </VStack>
          </Card>
        )}
      </VStack>
    </ScrollView>
  );
};

export default EmergencyRequestDetail;
