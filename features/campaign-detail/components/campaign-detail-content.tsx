import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import dayjs from "dayjs";
import {
    CalendarDaysIcon,
    ClockIcon,
    MapPin,
    UsersIcon,
} from "lucide-react-native";
import React from "react";

interface CampaignDetailSectionProps {
  name: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  address: string;
  enrolled: number;
  maxEnrolled: number;
  onRegisterClick?: () => void;
}

const CampaignDetailSection: React.FC<CampaignDetailSectionProps> = ({
  name,
  description,
  startDateTime,
  endDateTime,
  address,
  enrolled,
  maxEnrolled,
  onRegisterClick,
}) => {
  const start = dayjs(startDateTime);
  const end = dayjs(endDateTime);
  const now = dayjs();

  let status = "Active";
  if (now.isBefore(start)) status = "Upcoming";
  else if (now.isAfter(end)) status = "Completed";

  const statusColors: any = {
    Upcoming: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    Active: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    Completed: {
      bg: "bg-gray-200",
      text: "text-gray-600",
    },
  };

  return (
    <Card className="p-4 border border-outline-200 rounded-xl bg-white shadow-sm w-full px-6 py-4 ">
      <VStack space="md">
        {/* Header */}
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

        {/* Location */}
        <HStack className="items-center" space="sm">
          <Icon as={MapPin} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600 flex-1">{address}</Text>
        </HStack>

        {/* Date */}
        <HStack className="items-center" space="sm">
          <Icon as={CalendarDaysIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {start.format("MMM D, YYYY")}
          </Text>
        </HStack>

        {/* Time */}
        <HStack className="items-center" space="sm">
          <Icon as={ClockIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {start.format("hh:mm A")} → {end.format("hh:mm A")}
          </Text>
        </HStack>

        {/* People Enrolled */}
        <HStack className="items-center" space="sm">
          <Icon as={UsersIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {enrolled} / {maxEnrolled} people enrolled
          </Text>
        </HStack>

        {/* Benefit Section */}
        <VStack space="sm">
          <Text className="text-md font-bold text-red-600">
            Benefit of Donation
          </Text>
          <VStack space="sm">
            <Text className="text-sm text-typography-600">
              Receive a free health screening and blood test
            </Text>
            <Text className="text-sm text-typography-600">
              Contribute to a vital community service and save lives
            </Text>
            <Text className="text-sm text-typography-600">
              Get a complimentary snack and drink after donation
            </Text>
            <Text className="text-sm text-typography-600">
              Feel good knowing you made a difference
            </Text>
          </VStack>
        </VStack>

        {/* Contact Section */}
        <VStack space="sm">
          <Text className="text-md font-bold text-red-600">Contact</Text>
          <Text className="text-sm text-typography-600">
            Phone: +84 123 456 789
          </Text>
          <Text className="text-sm text-typography-600">
            Email: support@lifeblood.org
          </Text>
        </VStack>

        {/* Register Button */}
        <Button
          variant="solid"
          action="primary"
          className="bg-red-500 mt-2"
          isDisabled={status === "Completed" || enrolled >= maxEnrolled}
          onPress={onRegisterClick}
        >
          <ButtonText className="text-white">
            {status === "Completed"
              ? "Campaign Ended"
              : enrolled >= maxEnrolled
              ? "Campaign Full"
              : "Register Now"}
          </ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export default CampaignDetailSection;
