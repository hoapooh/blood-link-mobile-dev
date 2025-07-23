import EmergencyRequestDetail from "@/features/request/ui/components/emergency-request-detail";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const EmergencyRequestDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text>Invalid request ID</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <EmergencyRequestDetail requestId={id} />
    </View>
  );
};

export default EmergencyRequestDetailScreen;
