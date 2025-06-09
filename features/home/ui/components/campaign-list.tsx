import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import CampaignCard from "./campaign-card";


const campaigns = [
  {
    id: "1",
    name: "Downtown Blood Drive",
    description: "Join us in saving lives at the downtown center.",
    startDateTime: "2025-06-09T09:00:00Z",
    endDateTime: "2025-06-09T17:00:00Z",
    address: "Downtown Health Center",
    enrolled: 200,
    maxEnrolled: 200,
  },
  {
    id: "2",
    name: "University Health Campaign",
    description: "Donate blood at the university's main hall.",
    startDateTime: "2025-06-01T10:00:00Z",
    endDateTime: "2025-06-01T16:00:00Z",
    address: "University Main Hall",
    enrolled: 60,
    maxEnrolled: 150,
  },
  {
    id: "3",
    name: "Community Outreach Program",
    description: "A local effort to support hospitals with blood supply.",
    startDateTime: "2025-06-20T08:30:00Z",
    endDateTime: "2025-06-20T15:00:00Z",
    address: "Community Center, Block A",
    enrolled: 45,
    maxEnrolled: 100,
  },
];

const CampaignList = () => {
  return (
    <Box className="flex-1 w-full min-h-0">
      <VStack space="xl">
        {campaigns.map((item) => (
          <CampaignCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            startDateTime={item.startDateTime}
            endDateTime={item.endDateTime}
            address={item.address}
            enrolled={item.enrolled}
            maxEnrolled={item.maxEnrolled}
            onRequest={() => console.log("Request sent for:", item.name)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CampaignList;
