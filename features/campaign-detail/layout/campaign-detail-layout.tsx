import { Box } from "@/components/ui/box";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import BannerImage from "../components/BannerImage";
import CampaignDetailSection from "../components/campaign-detail-content";
import RegistrationForm from "../components/registration-form";
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
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  
    const handleRegistration = () => {
        setIsFormOpen(true);
    };
  
    const handleFormSubmit = (requestData: RegistrationData) => {
        console.log("Registration form submitted:", requestData);
        setIsFormOpen(false);
    };
  
    const handleFormClose = () => {
        setIsFormOpen(false);
    };
    
  return (
    <Box className="flex flex-col h-full bg-gray-100 w-full">
      <ScrollView className="flex-1 w-full">
        <BannerImage
          imageUrl={require("@/assets/images/banner.jpg")}
          title="Join the Lifesaving Mission"
          height={250}
        />
        <CampaignDetailSection
          name="Blood Drive - Hanoi"
          description="Join our community blood drive and help save lives. Every drop counts."
          startDateTime="2025-06-19T08:00:00Z"
          endDateTime="2025-06-19T11:30:00Z"
          address="Blood Center, Hanoi"
          enrolled={32}
          maxEnrolled={50}
          onRegisterClick={handleRegistration}
        />
        <RegistrationForm isOpen={isFormOpen} onClose={handleFormClose} onSubmit={handleFormSubmit} />
      </ScrollView>
    </Box>
  );
}
