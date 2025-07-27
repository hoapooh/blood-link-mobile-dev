import { VStack } from "@/components/ui/vstack";
import type { ICampaignData } from "@/interfaces/campaign";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import CampaignCard from "./campaign-card";

interface CampaignListProps {
  campaigns: ICampaignData[];
  isLoading: boolean;
  currentSearch: string;
  statusFilter: string;
  getStatusLabel: (status: string) => string;
  onClearFilters: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  isLoading,
  currentSearch,
  statusFilter,
  getStatusLabel,
  onClearFilters,
}) => {
  const router = useRouter();
  
  const handleViewDetails = (id: string) => {
    router.push({ pathname: "/(campaign)/[id]", params: { id } });
  };

  return (
    <VStack space="xl">
      {isLoading ? (
        <View className="px-6 py-8">
          <ActivityIndicator size="large" color="#ef4444" />
        </View>
      ) : campaigns && campaigns.length > 0 ? (
        campaigns.map((item: ICampaignData) => (
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
            bloodCollectionDate={item.bloodCollectionDate}
            onRequest={() => handleViewDetails(item.id)}
          />
        ))
      ) : !isLoading ? (
        <View className="flex-1 items-center justify-center py-12">
          <Text className="text-gray-500 text-center">
            {(currentSearch || statusFilter) 
              ? "Không tìm thấy chiến dịch nào phù hợp"
              : "Chưa có chiến dịch nào"
            }
          </Text>
          
        </View>
      ) : null}
    </VStack>
  );
};

export default CampaignList;
