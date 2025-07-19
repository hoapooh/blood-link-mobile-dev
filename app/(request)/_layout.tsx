// (request)/_layout.tsx
import { CustomHeader } from "@/components/ui/custom-header";
import { Stack } from "expo-router";

export default function RequestRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ options }) => <CustomHeader title={options.title || ""} />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Lịch sử đăng ký hiến máu" }} 
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Chi tiết" }} 
      />
    </Stack>
  );
}
