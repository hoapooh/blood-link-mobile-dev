import { IBase } from "./base";
import { BloodGroup, BloodRh } from "./blood";

export interface IUserData {
	id: string;
	createdAt: string;
	updatedAt: string;
	account: {
		id: string;
		createdAt: string;
		updatedAt: string;
		email: string;
		role: string;
	};
	bloodType: {
		group: BloodGroup | null;
		rh: BloodRh | null;
	} | null;
	firstName: string | null;
	lastName: string | null;
	gender: "male" | "female" | "other" | null;
	phone: string | null;
	dateOfBirth: string | null;
	citizenId: string | null;
	longitude: string | null;
	latitude: string | null;
	wardCode: string | null;
	districtCode: string | null;
	provinceCode: string | null;
	wardName: string | null;
	districtName: string | null;
	provinceName: string | null;
	lastDonationDate: string | null;
	status: string | null;
}

// PATCH
export interface IUserUpdate {
	firstName?: string | null;
	lastName?: string | null;
	phone?: string | null;
	gender?: "male" | "female" | "other" | null;
	dateOfBirth?: string | null;
	citizenId?: string | null;
	longitude?: string | null;
	latitude?: string | null;
	wardCode?: string | null;
	districtCode?: string | null;
	provinceCode?: string | null;
	wardName?: string | null;
	districtName?: string | null;
	provinceName?: string | null;
	bloodGroup?: BloodGroup | null;
	bloodRh?: BloodRh | null;
}

// GET
export interface IUserFindNearByParams {
	radius: number;
	bloodRh: BloodRh;
	bloodGroup: BloodGroup;
}

export interface IUserFindNearByData {
	customers: IUserData[];
}

// Types Export
export type IUser = IBase<IUserData>;
export type IUserFindNearBy = IBase<IUserFindNearByData>;
