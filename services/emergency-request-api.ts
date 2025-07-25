import axiosInstance from "@/config/axios-instance";
import { CreateEmergencyRequestDto } from "@/interfaces/create-emergency-request";
import { IEmergencyRequestData, IEmergencyRequestList } from "@/interfaces/emergency-request";
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

  createEmergencyRequest: async (
    requestData: CreateEmergencyRequestDto
  ): Promise<IEmergencyRequestData> => {
    try {
      const response = await axiosInstance.post("/emergency-requests", requestData);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create emergency request"
        );
      }
      throw error;
    }
  },

  getEmergencyRequestById: async (
    requestId: string
  ): Promise<{ success: boolean; message: string; data: IEmergencyRequestData }> => {
    try {
      const response = await axiosInstance.get(`/emergency-requests/${requestId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get emergency request details"
        );
      }
      throw error;
    }
  },
};
