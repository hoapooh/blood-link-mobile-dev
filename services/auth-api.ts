import axiosInstance from "@/config/axios-instance";
import { IUser, IUserUpdate } from "@/interfaces/user";
import { isAxiosError } from "axios";

export const authApi = {
	getCurrentProfile: async (): Promise<IUser> => {
		try {
			const response = await axiosInstance.get("/customers/me");
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get user");
			}
			throw error;
		}
	},

	updateCurrentProfile: async (data: IUserUpdate) => {
		try {
			const response = await axiosInstance.patch("/customers/me", data);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to update user");
			}
			throw error;
		}
	},
};
