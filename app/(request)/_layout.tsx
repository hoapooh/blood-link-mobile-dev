// (request)/_layout.tsx
import { Stack } from "expo-router";

export default function RequestRoutesLayout() {
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
        name="index"
        options={{ title: "Lịch sử đăng ký hiến máu" }} 
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Chi tiết",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
}
