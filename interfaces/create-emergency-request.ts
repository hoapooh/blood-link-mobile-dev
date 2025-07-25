import { BloodGroup, BloodRh, BloodTypeComponent } from "./blood";

export interface CreateEmergencyRequestDto {
	requiredVolume: number;
	bloodGroup: BloodGroup;
	bloodRh: BloodRh;
	bloodTypeComponent?: BloodTypeComponent;
	description?: string;
	wardCode?: string;
	districtCode?: string;
	provinceCode?: string;
	wardName?: string;
	districtName?: string;
	provinceName?: string;
	longitude?: string;
	latitude?: string;
}
