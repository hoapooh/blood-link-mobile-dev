import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useGetReminders } from "@/features/reminders/hooks";
import { IReminderData } from "@/interfaces/reminder";
import dayjs from "dayjs";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";

const RemindersPage: React.FC = () => {
  const { reminders, isLoading, refetch } = useGetReminders();

  const getReminderTitle = (reminder: IReminderData): string => {
    if (reminder.type === "before_donation" && reminder.metadata.campaignName) {
      return `Bạn vừa đăng ký cho ${reminder.metadata.campaignName}`;
    } else if (reminder.type === "after_donation") {
      return "Hiến máu hoàn thành";
    }
    return "Thông báo";
  };

  const formatReminderTime = (createdAt: string): string => {
    return dayjs(createdAt).format("DD/MM/YYYY HH:mm");
  };

  

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center bg-gray-50 p-6">
        <Spinner size="large" className="text-red-500" />
        <Text className="text-lg text-gray-600 mt-4">Đang tải thông báo...</Text>
      </Box>
    );
  }

  return (
    <Box className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <VStack space="lg">
          
          {/* Reminders List */}
          {reminders.length === 0 ? (
            <Card className="p-8 bg-white border border-outline-200 rounded-xl shadow-sm">
              <VStack className="items-center justify-center" space="md">
                <Text className="text-6xl">🔔</Text>
                <Text className="text-xl font-bold text-gray-900 text-center">
                  Không có thông báo
                </Text>
                <Text className="text-base text-gray-600 text-center max-w-sm">
                  Bạn sẽ nhận được thông báo khi có cập nhật mới về các chiến dịch hiến máu
                </Text>
              </VStack>
            </Card>
          ) : (
            <VStack space="md">
              <Text className="text-lg font-bold text-gray-900 px-2">
                Danh sách thông báo ({reminders.length})
              </Text>
              
              {reminders.map((reminder) => (
                <Card
                  key={reminder.id}
                  className="p-6 bg-white border border-outline-200 rounded-xl shadow-sm"
                >
                  <VStack space="md">
                    {/* Header with Icon and Title */}
                    <HStack className="items-start" space="md">
                      
                      <VStack className="flex-1" space="xs">
                        <Text className="text-lg font-bold text-red-600">
                          {getReminderTitle(reminder)}
                        </Text>
                        <Text className="text-sm text-gray-500">
                          {formatReminderTime(reminder.createdAt)}
                        </Text>
                      </VStack>
                    </HStack>

                    {/* Message */}
                    <Box className="bg-gray-50 p-4 rounded-lg">
                      <Text className="text-sm text-gray-700 leading-relaxed">
                        {reminder.message}
                      </Text>
                    </Box>
                    
                  </VStack>
                </Card>
              ))}
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default RemindersPage;
