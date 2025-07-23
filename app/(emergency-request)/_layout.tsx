import { Stack } from "expo-router";

export default function EmergencyRequestLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ef4444",
        },
        headerTintColor: "#fff",
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
