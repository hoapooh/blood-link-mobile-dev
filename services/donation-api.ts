import axiosInstance from "@/config/axios-instance";
import { IBase } from "@/interfaces/base";
import {
	ICreateDonationRequestPayload,
	IDonationRequest,
	IDonationRequestHistory,
	IDonationRequestResult,
} from "@/interfaces/donation-request";
import { isAxiosError } from "axios";

export const donationApi = {
  createDonationRequest: async (data: ICreateDonationRequestPayload) => {
    try {
      const response = await axiosInstance.post("/donations/requests", data);
    //   console.log("Response from createDonationRequest:", response.data);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to create request"
        );
      }
      throw error;
    }
  },
  getMyAllRequest: async (
    params?: Record<string, any>
  ): Promise<IDonationRequestHistory> => {
    try {
      const response = await axiosInstance.get("/donations/my-requests", {
        params,
      });
      // console.log("Response from API:", response.data.data);
      return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data.items,
      };
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get request history"
        );
      }
      throw error;
    }
  },

  getMyRequestHistoryById: async (
    donationId: string
  ): Promise<IDonationRequest> => {
    try {
      const response = await axiosInstance.get(
        `/donations/my-requests/${donationId}`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get my request by ID"
        );
      }
      throw error;
    }
  },

  getDonationResult: async (
    donationId: string
  ): Promise<IBase<IDonationRequestResult>> => {
    try {
      const response = await axiosInstance.get(
        `/donations/my-requests/${donationId}/result`
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to get donation result"
        );
      }
      throw error;
    }
  },
};
