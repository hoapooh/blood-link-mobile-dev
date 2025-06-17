import { IBase } from "./base";

// Generic base location item interface
export interface ILocationItem {
	id: string;
	name: string;
	name_en: string;
	full_name: string;
	full_name_en: string;
	latitude: string;
	longitude: string;
}

// Generic location data response interface
export interface ILocationData<T extends ILocationItem> {
	isError: number;
	message: string;
	result: T[];
}

// Province interfaces
export type IProvinceItem = ILocationItem;

export type IProvinceData = ILocationData<IProvinceItem>;

export type IProvince = IBase<IProvinceData>;

// District interfaces
export type IDistrictItem = ILocationItem;

export type IDistrictData = ILocationData<IDistrictItem>;

export type IDistrict = IBase<IDistrictData>;

// Ward interfaces
export type IWardItem = ILocationItem;

export type IWardData = ILocationData<IWardItem>;

export type IWard = IBase<IWardData>;
