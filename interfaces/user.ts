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
	bloodType: string | null;
	firstName: string | null;
	lastName: string | null;
	phone: string | null;
	longitude: number | null;
	latitude: number | null;
	wardCode: string | null;
	districtCode: string | null;
	provinceCode: string | null;
	wardName: string | null;
	districtName: string | null;
	provinceName: string | null;
	status: string | null;
}

export type IUser = IBase<IUserData>;

// PATCH
export interface IUserUpdate {
	firstName?: string | null;
	lastName?: string | null;
	phone?: string | null;
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
