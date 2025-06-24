import axiosInstance from "@/config/axios-instance";
import {
	BloodGroup,
	BloodRh,
	BloodTypeComponent,
	IBloodCompatibility,
	IBloodInfo,
	IBloodInfoList,
} from "@/interfaces/blood";
import { isAxiosError } from "axios";

export const bloodInfoApi = {
	getAllBloodInfo: async (): Promise<IBloodInfoList> => {
		try {
			const response = await axiosInstance.get("/blood-info");

			return response.data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get blood info");
			}
			throw error;
		}
	},
	getBloodInfo: async (path: { group: BloodGroup; rh: BloodRh }): Promise<IBloodInfo> => {
		try {
			const response = await axiosInstance.get(`/blood-info/${path.group}/${path.rh}`);

			return response.data.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get blood info");
			}
			throw error;
		}
	},
	getBloodCompatibility: async (
		path: { group: BloodGroup; rh: BloodRh },
		params?: { componentType: BloodTypeComponent }
	): Promise<IBloodCompatibility> => {
		try {
			const response = await axiosInstance.get(
				`/blood-info/${path.group}/${path.rh}/compatibility`,
				{
					params,
				}
			);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get blood compatibility");
			}
			throw error;
		}
	},
	getBloodCompatibleDonors: async (path: {
		group: BloodGroup;
		rh: BloodRh;
		componentType: BloodTypeComponent;
	}): Promise<IBloodCompatibility> => {
		try {
			const response = await axiosInstance.get(
				`/blood-info/${path.group}/${path.rh}/compatible-donors/${path.componentType}`
			);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get blood compatibility");
			}
			throw error;
		}
	},
	getBloodCompatibleRecipients: async (path: {
		group: BloodGroup;
		rh: BloodRh;
		componentType: BloodTypeComponent;
	}): Promise<IBloodCompatibility> => {
		try {
			const response = await axiosInstance.get(
				`/blood-info/${path.group}/${path.rh}/compatible-recipients/${path.componentType}`
			);

			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get blood compatibility");
			}
			throw error;
		}
	},
};
