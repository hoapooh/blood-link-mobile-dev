import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { EmergencyRequestStatus } from "@/interfaces/emergency-request";
import { ChevronDownIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useGetEmergencyRequests } from "../../hooks";
import MyRequests from "./my-requests";

const EmergencyRequestSearchLayout = () => {
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  const { emergencyRequests, isLoading, isError, error, refetch } = useGetEmergencyRequests({
    status: statusFilter || undefined,
  });

  const handleClearStatus = () => {
    setStatusFilter("");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case EmergencyRequestStatus.pending:
        return "Đang chờ";
      case EmergencyRequestStatus.approved:
        return "Đã duyệt";
      case EmergencyRequestStatus.rejected:
        return "Bị từ chối";
      case EmergencyRequestStatus.contacts_provided:
        return "Đã cung cấp danh bạ";
      case EmergencyRequestStatus.expired:
        return "Đã hết hạn";
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
          Yêu cầu khẩn cấp của tôi
        </Text>
        <View className="flex-1 items-center justify-center bg-background-50 px-6">
          <Text className="text-red-500 text-center mb-4">
            {error instanceof Error
              ? error.message
              : "Không thể tải yêu cầu khẩn cấp"}
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
          <Box className="w-40">
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
                  <SelectItem label="Đang chờ" value={EmergencyRequestStatus.pending} />
                  <SelectItem label="Đã duyệt" value={EmergencyRequestStatus.approved} />
                  <SelectItem label="Bị từ chối" value={EmergencyRequestStatus.rejected} />
                  <SelectItem label="Đã cung cấp danh bạ" value={EmergencyRequestStatus.contacts_provided} />
                  <SelectItem label="Đã hết hạn" value={EmergencyRequestStatus.expired} />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
          
        </HStack>
        
        {/* Filter Results Info */}
        {statusFilter && (
          <Text className="text-sm text-gray-600 px-1">
            {isLoading ? "Đang lọc..." : 
             `Tìm thấy ${emergencyRequests?.length || 0} yêu cầu`}
            {statusFilter && ` có trạng thái "${getStatusLabel(statusFilter)}"`}
          </Text>
        )}
      </VStack>
      
      {/* Emergency Request List */}
      <MyRequests 
        emergencyRequests={emergencyRequests || []}
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

export default EmergencyRequestSearchLayout;
