import { Box } from "@/components/ui/box";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import useGetCampaignById from "../../hooks/use-get-campaign-by-id";
import BannerImage from "../components/BannerImage";
import CampaignDetailSection from "../components/campaign-detail-content";
import DonationRequestModal from "../components/registration-form";

interface RegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bloodType: string;
  phoneNumber: string;
  email: string;
}

export default function CampaignDetail() {
  const { id } = useLocalSearchParams();
  const { campaign, isLoading, isError, error, refetch } = useGetCampaignById(
    id as string
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleRegistration = () => {
  console.log("Registration button clicked");
  setIsFormOpen(true);
};
  const handleFormClose = () => setIsFormOpen(false);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }

  if (isError || !campaign) {
    return (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-500 text-center mb-4">
          {error instanceof Error
            ? error.message
            : "Không thể tải thông tin chiến dịch"}
        </Text>
        <Text onPress={() => refetch()} className="text-blue-500 underline">
          Thử lại
        </Text>
      </View>
    );
  }
  // console.log("Fetched campaign data in parent:", campaign);
  return (
    <Box className="flex flex-col h-full bg-gray-100 w-full">
      <ScrollView className="flex-1 w-full">
        <BannerImage
          imageUrl={campaign?.banner}
          title={campaign.name}
          height={250}
        />
        <CampaignDetailSection
          campaign={campaign}
          enrolled={0}
          onRegisterClick={handleRegistration}
        />
        <DonationRequestModal
          isOpen={isFormOpen}
          onClose={handleFormClose}
          campaign={campaign}
        />
      </ScrollView>
      
    </Box>
  );
}
