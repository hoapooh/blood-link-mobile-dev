// (request)/_layout.tsx
import { Stack } from "expo-router";

export default function RequestRoutesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
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
