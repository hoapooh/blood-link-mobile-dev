import { Box } from "@/components/ui/box";
import { useGetReminders } from "@/features/reminders/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const NotificationBell: React.FC = () => {
  const router = useRouter();
  const { reminders } = useGetReminders();

  const handlePress = () => {
    router.push("/reminders");
  };

  return (
    <TouchableOpacity onPress={handlePress} className="mr-4">
      <Box className="relative">
        <Ionicons name="notifications-outline" size={24} color="#ef4444" />
      </Box>
    </TouchableOpacity>
  );
};

export default NotificationBell;
