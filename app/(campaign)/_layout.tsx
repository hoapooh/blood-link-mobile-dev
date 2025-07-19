import { CustomHeader } from "@/components/ui/custom-header";
import { Stack } from "expo-router";

export default function CampaignRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ options }) => <CustomHeader title={options.title || ""} />,
      }}
    >
      <Stack.Screen
        name="[id]"
        options={{ title: "Chi tiết chiến dịch" }} // or "Detail"
      />
    </Stack>
  );
}
