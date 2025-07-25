import { DonationDetail } from "@/features/donation-history";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

const DonationDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 bg-gray-50">
      <DonationDetail donationId={id || ""} />
    </View>
  );
};

export default DonationDetailScreen;
