import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import type { ICampaignData } from "@/interfaces/campaign";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import useGetCampaigns from "../../hooks/use-get-campaigns";
import CampaignCard from "./campaign-card";

const CampaignList = () => {
  const router = useRouter();
  const { campaigns, isLoading, isError, error, refetch } = useGetCampaigns();
  const handleViewDetails = (id: string) => {
    router.push({ pathname: "/(campaign)/[id]", params: { id } });
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
            : "Không thể tải danh sách chiến dịch"}
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
      <Text className="text-2xl md:text-4xl font-bold px-4 py-6">
        Tất cả chiến dịch
      </Text>
      <VStack space="xl">
        {campaigns?.data.map((item: ICampaignData) => (
          <CampaignCard
            key={item.id}
            id={item.id}
            status={item.status}
            name={item.name}
            banner={item.banner}
            description={item.description}
            startDate={item.startDate}
            endDate={item.endDate}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            location={item.location}
            limitDonation={item.limitDonation}
            enrolled={0}
            onRequest={() => handleViewDetails(item.id)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CampaignList;
