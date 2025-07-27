import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useGetDonationHistory from "@/features/donation-history/hooks/use-get-donation-history";
import { CampaignStatus, ICampaignData } from "@/interfaces/campaign";
import { RequestStatus } from "@/interfaces/donation-request";
import dayjs from "dayjs";
import {
  AlertCircle,
  AlertTriangle,
  CalendarDaysIcon,
  CheckCircle2,
  ClockIcon,
  Contact,
  Heart,
  Mail,
  MapPin,
  Phone,
  UsersIcon,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";

interface CampaignDetailSectionProps {
  campaign: ICampaignData;
  enrolled?: number;
  onRegisterClick?: () => void;
}

const CampaignDetailSection: React.FC<CampaignDetailSectionProps> = ({
  campaign,
  enrolled = 0,
  onRegisterClick,
}) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    limitDonation,
    bloodCollectionDate,
    status,
  } = campaign;

  // Get user's donation history to check for active donations
  const { data: donationHistory, isLoading: isLoadingHistory } = useGetDonationHistory();
  
  // Add timeout state to prevent indefinite loading
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Set a timeout to allow button interaction even if history is still loading
  useEffect(() => {
    if (isLoadingHistory) {
      const timer = setTimeout(() => {
        setLoadingTimeout(true);
      }, 3000); // 3 second timeout

      return () => clearTimeout(timer);
    } else {
      setLoadingTimeout(false);
    }
  }, [isLoadingHistory]);

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const collectionDate = dayjs(bloodCollectionDate);
  const now = dayjs();

  let derivedStatus: CampaignStatus = status;
  if (now.isBefore(start)) derivedStatus = CampaignStatus.not_started;
  else if (now.isAfter(end)) derivedStatus = CampaignStatus.ended;
  else derivedStatus = CampaignStatus.active;

  // Check for active donation requests that should block registration
  const activeBlockingStatuses = [
    RequestStatus.completed,
    RequestStatus.appointment_confirmed,
    RequestStatus.customer_checked_in,
  ];

  // Only check for active donations if we have data or if we've timed out
  const hasActiveDonation = (donationHistory && donationHistory.length > 0) 
    ? donationHistory.some(donation =>
        donation.currentStatus && activeBlockingStatuses.includes(donation.currentStatus)
      )
    : false;

  // Determine if we should show loading state (only for first 3 seconds)
  const shouldShowLoading = isLoadingHistory && !loadingTimeout;

  const statusColors: Record<CampaignStatus, { bg: string; text: string }> = {
    [CampaignStatus.not_started]: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    [CampaignStatus.active]: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    [CampaignStatus.ended]: {
      bg: "bg-gray-200",
      text: "text-gray-600",
    },
  };

  const getStatusDisplay = (status: CampaignStatus): string => {
    switch (status) {
      case CampaignStatus.not_started:
        return "Chưa bắt đầu";
      case CampaignStatus.active:
        return "Đang diễn ra";
      case CampaignStatus.ended:
        return "Đã kết thúc";
      default:
        return status;
    }
  };

  return (
    <Card className="border border-outline-200 rounded-xl bg-white shadow-sm w-full px-6 py-8">
      <VStack space="md">
        {/* Header */}
        <HStack className="justify-between items-start">
          <VStack className="flex-1 pr-2">
            <Text className="text-lg font-bold text-red-600">{name}</Text>
            <Text className="text-md text-typography-700">{description}</Text>
          </VStack>
          <Badge
            className={`${statusColors[derivedStatus].bg} px-3 py-1 rounded-full`}
          >
            <BadgeText
              className={`${statusColors[derivedStatus].text} text-xs font-medium`}
            >
              {getStatusDisplay(derivedStatus)}
            </BadgeText>
          </Badge>
        </HStack>

        {/* Location */}
        <HStack className="items-center" space="sm">
          <Icon as={MapPin} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-700 flex-1">
            {location || "Địa chỉ chưa cập nhật"}
          </Text>
        </HStack>

        {/* Date */}
        <HStack className="items-center" space="sm">
          <Icon as={CalendarDaysIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-700">
            {/* {start.format("D/MM/YYYY")} → {end.format("D/MM/YYYY")} */}
            {collectionDate.format("DD/MM/YYYY")}
          </Text>
        </HStack>

        {/* Time */}
        <HStack className="items-center" space="sm">
          <Icon as={ClockIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-700">07:30 → 16:30</Text>
        </HStack>

        {/* People Enrolled */}
        <HStack className="items-center" space="sm">
          <Icon as={UsersIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-700">
            {enrolled} / {limitDonation} người tham gia
          </Text>
        </HStack>
        {/* Registration End Date */}
        <VStack space="xs">
          <Text className="text-sm font-medium text-gray-700">
            Thời gian kết thúc đăng ký: {end.format("DD/MM/YYYY")}
          </Text>
        </VStack>
        {/* Attention Section */}
        <VStack
          className="border border-yellow-300 bg-yellow-100 rounded-md p-4"
          space="sm"
        >
          <HStack>
            <Icon as={AlertTriangle} size="md" className="text-yellow-600 mr-2" />
            <Text className="text-lg font-bold text-yellow-700">
              Lưu ý trước khi hiến máu
            </Text>
          </HStack>
          <VStack space="xs">
            <Text className="text-sm text-yellow-800">
              • Đêm trước hiến máu không nên thức quá khuya (ngủ ít nhất 6 tiếng).
            </Text>
            <Text className="text-sm text-yellow-800">
              • Nên ăn nhẹ, KHÔNG ăn các đồ ăn có nhiều đạm, nhiều mỡ.
            </Text>
            <Text className="text-sm text-yellow-800">
              • KHÔNG uống rượu, bia.
            </Text>
             <Text className="text-sm text-yellow-800">
              • Chuẩn bị tâm lý thực sự thoải mái.
            </Text>
            <Text className="text-sm text-yellow-800">
              • Mang theo giấy tờ tùy thân.
            </Text>
            <Text className="text-sm text-yellow-800">
              • Nếu bạn đang dùng thuốc hoặc có bệnh lý, hãy hỏi ý kiến bác sĩ
              trước.
            </Text>
          </VStack>
        </VStack>

        {/* Benefit Section */}
        <VStack
          space="sm"
          className="bg-red-50 rounded-md p-5 shadow-inner border border-red-200"
        >
          <HStack className="items-center mb-3 space-x-2">
            <Icon as={Heart} size="md" className="text-red-600 mr-2" />
            <Text className="text-lg font-semibold text-red-700">
              Lợi ích khi tham gia
            </Text>
          </HStack>
          <VStack space="xs">
            <HStack space="sm" className="items-center">
              <Icon as={CheckCircle2} size="sm" className="text-red-500" />
              <Text className="text-base text-typography-700">
                Khám sức khỏe và xét nghiệm miễn phí
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Icon as={CheckCircle2} size="sm" className="text-red-500" />
              <Text className="text-base text-typography-700">
                Góp phần vào hoạt động cộng đồng ý nghĩa
              </Text>
            </HStack>
            <HStack space="sm" className="items-center">
              <Icon as={CheckCircle2} size="sm" className="text-red-500" />
              <Text className="text-base text-typography-700">
                Nhận đồ ăn nhẹ và nước uống sau hiến máu
              </Text>
            </HStack>
            {/* <HStack space="sm" className="items-center">
              <Icon as={CheckCircle2} size="sm" className="text-red-500" />
              <Text className="text-base text-typography-700">
                Được ưu tiên khi cần máu trong trường hợp khẩn cấp
              </Text>
            </HStack> */}
          </VStack>
        </VStack>

        {/* Contact Section */}
        <VStack
          space="sm"
          className="bg-gray-50 rounded-md p-5 shadow-inner border border-gray-200"
        >
          <HStack className="items-center mb-3 space-x-2">
            <Icon as={Contact} size="md" className="text-red-600 mr-2" />
            <Text className="text-lg font-semibold text-red-700">Liên hệ</Text>
          </HStack>
          <HStack space="sm" className="items-center">
            <Icon as={Phone} size="sm" className="text-red-500" />
            <Text className="text-base text-typography-700">
              +84 123 456 789
            </Text>
          </HStack>
          <HStack space="sm" className="items-center">
            <Icon as={Mail} size="sm" className="text-red-500" />
            <Text className="text-base text-typography-700">
              support@lifeblood.org
            </Text>
          </HStack>
        </VStack>
        
        {/* Active donation warning card */}
        {hasActiveDonation && (
          <VStack
            space="sm"
            className="bg-red-100 rounded-md p-4 border border-red-200"
          >
            <HStack className="items-center space-x-2">
              <Icon as={AlertCircle} size="sm" className="text-red-600 mr-2" />
              <Text className="text-lg font-semibold text-red-700">
                Thông báo quan trọng
              </Text>
            </HStack>
            <Text className="text-sm text-red-600">
              Bạn hiện tại đang có yêu cầu hiến máu đang hoạt động. Vui lòng hoàn thành 
              quá trình hiến máu hiện tại trước khi đăng ký chiến dịch mới.
            </Text>
          </VStack>
        )}

        {/* Register Button */}
        <Button
          variant="solid"
          action="primary"
          className="bg-red-500 mt-2"
          isDisabled={
            derivedStatus === CampaignStatus.ended || 
            enrolled >= limitDonation || 
            derivedStatus === CampaignStatus.not_started ||
            hasActiveDonation ||
            shouldShowLoading
          }
          onPress={onRegisterClick}
        >
          <ButtonText className="text-white">
            {shouldShowLoading
              ? "Đang kiểm tra..."
              : hasActiveDonation
              ? "Bạn đã có yêu cầu đang hoạt động"
              : derivedStatus === CampaignStatus.ended
              ? "Chiến dịch đã kết thúc"
              : derivedStatus === CampaignStatus.not_started
              ? "Chiến dịch chưa bắt đầu"
              : enrolled >= limitDonation
              ? "Đã đủ người"
              : "Đăng ký ngay"}
          </ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export default CampaignDetailSection;
