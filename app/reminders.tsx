import RemindersPage from "@/features/reminders/ui/pages/reminders-page";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const RemindersScreen = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: "Thông báo",
          headerStyle: {
            backgroundColor: "#fffafa",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#111827",
          },
          headerTintColor: "#ef4444",
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{ marginLeft: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#ef4444" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />
      <RemindersPage />
    </>
  );
};

export default RemindersScreen;
