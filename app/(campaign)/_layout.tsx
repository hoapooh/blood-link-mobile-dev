import { Stack } from "expo-router";

export default function CampaignRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{ title: "Chi tiết chiến dịch" }} // or "Detail"
      />
    </Stack>
  );
}
