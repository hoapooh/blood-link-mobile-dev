import { IBase } from "./base";

export interface IUserData {
	id: string;
	name: string;
	email: string;
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
