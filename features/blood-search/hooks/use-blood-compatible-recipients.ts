import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import { bloodInfoApi } from "@/services/blood-info-api";
import { useQuery } from "@tanstack/react-query";

interface UseBloodCompatibleRecipientsParams {
	group: BloodGroup;
	rh: BloodRh;
	componentType: BloodTypeComponent;
}

const useBloodCompatibleRecipients = ({
	group,
	rh,
	componentType,
}: UseBloodCompatibleRecipientsParams) => {
	const {
		data: recipients,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryFn: async () => {
			return await bloodInfoApi.getBloodCompatibleRecipients({ group, rh, componentType });
		},
		queryKey: ["blood-compatible-recipients", group, rh, componentType],
		enabled: !!group && !!rh && !!componentType,
	});

	return {
		recipients,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useBloodCompatibleRecipients;
