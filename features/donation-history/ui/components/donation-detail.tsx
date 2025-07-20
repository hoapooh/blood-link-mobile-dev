import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useGetDonationDetail from "@/features/donation-history/hooks/use-get-donation-detail";
import { useGetProfile } from "@/features/profile/hooks";
import { RequestStatus } from "@/interfaces/donation-request";
import dayjs from "dayjs";
import {
    CalendarDaysIcon,
    ClockIcon,
    IdCardIcon,
    Mail,
    MapPin,
    PhoneIcon,
    UserIcon,
} from "lucide-react-native";
import React from "react";
import { Image, ScrollView } from "react-native";

interface DonationDetailProps {
  donationId: string;
}

const DonationDetail: React.FC<DonationDetailProps> = ({ donationId }) => {
  const { donation, isLoading, isError, error } = useGetDonationDetail(donationId);
  const { user } = useGetProfile(); // Get current user profile for email

  // Status colors and Vietnamese translations
  const statusConfig: Record<RequestStatus, { bg: string; text: string; label: string }> = {
    [RequestStatus.pending]: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      label: "Đang chờ",
    },
    [RequestStatus.appointment_confirmed]: {
      bg: "bg-blue-100", 
      text: "text-blue-700",
      label: "Đã xác nhận",
    },
    [RequestStatus.customer_checked_in]: {
      bg: "bg-green-100",
      text: "text-green-700", 
      label: "Đã check-in",
    },
    [RequestStatus.completed]: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Hoàn thành",
    },
    [RequestStatus.result_returned]: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      label: "Đã trả kết quả",
    },
    [RequestStatus.rejected]: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Bị từ chối",
    },
    [RequestStatus.appointment_cancelled]: {
      bg: "bg-red-100",
      text: "text-red-700",
      label: "Đã bị hủy",
    },
    [RequestStatus.appointment_absent]: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      label: "Vắng mặt",
    },
    [RequestStatus.customer_cancelled]: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: "Đã hủy",
    },
  };

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center p-6">
        <Spinner size="large" className="text-red-500" />
        <Text className="text-lg text-gray-600 mt-4">Đang tải thông tin...</Text>
      </Box>
    );
  }

  if (isError || !donation) {
    return (
      <Box className="flex-1 justify-center items-center p-6">
        <Text className="text-lg text-red-600 text-center">
          {error?.message || "Không thể tải thông tin yêu cầu hiến máu"}
        </Text>
      </Box>
    );
  }

  const currentConfig = statusConfig[donation.currentStatus!] || statusConfig[RequestStatus.pending];

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
    >
      <VStack space="lg">
        {/* Header with Status */}
        <Card className="p-6 bg-white border border-outline-200 rounded-xl shadow-sm">
        <VStack space="md">
          <HStack className="justify-between items-center">
            <Text className="text-xl font-bold text-gray-900">
              Chi tiết yêu cầu hiến máu
            </Text>
            <Badge className={`${currentConfig.bg} px-3 py-1 rounded-full`}>
              <BadgeText className={`${currentConfig.text} text-sm font-medium`}>
                {currentConfig.label}
              </BadgeText>
            </Badge>
          </HStack>
          
          <HStack className="items-center" space="sm">
            <Icon as={CalendarDaysIcon} size="sm" className="text-red-500" />
            <Text className="text-sm text-gray-600">
              Ngày tạo: {dayjs(donation.createdAt).format("DD/MM/YYYY HH:mm")}
            </Text>
          </HStack>

          <HStack className="items-center" space="sm">
            <Icon as={CalendarDaysIcon} size="sm" className="text-red-500" />
            <Text className="text-sm text-gray-600">
              Cập nhật lần cuối: {dayjs(donation.updatedAt).format("DD/MM/YYYY HH:mm")}
            </Text>
          </HStack>

          {donation.appointmentDate && (
            <HStack className="items-center" space="sm">
              <Icon as={ClockIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Lịch hẹn: {dayjs(donation.appointmentDate).format("DD/MM/YYYY HH:mm")}
              </Text>
            </HStack>
          )}
        </VStack>
      </Card>

      {/* Campaign Information */}
      {donation.campaign && (
        <Card className="p-0 bg-white border border-outline-200 rounded-xl shadow-sm overflow-hidden">
          <Image
            source={{ uri: donation.campaign.banner }}
            style={{ width: "100%", height: 160 }}
            resizeMode="cover"
          />
          
          <VStack space="md" className="p-4">
            <Text className="text-lg font-bold text-red-600">
              {donation.campaign.name}
            </Text>
            
            <Text className="text-sm text-gray-600">
              {donation.campaign.description}
            </Text>

            <HStack className="items-center" space="sm">
              <Icon as={MapPin} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                {donation.campaign.location}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={CalendarDaysIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Ngày hiến máu: {dayjs(donation.campaign.bloodCollectionDate).format("DD/MM/YYYY")}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={ClockIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Thời gian: 07:30 → 16:30
              </Text>
            </HStack>
          </VStack>
        </Card>
      )}

      {/* Donor Information */}
      {donation.donor && (
        <Card className="p-6 bg-white border border-outline-200 rounded-xl shadow-sm">
          <VStack space="md">
            <Text className="text-lg font-bold text-gray-900">
              Thông tin người hiến
            </Text>

            <HStack className="items-center" space="sm">
              <Icon as={UserIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Họ tên: {donation.donor.firstName} {donation.donor.lastName}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={Mail} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Email: {user?.data?.account?.email || "Không có"}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={PhoneIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Số điện thoại: {donation.donor.phone}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={IdCardIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                CCCD: {donation.donor.citizenId}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={CalendarDaysIcon} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Ngày sinh: {donation.donor.dateOfBirth}
              </Text>
            </HStack>

            <HStack className="items-center" space="sm">
              <Icon as={MapPin} size="sm" className="text-red-500" />
              <Text className="text-sm text-gray-600">
                Địa chỉ: {donation.donor.wardName}, {donation.donor.districtName}, {donation.donor.provinceName}
              </Text>
            </HStack>

            {donation.donor.bloodType && (donation.donor.bloodType.group || donation.donor.bloodType.rh) && (
              <HStack className="items-center" space="sm">
                <Icon as={UserIcon} size="sm" className="text-red-500" />
                <Text className="text-sm text-gray-600">
                  Nhóm máu: {donation.donor.bloodType.group || "Chưa xác định"}{donation.donor.bloodType.rh || ""}
                </Text>
              </HStack>
            )}
          </VStack>
        </Card>
      )}
      </VStack>
    </ScrollView>
  );
};

export default DonationDetail;
