import axiosInstance from "@/config/axios-instance";
import { isAxiosError } from "axios";
import { ICampaign } from "./../interfaces/campaign";

export const campaignApi = {
  getAllCampaign: async (params?: Record<string, any>): Promise<ICampaign> => {
    try {
      const response = await axiosInstance.get("/campaigns", { params });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get campaigns"
        );
      }
      throw error;
    }
  },

  getCampaignById: async (campaignId: string): Promise<ICampaign> => {
    try {
      const response = await axiosInstance.get(`/campaigns/${campaignId}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get campaign by ID"
        );
      }
      throw error;
    }
  },
};
