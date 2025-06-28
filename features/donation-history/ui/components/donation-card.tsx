import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IDonationRequestData, RequestStatus } from "@/interfaces/donation-request";
import dayjs from "dayjs";
import { CalendarDaysIcon, ClockIcon, MapPin } from "lucide-react-native";

interface DonationRequestCardProps {
  request: IDonationRequestData;
  onView?: () => void;
}

const statusStyles: Record<RequestStatus, { bg: string; text: string }> = {
  [RequestStatus.pending]: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  [RequestStatus.approved]: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  [RequestStatus.completed]: {
    bg: "bg-green-100",
    text: "text-green-600",
  },
  [RequestStatus.rejected]: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
  [RequestStatus.canceled]: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
  [RequestStatus.failed]: {
    bg: "bg-red-100",
    text: "text-red-600",
  },
};

const DonationRequestCard: React.FC<DonationRequestCardProps> = ({ request, onView }) => {
  const { campaign, currentStatus, createdAt } = request;

  const campaignTime = "07:30 → 16:30";
  const collectionDate = campaign?.bloodCollectionDate
    ? dayjs(campaign.bloodCollectionDate).format("DD/MM/YYYY")
    : "-";
  const submissionDate = createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : "-";

  return (
    <Card className="p-0 border border-outline-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <VStack space="md" className="p-4">
        {/* Header: Campaign name + Status */}
        <HStack className="justify-between items-start">
          <VStack className="flex-1 pr-2">
            <Text className="text-base font-bold text-red-600">
              {campaign?.name || "Chiến dịch không xác định"}
            </Text>
            <Text className="text-sm text-typography-600">
              {campaign?.description || "Không có mô tả"}
            </Text>
          </VStack>
          {currentStatus && (
            <Badge className={`${statusStyles[currentStatus].bg} px-3 py-1 rounded-full`}>
              <BadgeText className={`${statusStyles[currentStatus].text} text-xs font-medium`}>
                {currentStatus}
              </BadgeText>
            </Badge>
          )}
        </HStack>

        {/* Location */}
        <HStack className="items-center" space="sm">
          <Icon as={MapPin} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            {campaign?.location || "Không rõ địa điểm"}
          </Text>
        </HStack>

        {/* Dates */}
        <HStack className="items-center" space="sm">
          <Icon as={CalendarDaysIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            Ngày đăng ký: {submissionDate}
          </Text>
        </HStack>
        <HStack className="items-center" space="sm">
          <Icon as={CalendarDaysIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">
            Ngày hiến máu: {collectionDate}
          </Text>
        </HStack>

        {/* Time */}
        <HStack className="items-center" space="sm">
          <Icon as={ClockIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">{campaignTime}</Text>
        </HStack>

        {/* Action */}
        {onView && (
          <Button
            variant="outline"
            action="secondary"
            className="mt-2 border-gray-300"
            onPress={onView}
          >
            <ButtonText className="text-red-500">Xem chi tiết</ButtonText>
          </Button>
        )}
      </VStack>
    </Card>
  );
};

export default DonationRequestCard;
