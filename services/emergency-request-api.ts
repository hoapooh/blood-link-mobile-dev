import axiosInstance from "@/config/axios-instance";
import { IEmergencyRequestList } from "@/interfaces/emergency-request";
import { isAxiosError } from "axios";

export const emergencyRequestApi = {
  getAllEmergencyRequests: async (
    params?: Record<string, any>
  ): Promise<IEmergencyRequestList> => {
    try {
      const response = await axiosInstance.get("/emergency-requests", {
        params,
      });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get emergency requests"
        );
      }
      throw error;
    }
  },
};
