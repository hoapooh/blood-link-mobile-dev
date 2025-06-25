import { bloodInfoApi } from "@/services/blood-info-api";
import { useQuery } from "@tanstack/react-query";

const useAllBloodInfo = () => {
	const {
		data: bloodInfoList,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryFn: async () => {
			return await bloodInfoApi.getAllBloodInfo();
		},
		queryKey: ["all-blood-info"],
	});

	return {
		bloodInfoList: bloodInfoList?.data || [],
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useAllBloodInfo;
