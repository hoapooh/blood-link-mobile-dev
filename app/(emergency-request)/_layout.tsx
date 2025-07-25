import { Stack } from "expo-router";

export default function EmergencyRequestLayout() {
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
          title: "Chi tiết yêu cầu khẩn cấp",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
}
