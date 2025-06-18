import { IDistrictItem, IProvinceItem, IWardItem } from "@/interfaces/location";
import { locationApi } from "@/services/location-api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface SelectedLocation {
	province?: IProvinceItem;
	district?: IDistrictItem;
	ward?: IWardItem;
}

export const useLocationPicker = (initialLocation?: SelectedLocation) => {
	const [selectedProvince, setSelectedProvince] = useState<IProvinceItem | undefined>(
		initialLocation?.province
	);
	const [selectedDistrict, setSelectedDistrict] = useState<IDistrictItem | undefined>(
		initialLocation?.district
	);
	const [selectedWard, setSelectedWard] = useState<IWardItem | undefined>(initialLocation?.ward);

	// Fetch provinces
	const {
		data: provincesData,
		isLoading: provincesLoading,
		isError: provincesError,
	} = useQuery({
		queryKey: ["provinces"],
		queryFn: () => locationApi.getAllProvinces(),
	});

	// Fetch districts when province is selected
	const {
		data: districtsData,
		isLoading: districtsLoading,
		isError: districtsError,
	} = useQuery({
		queryKey: ["districts", selectedProvince?.id],
		queryFn: () => locationApi.getDistrictsByProvinceId(selectedProvince!.id),
		enabled: !!selectedProvince?.id,
	});

	// Fetch wards when district is selected
	const {
		data: wardsData,
		isLoading: wardsLoading,
		isError: wardsError,
	} = useQuery({
		queryKey: ["wards", selectedDistrict?.id],
		queryFn: () => locationApi.getWardsByDistrictId(selectedDistrict!.id),
		enabled: !!selectedDistrict?.id,
	});

	const provinces = provincesData?.data?.result || [];
	const districts = districtsData?.data?.result || [];
	const wards = wardsData?.data?.result || [];

	const handleProvinceSelect = (province: IProvinceItem) => {
		setSelectedProvince(province);
		setSelectedDistrict(undefined); // Reset district when province changes
		setSelectedWard(undefined); // Reset ward when province changes
	};

	const handleDistrictSelect = (district: IDistrictItem) => {
		setSelectedDistrict(district);
		setSelectedWard(undefined); // Reset ward when district changes
	};

	const handleWardSelect = (ward: IWardItem) => {
		setSelectedWard(ward);
	};

	const resetSelection = () => {
		setSelectedProvince(undefined);
		setSelectedDistrict(undefined);
		setSelectedWard(undefined);
	};

	const isComplete = selectedProvince && selectedDistrict && selectedWard;

	return {
		// Data
		provinces,
		districts,
		wards,

		// Selected values
		selectedProvince,
		selectedDistrict,
		selectedWard,

		// Handlers
		handleProvinceSelect,
		handleDistrictSelect,
		handleWardSelect,
		resetSelection,

		// Loading states
		provincesLoading,
		districtsLoading,
		wardsLoading,

		// Error states
		provincesError,
		districtsError,
		wardsError,

		// Computed
		isComplete,
	};
};
