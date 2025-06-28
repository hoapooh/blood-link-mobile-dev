// (request)/index.tsx
import DonationHistoryPage from "@/features/donation-history/ui/layout/donation-history-page";
import React from "react";
import { View } from "react-native";

const RequestListPage = () => {
  return (
    <View className="flex-1 bg-[#fffafa] dark:bg-[#1f1f1f]">
      <DonationHistoryPage />
    </View>
  );
};

export default RequestListPage;
