import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { CampaignStatus, ICampaignData } from "@/interfaces/campaign";
import dayjs from "dayjs";
import {
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
import React from "react";

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

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const collectionDate = dayjs(bloodCollectionDate);
  const now = dayjs();

  let derivedStatus: CampaignStatus = status;
  if (now.isBefore(start)) derivedStatus = CampaignStatus.not_started;
  else if (now.isAfter(end)) derivedStatus = CampaignStatus.ended;
  else derivedStatus = CampaignStatus.active;

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

  return (
    <Card className="border border-outline-200 rounded-xl bg-white shadow-sm w-full px-6 py-8">
      <VStack space="md">
        {/* Header */}
        <HStack className="justify-between items-start">
          <VStack className="flex-1 pr-2">
            <Text className="text-lg font-bold text-red-600">{name}</Text>
            <Text className="text-sm text-typography-700">{description}</Text>
          </VStack>
          <Badge
            className={`${statusColors[derivedStatus].bg} px-3 py-1 rounded-full`}
          >
            <BadgeText
              className={`${statusColors[derivedStatus].text} text-xs font-medium`}
            >
              {derivedStatus}
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
          <Text className="text-md font-bold text-yellow-700">
            Lưu ý trước khi hiến máu
          </Text>
          <VStack space="xs">
            <Text className="text-sm text-yellow-800">
              - Không nên hiến máu khi bạn đang bị sốt hoặc cảm cúm.
            </Text>
            <Text className="text-sm text-yellow-800">
              - Hãy đảm bảo bạn đã ăn uống đầy đủ trước khi hiến máu.
            </Text>
            <Text className="text-sm text-yellow-800">
              - Tránh uống rượu bia ít nhất 24 giờ trước khi hiến máu.
            </Text>
            <Text className="text-sm text-yellow-800">
              - Nếu bạn đang dùng thuốc hoặc có bệnh lý, hãy hỏi ý kiến bác sĩ
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
            <HStack space="sm" className="items-center">
              <Icon as={CheckCircle2} size="sm" className="text-red-500" />
              <Text className="text-base text-typography-700">
                Cảm thấy tự hào vì đã cứu giúp người khác
              </Text>
            </HStack>
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
        {/* Register Button */}
        <Button
          variant="solid"
          action="primary"
          className="bg-red-500 mt-2"
          isDisabled={
            derivedStatus === CampaignStatus.ended || enrolled >= limitDonation
          }
          onPress={onRegisterClick}
        >
          <ButtonText className="text-white">
            {derivedStatus === CampaignStatus.ended
              ? "Chiến dịch đã kết thúc"
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
