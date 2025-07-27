import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { CampaignStatus } from "@/interfaces/campaign";
import { ChevronDownIcon, SearchIcon } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import useGetCampaigns from "../../hooks/use-get-campaigns";
import CampaignList from "./campaign-list";

const CampaignSearchLayout = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  
  // Current search term used for API call
  const [currentSearch, setCurrentSearch] = useState("");
  
  const { campaigns, isLoading, isError, error, refetch } = useGetCampaigns({
    search: currentSearch || undefined,
    status: statusFilter || undefined,
  });

  const handleSearch = () => {
    setCurrentSearch(searchText);
  };

  const handleClearStatus = () => {
    setStatusFilter("");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case CampaignStatus.active:
        return "Hoạt động";
      case CampaignStatus.not_started:
        return "Chưa bắt đầu";
      case CampaignStatus.ended:
        return "Đã kết thúc";
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
        <Text className="text-2xl md:text-4xl font-bold px-4 py-6 text-center text-red-600">
          Các chiến dịch hiến máu
        </Text>
        <View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f] px-6">
          <Text className="text-red-500 text-center mb-4">
            {error instanceof Error
              ? error.message
              : "Không thể tải danh sách chiến dịch"}
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
    <Box className="flex-1 w-full min-h-0">
      <Text className="text-2xl md:text-4xl font-bold px-4 py-6 text-center text-red-600">
        Các chiến dịch hiến máu
      </Text>
      
      {/* Search and Filter Section */}
      <VStack space="md" className="mb-4">
        {/* Search Input */}
        <HStack className="items-center space-x-2">
          <Box className="flex-1 relative">
            <Input className="pr-10">
              <InputField
                placeholder="Tìm kiếm chiến dịch..."
                value={searchText}
                onChangeText={setSearchText}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
              />
            </Input>
          </Box>
          <Button
            onPress={handleSearch}
            className="bg-red-600"
          >
            <Icon as={SearchIcon} size="sm" className="text-white mr-1" />
            <ButtonText className="text-white">Tìm</ButtonText>
          </Button>
        </HStack>
        
        {/* Title and Status Filter */}
        <HStack className="justify-between items-center">
          <Text className="text-xl font-bold">
            Kết quả tìm kiếm
          </Text>
          <HStack className="items-center space-x-2">
            <Box className="w-32">
              <Select 
                selectedValue={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectInput 
                    placeholder="Trạng thái" 
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
                    <SelectItem label="Hoạt động" value={CampaignStatus.active} />
                    <SelectItem label="Chưa bắt đầu" value={CampaignStatus.not_started} />
                    <SelectItem label="Đã kết thúc" value={CampaignStatus.ended} />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </Box>
        
          </HStack>
        </HStack>
        
        {/* Search Results Info */}
        {(currentSearch || statusFilter) && (
          <Text className="text-sm text-gray-600 px-1">
            {isLoading ? "Đang tìm kiếm..." : 
             `Tìm thấy ${campaigns?.length || 0} chiến dịch`}
            {currentSearch && ` với từ khóa "${currentSearch}"`}
            {statusFilter && ` có trạng thái "${getStatusLabel(statusFilter)}"`}
          </Text>
        )}
      </VStack>
      
      {/* Campaign List */}
      <CampaignList 
        campaigns={campaigns || []}
        isLoading={isLoading}
        currentSearch={currentSearch}
        statusFilter={statusFilter}
        getStatusLabel={getStatusLabel}
        onClearFilters={() => {
          setSearchText("");
          setCurrentSearch("");
          setStatusFilter("");
        }}
      />
    </Box>
  );
};

export default CampaignSearchLayout;
