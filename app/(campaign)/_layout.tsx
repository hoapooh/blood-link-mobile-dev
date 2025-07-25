import { Stack } from "expo-router";

export default function CampaignRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#fffafa",
        },
        headerTintColor: "#ef4444",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{
          title: "Chi tiết chiến dịch",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
}
