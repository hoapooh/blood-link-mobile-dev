import { IBase } from "./base";

export enum BloodGroup {
	A = "A",
	B = "B",
	AB = "AB",
	O = "O",
}

export enum BloodRh {
	POSITIVE = "+",
	NEGATIVE = "-",
}

export enum BloodTypeComponent {
	WHOLE_BLOOD = "whole_blood",
	PLASMA = "plasma",
	RED_CELLS = "red_cells",
	PLATELETS = "platelets",
}

export interface IBloodInfoData {
	group: BloodGroup;
	rh: BloodRh;
	description: string;
	characteristics: string;
	canDonateTo: string;
	canReceiveFrom: string;
	frequency: string;
	specialNotes: string;
}

export interface IBloodCompatibilityData {
	componentType: BloodTypeComponent;
	compatibleDonors: IBloodInfoData[];
	compatibleRecipients: IBloodInfoData[];
}

export type IBloodInfoList = IBase<IBloodInfoData[]>;
export type IBloodInfo = IBase<IBloodInfoData>;
export type IBloodCompatibility = IBase<[IBloodCompatibilityData]>;
