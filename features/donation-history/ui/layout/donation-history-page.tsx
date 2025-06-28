import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
import DonationList from "../components/donation-list";

export default function DonationHistoryPage() {
  return (
    <Box className="flex flex-col h-full bg-gray-100 w-full">
      <ScrollView className="flex-1 w-full">

        {/* List section */}
        <Box className="flex-1 px-4 pb-4 min-h-0">
          <DonationList />
        </Box>
      </ScrollView>
    </Box>
  );
}
