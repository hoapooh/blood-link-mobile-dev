import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import { bloodInfoApi } from "@/services/blood-info-api";
import { useQuery } from "@tanstack/react-query";

interface UseBloodCompatibleDonorsParams {
	group: BloodGroup;
	rh: BloodRh;
	componentType: BloodTypeComponent;
}

const useBloodCompatibleDonors = ({ group, rh, componentType }: UseBloodCompatibleDonorsParams) => {
	const {
		data: donors,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryFn: async () => {
			return await bloodInfoApi.getBloodCompatibleDonors({ group, rh, componentType });
		},
		queryKey: ["blood-compatible-donors", group, rh, componentType],
		enabled: !!group && !!rh && !!componentType,
	});

	return {
		donors,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useBloodCompatibleDonors;
