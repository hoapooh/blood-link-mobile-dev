import CampaignDetail from "@/features/campaign-detail/ui/layout/campaign-detail-layout";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";
const Index = () => {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center bg-[#fffafa] dark:bg-[#1f1f1f]">
      <CampaignDetail />
    </View>
  );
};

export default Index;
