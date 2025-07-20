import { Stack } from "expo-router";

export default function DonationLayout() {
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
          title: "Chi tiết đăng ký",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
}
