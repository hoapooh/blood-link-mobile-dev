import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IDonationRequestData, RequestStatus } from "@/interfaces/donation-request";
import dayjs from "dayjs";
import { CalendarDaysIcon, ClockIcon, DropletIcon, MapPin } from "lucide-react-native";

interface DonationRequestCardProps {
  request: IDonationRequestData;
  onView?: () => void;
}

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
      return "Không hiến máu";
    default:
      // Fallback: display the original status with proper formatting
      return status.toString().replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
};

const DonationRequestCard: React.FC<DonationRequestCardProps> = ({ request, onView }) => {
  const { campaign, currentStatus, createdAt } = request;

  const campaignTime = "07:30 → 16:30";
  const submissionDate = createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : "-";

  return (
    <Card className="p-0 border border-outline-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <VStack space="md" className="p-4">
        {/* Header: Campaign name + Status */}
        <HStack className="justify-between items-start">
          <VStack className="flex-1 pr-3">
            <Text className="text-base font-bold text-red-600">
              {campaign?.name || "Chiến dịch không xác định"}
            </Text>
            <Text className="text-sm text-typography-600">
              {campaign?.description || "Không có mô tả"}
            </Text>
          </VStack>
          {currentStatus && (
            <Badge className={`${getStatusStyle(currentStatus).bg} px-2 py-1 rounded-full shrink-0 min-w-0`}>
              <BadgeText className={`${getStatusStyle(currentStatus).text} text-xs font-medium text-center`}>
                {getStatusDisplay(currentStatus)}
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
            Ngày hẹn: {dayjs(request.appointmentDate).format("DD/MM/YYYY")}
          </Text>
        </HStack>

        {/* Time */}
        <HStack className="items-center" space="sm">
          <Icon as={ClockIcon} size="sm" className="text-red-500 mr-2" />
          <Text className="text-sm text-typography-600">{campaignTime}</Text>
        </HStack>

        {/* Volume */}
        {request.volumeMl && (
          <HStack className="items-center" space="sm">
            <Icon as={DropletIcon} size="sm" className="text-red-500 mr-2" />
            <Text className="text-sm text-typography-600">
              Thể tích: {request.volumeMl} ml
            </Text>
          </HStack>
        )}

        {/* Appointment Date and Note */}
        <VStack space="md">
          {/* <Text className="text-sm text-gray-900">
            Ngày hẹn: {dayjs(request.appointmentDate).format("DD/MM/YYYY")}
          </Text> */}
          {request.note && (
            <Text className="text-sm text-gray-600">
              Ghi chú: {request.note}
            </Text>
          )}
        </VStack>

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
