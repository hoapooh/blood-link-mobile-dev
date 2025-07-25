import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import type { IDonationRequestData } from "@/interfaces/donation-request";
import { useRouter } from "expo-router";
import React from "react";
import useGetDonationHistory from "../../hooks/use-get-donation-history";
import DonationRequestCard from "./donation-card";

const DonationList = () => {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch } = useGetDonationHistory();

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

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f] px-6">
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
    );
  }

  return (
    <Box className="flex-1 w-full min-h-0">
      {data?.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-600">Chưa có yêu cầu nào</Text>
        </View>
      ) : (
        <VStack space="xl">
          {data.map((request: IDonationRequestData) => (
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
