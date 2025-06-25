import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import { bloodInfoApi } from "@/services/blood-info-api";
import { useQuery } from "@tanstack/react-query";

interface UseBloodCompatibilityParams {
	group: BloodGroup | null;
	rh: BloodRh | null;
	componentType: BloodTypeComponent | null;
}

const useBloodCompatibility = ({ group, rh, componentType }: UseBloodCompatibilityParams) => {
	const {
		data: compatibility,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryFn: async () => {
			if (!group || !rh || !componentType) {
				throw new Error("Missing required parameters");
			}
			return await bloodInfoApi.getBloodCompatibility({ group, rh }, { componentType });
		},
		queryKey: ["blood-compatibility", group, rh, componentType],
		enabled: !!group && !!rh && !!componentType,
	});

	return {
		compatibility,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useBloodCompatibility;
