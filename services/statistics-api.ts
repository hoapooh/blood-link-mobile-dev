import axiosInstance from "@/config/axios-instance";
import { IStatisticsResponse } from "@/interfaces/statistics";
import { isAxiosError } from "axios";

export const statisticsApi = {
  getStatistics: async (): Promise<IStatisticsResponse> => {
    try {
      const response = await axiosInstance.get("/statistics");
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get statistics"
        );
      }
      throw error;
    }
  },
};
