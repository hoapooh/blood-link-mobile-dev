import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator, Text, View } from "react-native";

import type { IDonationRequestData } from "@/interfaces/donation-request";
import { useRouter } from "expo-router";
import React from "react";
import DonationRequestCard from "./donation-card";

interface DonationListProps {
  donations: IDonationRequestData[];
  isLoading: boolean;
  statusFilter: string;
  getStatusLabel: (status: string) => string;
  onClearFilters: () => void;
}

const DonationList: React.FC<DonationListProps> = ({
  donations,
  isLoading,
  statusFilter,
  getStatusLabel,
  onClearFilters,
}) => {
  const router = useRouter();

  const handleViewDetails = (id: string | null) => {
    if (id) {
      router.push({ pathname: "/(donation)/[id]", params: { id } });
    }
  };

  if (isLoading) {
    return (
      <View className="px-6 py-8">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  return (
    <Box className="flex-1 w-full min-h-0">
      {donations?.length === 0 && !isLoading ? (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-gray-500 text-center">
            {statusFilter 
              ? "Không tìm thấy lịch sử hiến máu phù hợp"
              : "Chưa có lịch sử hiến máu"
            }
          </Text>
          <Text className="text-sm text-gray-400 text-center mt-2">
            {statusFilter 
              ? "Thử thay đổi bộ lọc trạng thái để xem thêm kết quả."
              : "Lịch sử hiến máu của bạn sẽ xuất hiện ở đây sau khi bạn tham gia hiến máu."
            }
          </Text>
        </View>
      ) : (
        <VStack space="xl">
          {donations.map((request: IDonationRequestData) => (
            <DonationRequestCard
              key={request.id || Math.random().toString()}
              request={request}
              onView={() => handleViewDetails(request.id)}
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default DonationList;
