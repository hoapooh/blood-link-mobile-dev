import { isAxiosError } from "axios";

import axiosInstance from "@/config/axios-instance";
import { IUser, IUserFindNearBy, IUserFindNearByParams, IUserUpdate } from "@/interfaces/user";

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
			const response = await axiosInstance.put("/customers/me", data);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to update user");
			}
			throw error;
		}
	},

	findNearByUsers: async (params: IUserFindNearByParams): Promise<IUserFindNearBy> => {
		try {
			const response = await axiosInstance.post("/customers/find-by-blood-type", params);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to find nearby users");
			}
			throw error;
		}
	},
};
