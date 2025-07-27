import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { RequestStatus } from "@/interfaces/donation-request";
import { ChevronDownIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useGetDonationHistory from "../../hooks/use-get-donation-history";
import DonationList from "./donation-list";

const DonationSearchLayout = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  const { data, isLoading, isError, error, refetch } = useGetDonationHistory({
    status: statusFilter || undefined,
  });

  const handleClearStatus = () => {
    setStatusFilter("");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case RequestStatus.completed:
        return "Hoàn thành";
      case RequestStatus.result_returned:
        return "Đã trả kết quả";
      case RequestStatus.appointment_confirmed:
        return "Đã xác nhận lịch hẹn";
      case RequestStatus.appointment_cancelled:
        return "Đã hủy lịch hẹn";
      case RequestStatus.appointment_absent:
        return "Vắng mặt";
      case RequestStatus.customer_cancelled:
        return "Khách hàng hủy";
      case RequestStatus.customer_checked_in:
        return "Đã check-in";
      case RequestStatus.not_qualified:
        return "Không đủ điều kiện";
      case RequestStatus.no_show_after_checkin:
        return "Không xuất hiện sau check-in";
      default:
        return status;
    }
  };

  const getDisplayValue = () => {
    if (!statusFilter) return "";
    return getStatusLabel(statusFilter);
  };

  if (isError) {
    return (
      <Box className="flex-1 w-full min-h-0">
        <Text className="text-lg font-semibold text-typography-900 mb-2 px-4 pt-4">
          Lịch sử hiến máu
        </Text>
        <View className="flex-1 items-center justify-center bg-background-50 px-6">
          <Text className="text-red-500 text-center mb-4">
            {error instanceof Error
              ? error.message
              : "Không thể tải lịch sử hiến máu"}
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="bg-red-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">Thử lại</Text>
          </TouchableOpacity>
        </View>
      </Box>
    );
  }

  return (
    <Box className="flex-1 w-full min-h-0 mt-4">
      
      {/* Filter Section */}
      <VStack space="md" className="mb-4 px-4">
        {/* Status Filter */}
        <HStack className="justify-between items-center">
          <Text className="text-lg font-semibold text-typography-900 mb-2">
            Kết quả tìm kiếm
          </Text>
          <Box className="w-44">
            <Select 
              selectedValue={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger>
                <SelectInput 
                  placeholder="Lọc theo trạng thái" 
                  value={getDisplayValue()}
                  className="text-sm"
                />
                <SelectIcon as={ChevronDownIcon} size="xs" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Tất cả" value="" />
                  <SelectItem label="Hoàn thành" value={RequestStatus.completed} />
                  <SelectItem label="Đã trả kết quả" value={RequestStatus.result_returned} />
                  <SelectItem label="Đã xác nhận lịch hẹn" value={RequestStatus.appointment_confirmed} />
                  <SelectItem label="Đã hủy lịch hẹn" value={RequestStatus.appointment_cancelled} />
                  <SelectItem label="Vắng mặt" value={RequestStatus.appointment_absent} />
                  <SelectItem label="Khách hàng hủy" value={RequestStatus.customer_cancelled} />
                  <SelectItem label="Đã check-in" value={RequestStatus.customer_checked_in} />
                  <SelectItem label="Không đủ điều kiện" value={RequestStatus.not_qualified} />
                  <SelectItem label="Không xuất hiện sau check-in" value={RequestStatus.no_show_after_checkin} />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
          
        </HStack>
        
        {/* Filter Results Info */}
        {statusFilter && (
          <Text className="text-sm text-gray-600 px-1">
            {isLoading ? "Đang lọc..." : 
             `Tìm thấy ${data?.length || 0} lịch sử hiến máu`}
            {statusFilter && ` có trạng thái "${getStatusLabel(statusFilter)}"`}
          </Text>
        )}
      </VStack>
      
      {/* Donation List */}
      <DonationList 
        donations={data || []}
        isLoading={isLoading}
        statusFilter={statusFilter}
        getStatusLabel={getStatusLabel}
        onClearFilters={() => {
          setStatusFilter("");
        }}
      />
    </Box>
  );
};

export default DonationSearchLayout;
