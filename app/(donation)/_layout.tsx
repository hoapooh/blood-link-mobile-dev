import { Stack } from "expo-router";

export default function DonationLayout() {
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
          title: "Chi tiết đăng ký",
          headerBackTitle: "Quay lại",
        }}
      />
    </Stack>
  );
}
