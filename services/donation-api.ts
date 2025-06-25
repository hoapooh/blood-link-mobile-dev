import axiosInstance from "@/config/axios-instance";
import { ICreateDonationRequestPayload } from "@/interfaces/donation-request";
import { isAxiosError } from "axios";

export const donationApi = {
  createDonationRequest: async (data: ICreateDonationRequestPayload) => {
		try {
			const response = await axiosInstance.post("/donations/requests", data);
			console.log("Response from createDonationRequest:", response.data);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to create request");
			}
			throw error;
		}
	},
};
