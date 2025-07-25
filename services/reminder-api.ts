import axiosInstance from "@/config/axios-instance";
import { IRemindersResponse } from "@/interfaces/reminder";
import { isAxiosError } from "axios";

export const reminderApi = {
  getActiveReminders: async (): Promise<IRemindersResponse> => {
    try {
      const response = await axiosInstance.get("/reminders/my/active");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get reminders"
        );
      }
      throw error;
    }
  },
};
