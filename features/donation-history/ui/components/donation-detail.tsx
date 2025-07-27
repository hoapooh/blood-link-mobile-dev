import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useGetDonationDetail from "@/features/donation-history/hooks/use-get-donation-detail";
import useGetDonationResult from "@/features/donation-history/hooks/use-get-donation-result";
import { useGetProfile } from "@/features/profile/hooks";
import { RequestStatus } from "@/interfaces/donation-request";
import dayjs from "dayjs";
import {
  CalendarDaysIcon,
  ClockIcon,
  DropletIcon,
  IdCardIcon,
  Mail,
  MapPin,
  PhoneIcon,
  UserIcon
} from "lucide-react-native";
import React from "react";
import { Image, ScrollView } from "react-native";

interface DonationDetailProps {
  donationId: string;
}

const DonationDetail: React.FC<DonationDetailProps> = ({ donationId }) => {
  const { donation, isLoading, isError, error } = useGetDonationDetail(donationId);
  const { result, isLoading: isResultLoading } = useGetDonationResult(donationId);
  const { user } = useGetProfile(); // Get current user profile for email

  // Status colors and Vietnamese translations - consistent with donation card
  const statusStyles: Record<RequestStatus, { bg: string; text: string }> = {
    [RequestStatus.completed]: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    [RequestStatus.result_returned]: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    [RequestStatus.appointment_confirmed]: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    [RequestStatus.appointment_cancelled]: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    [RequestStatus.appointment_absent]: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    [RequestStatus.customer_cancelled]: {
      bg: "bg-gray-100",
      text: "text-gray-600",
    },
    [RequestStatus.customer_checked_in]: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    [RequestStatus.not_qualified]: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    [RequestStatus.no_show_after_checkin]: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  };

  const getStatusStyle = (status: RequestStatus) => {
    // Handle status with potential spaces by converting to enum value first
    const normalizedStatus = status.toString().toLowerCase().replace(/\s+/g, '_') as RequestStatus;
    
    return statusStyles[normalizedStatus] || {
      bg: "bg-gray-100",
      text: "text-gray-600",
    };
  };

  const getStatusDisplay = (status: RequestStatus): string => {
    // Handle status with potential spaces by converting to enum value first
    const normalizedStatus = status.toString().toLowerCase().replace(/\s+/g, '_') as RequestStatus;
    
    switch (normalizedStatus) {
      case RequestStatus.completed:
        return "Hoàn thành";
      case RequestStatus.result_returned:
        return "Đã trả kết quả";
      case RequestStatus.appointment_confirmed:
        return "Đã xác nhận";
      case RequestStatus.appointment_cancelled:
        return "Đã bị hủy";
      case RequestStatus.appointment_absent:
        return "Vắng mặt";
      case RequestStatus.customer_cancelled:
        return "Đã hủy";
      case RequestStatus.customer_checked_in:
        return "Đã check-in";
      case RequestStatus.not_qualified:
        return "Không đủ điều kiện";
      case RequestStatus.no_show_after_checkin:
        return "Không đến sau check-in";
      default:
        // Fallback: display the original status with proper formatting
        return status.toString().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
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

  const currentConfig = getStatusStyle(donation.currentStatus!) || {
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

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
                {getStatusDisplay(donation.currentStatus!)}
              </BadgeText>
            </Badge>
          </HStack>
          
          <HStack className="items-center" space="sm">
            <Text className="text-sm text-gray-600">
              Ngày tạo: {dayjs(donation.createdAt).format("DD/MM/YYYY HH:mm")}
            </Text>
          </HStack>

          <HStack className="items-center" space="sm">
            <Text className="text-sm text-gray-600">
              Cập nhật lần cuối: {dayjs(donation.updatedAt).format("DD/MM/YYYY HH:mm")}
            </Text>
          </HStack>

          <VStack space="md">
            <HStack className="items-center" space="sm">
              
              <Text className="text-sm text-gray-600">
                Ngày hẹn: {dayjs(donation.appointmentDate).format("DD/MM/YYYY")}
              </Text>
            </HStack>
            {donation.volumeMl && (
              <HStack className="items-center" space="sm">
                
                <Text className="text-sm text-gray-600">
                  Thể tích dự kiến: {donation.volumeMl} ml
                </Text>
              </HStack>
            )}
            {donation.note && (
              <HStack className="items-center" space="sm">
                
                <Text className="text-sm text-gray-600">
                  Ghi chú: {donation.note}
                </Text>
              </HStack>
            )}
          </VStack>
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
                <Icon as={DropletIcon} size="sm" className="text-red-500" />
                <Text className="text-sm text-gray-600">
                  Nhóm máu: {donation.donor.bloodType.group || "Chưa xác định"}{donation.donor.bloodType.rh || ""}
                </Text>
              </HStack>
            )}
          </VStack>
        </Card>
      )}

      {/* Donation Result Section */}
      {(donation.currentStatus === RequestStatus.result_returned || 
        donation.currentStatus === RequestStatus.completed ||
        donation.currentStatus === RequestStatus.not_qualified) && (
        <Card className="p-0 bg-white border border-outline-200 rounded-xl shadow-sm overflow-hidden">
          {/* Result Header */}
          <VStack space="xs" className="bg-gradient-to-r from-red-50 to-red-100 p-6 border-b border-gray-100">
            <Text className="text-xl font-bold text-gray-900 text-center">
              Kết quả hiến máu
            </Text>
            <Text className="text-sm text-gray-600 text-center mt-1">
              Thông tin chi tiết về kết quả xét nghiệm và hiến máu
            </Text>
          </VStack>

          <VStack space="lg" className="p-6">
            {isResultLoading ? (
              <VStack className="items-center justify-center py-8" space="md">
                <Spinner size="large" className="text-red-500" />
                <Text className="text-base text-gray-600 text-center">Đang tải kết quả...</Text>
                <Text className="text-sm text-gray-500 text-center">Vui lòng đợi trong giây lát</Text>
              </VStack>
            ) : result ? (
              <VStack space="lg">
                {/* Status Card */}
                <Card className={`p-4 border-2 ${result.status === "completed" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"} rounded-lg`}>
                  <VStack space="sm" className="items-center">
                    <Text className="text-lg font-bold text-center">
                      {result.status === "completed" ? "Hiến máu thành công" : "Hiến máu không thành công"}
                    </Text>
                    <Text className={`text-sm text-center ${result.status === "completed" ? "text-green-700" : "text-red-700"}`}>
                      {result.status === "completed" 
                        ? "Cảm ơn bạn đã hiến máu cứu người!" 
                        : "Rất tiếc, yêu cầu hiến máu không được chấp nhận"}
                    </Text>
                  </VStack>
                </Card>

                {/* Result Details */}
                <VStack space="md">
                  {/* Volume (only show if completed) */}
                  {result.status === "completed" && result.volumeMl && (
                    <Card className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <VStack space="xs">
                        <Text className="text-sm font-medium text-blue-800 uppercase tracking-wide">
                          Thể tích máu hiến
                        </Text>
                        <Text className="text-2xl font-bold text-blue-900">
                          {result.volumeMl} ml
                        </Text>
                        <Text className="text-xs text-blue-600">
                          Lượng máu đã được thu thập thành công
                        </Text>
                      </VStack>
                    </Card>
                  )}

                  {/* Blood type */}
                  {result.bloodGroup && result.bloodRh && (
                    <Card className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <VStack space="xs">
                        <Text className="text-sm font-medium text-purple-800 uppercase tracking-wide">
                          Nhóm máu được xác định
                        </Text>
                        <Text className="text-2xl font-bold text-purple-900">
                          {result.bloodGroup}{result.bloodRh}
                        </Text>
                        <Text className="text-xs text-purple-600">
                          Kết quả từ xét nghiệm máu
                        </Text>
                      </VStack>
                    </Card>
                  )}

                  {/* Notes */}
                  {result.notes && (
                    <Card className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <VStack space="xs">
                        <Text className="text-sm font-medium text-gray-800 uppercase tracking-wide">
                          Ghi chú từ bác sĩ
                        </Text>
                        <Text className="text-base text-gray-900 leading-relaxed">
                          {result.notes}
                        </Text>
                      </VStack>
                    </Card>
                  )}

                  {/* Reject reason (only show if rejected) */}
                  {result.status === "rejected" && result.rejectReason && (
                    <Card className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <VStack space="xs">
                        <Text className="text-sm font-medium text-red-800 uppercase tracking-wide">
                          Lý do từ chối
                        </Text>
                        <Text className="text-base text-red-900 leading-relaxed">
                          {result.rejectReason}
                        </Text>
                        <Text className="text-xs text-red-600 mt-2">
                          Vui lòng tham khảo ý kiến bác sĩ để hiểu rõ hơn
                        </Text>
                      </VStack>
                    </Card>
                  )}
                </VStack>

                {/* Staff Information */}
                {result.processedBy && (
                  <Card className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <VStack space="xs">
                      <Text className="text-sm font-medium text-gray-800 uppercase tracking-wide">
                        Nhân viên xử lý
                      </Text>
                      <Text className="text-lg font-semibold text-gray-900">
                        {result.processedBy.firstName} {result.processedBy.lastName}
                      </Text>
                      <Text className="text-xs text-indigo-600">
                        Bác sĩ/Kỹ thuật viên phụ trách
                      </Text>
                    </VStack>
                  </Card>
                )}
              </VStack>
            ) : (
              <VStack className="items-center justify-center py-8" space="md">
                <Text className="text-6xl">🔬</Text>
                <Text className="text-lg font-medium text-gray-900 text-center">
                  Chưa có kết quả hiến máu
                </Text>
                <Text className="text-sm text-gray-600 text-center max-w-sm">
                  Kết quả xét nghiệm và hiến máu sẽ được cập nhật sau khi hoàn tất quá trình kiểm tra
                </Text>
              </VStack>
            )}
          </VStack>
        </Card>
      )}
      </VStack>
    </ScrollView>
  );
};

export default DonationDetail;
