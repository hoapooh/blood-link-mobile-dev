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
  ClockIcon,
  MapPin,
  UsersIcon
} from "lucide-react-native";
import React from "react";
import { Image } from "react-native";

interface CampaignCardProps extends ICampaignData {
  onRequest?: () => void;
  enrolled?: number;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  description,
  startDate,
  endDate,
  status,
  banner,
  location,
  limitDonation,
  bloodCollectionDate,
  onRequest,
  enrolled = 0,
}) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const collectionDate = dayjs(bloodCollectionDate);

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
    <Card className="p-0 border border-outline-200 rounded-xl bg-white shadow-sm overflow-hidden">
      {/* Banner */}
      <Image
        source={{ uri: banner }}
        style={{ width: "100%", height: 160 }}
        resizeMode="cover"
      />

      <VStack space="md" className="p-4">
        {/* Title + Status */}
        <HStack className="justify-between items-start">
          <VStack className="flex-1 pr-2">
            <Text className="text-lg font-bold text-red-600">{name}</Text>
            <Text className="text-sm text-typography-600">{description}</Text>
          </VStack>
          <Badge
            className={`${statusColors[status].bg} px-3 py-1 rounded-full`}
          >
            <BadgeText
              className={`${statusColors[status].text} text-xs font-medium`}
            >
              {status}
            </BadgeText>
          </Badge>
        </HStack>

        {/* Address Placeholder */}
        <HStack className="items-center" space="sm">
          <Icon as={MapPin} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {location || "Location not specified"}
          </Text>
        </HStack>
        

        {/* Date */}
        <HStack className="items-center" space="sm">
          <Icon as={CalendarDaysIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {/* {start.format("D/MM/YYYY")} → {end.format("D/MM/YYYY")} */}
            {collectionDate.format("DD/MM/YYYY")}
          </Text>
        </HStack>

        {/* Time */}
        <HStack className="items-center" space="sm">
          <Icon as={ClockIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {/* {start.format("hh:mm A")} → {end.format("hh:mm A")} */}
            07:30 → 16:30
          </Text>
        </HStack>

        {/* People Enrolled */}
        <HStack className="items-center" space="sm">
          <Icon as={UsersIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {enrolled} / {limitDonation} người tham gia
          </Text>
        </HStack>
        {/* Registration End Date */}
        <VStack space="xs">
            <Text className="text-sm font-medium text-gray-700">
              Thời gian kết thúc đăng ký: {end.format("DD/MM/YYYY")}
            </Text>
        </VStack>
        {/* Action Button */}
        <Button
          variant="solid"
          action="primary"
          className="bg-red-500 mt-2"
          onPress={onRequest}
        >
          <ButtonText className="text-white">Xem chi tiết</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export default CampaignCard;
