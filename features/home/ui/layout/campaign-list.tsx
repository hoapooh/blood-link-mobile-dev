import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import CampaignCard from "../components/campaign-card";

// Sample campaigns
const campaigns = [
  {
    id: "1",
    name: "Downtown Blood Drive",
    description: "Join us in saving lives at the downtown center.",
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    location: "Downtown Health Center",
  },
  {
    id: "2",
    name: "University Health Campaign",
    description: "Donate blood at the university's main hall.",
    startDate: "2025-06-15",
    endDate: "2025-06-16",
    location: "University Main Hall",
  },
];

const CampaignList = () => {
  return (
    <Box className="flex-1 bg-gray-100 p-4 w-full">
      <VStack space="xl">
        {campaigns.map((item) => (
          <CampaignCard
            key={item.id}
            name={item.name}
            description={item.description}
            startDate={item.startDate}
            endDate={item.endDate}
            location={item.location}
            onRequest={() => console.log("Request sent for:", item.name)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CampaignList;
