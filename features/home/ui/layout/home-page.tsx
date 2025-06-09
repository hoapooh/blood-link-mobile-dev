import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
import HomeBanner from "../components/banner";
import CampaignList from "../components/campaign-list";

export default function HomePage() {
  return (
    <Box className="flex flex-col h-full bg-gray-100 p-4 w-full">
      <ScrollView className="flex-1 w-full">
        <HomeBanner />
        <Box className="flex-1 mt-6 mb-4 min-h-0">
          <CampaignList />
        </Box>
      </ScrollView>
    </Box>
  );
}
