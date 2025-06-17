import { IUser } from "@/interfaces/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "blood_link_auth_token";
const USER_INFO_KEY = "blood_link_user_info";

export const clearAuthLocalStorage = async (): Promise<void> => {
	try {
		await AsyncStorage.multiRemove([TOKEN_KEY, USER_INFO_KEY]);
	} catch (error) {
		console.error("Error clearing auth storage:", error);
	}
};

export const getTokenFromLocalStorage = async (): Promise<string | null> => {
	try {
		return await AsyncStorage.getItem(TOKEN_KEY);
	} catch (error) {
		console.error("Error getting token:", error);
		return null;
	}
};

export const setTokenToLocalStorage = async (token: string): Promise<void> => {
	try {
		await AsyncStorage.setItem(TOKEN_KEY, token);
	} catch (error) {
		console.error("Error setting token:", error);
	}
};

export const setUserInfoToLocalStorage = async (userInfo: IUser): Promise<void> => {
	try {
		if (!userInfo) {
			throw new Error("User info cannot be null");
		}
		await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
	} catch (error) {
		console.error("Error setting user info:", error);
		throw error; // Propagate error for handling
	}
};

export const getUserInfoFromLocalStorage = async () => {
	try {
		const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);
		return userInfo ? JSON.parse(userInfo) : null;
	} catch (error) {
		console.error("Error getting user info:", error);
		return null;
	}
};
