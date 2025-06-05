import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { CalendarDaysIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import dayjs from "dayjs";
import { MapPin } from "lucide-react-native";
import React from "react";

interface CampaignCardProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  onRequest?: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  description,
  startDate,
  endDate,
  location = "To Be Announced",
  onRequest,
}) => {
  return (
    <Card className="p-4 border border-outline-200 rounded-xl bg-white shadow-sm w-full">
      <VStack space="md">
        {/* Header with campaign name */}
        <HStack className="justify-between items-start">
          <VStack className="flex-1 pr-2">
            <Text className="text-lg font-bold text-red-600">{name}</Text>
            <Text className="text-sm text-typography-600">{description}</Text>
          </VStack>

          <Badge className="bg-info-100 px-3 py-1 rounded-full">
            <BadgeText className="text-info-600 text-xs font-medium">Upcoming</BadgeText>
          </Badge>
        </HStack>

        {/* Location and dates */}
        <VStack space="sm">
          <HStack className="items-center" space="sm">
            <Icon as={MapPin} size="sm" className="text-typography-500" />
            <Text className="text-sm text-typography-600 flex-1">{location}</Text>
          </HStack>

          <HStack className="items-center" space="sm">
            <Icon as={CalendarDaysIcon} size="sm" className="text-typography-500" />
            <Text className="text-sm text-typography-600">
               {dayjs(startDate).format("MMM D, YYYY")} → {dayjs(endDate).format("MMM D, YYYY")}
            </Text>
          </HStack>
        </VStack>

        {/* Action button */}
        <Button
          variant="solid"
          action="primary"
          className="bg-red-500 mt-2"
          onPress={onRequest}
        >
          <ButtonText className="text-white">Send Request</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export default CampaignCard;
