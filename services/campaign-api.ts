import { isAxiosError } from "axios";

import axiosInstance from "@/config/axios-instance";

import { ICampaignDetail, ICampaignList } from "../interfaces/campaign";

export const campaignApi = {
	getAllCampaign: async (params?: Record<string, any>): Promise<ICampaignList> => {
		try {
			const response = await axiosInstance.get("/campaigns", { params });
			return response.data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get campaigns");
			}
			throw error;
		}
	},

	getCampaignById: async (campaignId: string): Promise<ICampaignDetail> => {
		try {
			const response = await axiosInstance.get(`/campaigns/${campaignId}`);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get campaign by ID");
			}
			throw error;
		}
	},
};
