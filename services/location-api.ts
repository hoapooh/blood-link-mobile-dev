import axiosInstance from "@/config/axios-instance";
import { IDistrict, IProvince, IWard } from "@/interfaces/location";
import { isAxiosError } from "axios";

export const locationApi = {
	getAllProvinces: async (): Promise<IProvince> => {
		try {
			const response = await axiosInstance.get("/location/provinces");
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get provinces");
			}
			throw error;
		}
	},

	getDistrictsByProvinceId: async (provinceId: string): Promise<IDistrict> => {
		try {
			const response = await axiosInstance.get(`/location/districts/${provinceId}`);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get districts");
			}
			throw error;
		}
	},

	getWardsByDistrictId: async (districtId: string): Promise<IWard> => {
		try {
			const response = await axiosInstance.get(`/location/wards/${districtId}`);
			return response.data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw new Error(error.response?.data?.message || "Failed to get wards");
			}
			throw error;
		}
	},
};
