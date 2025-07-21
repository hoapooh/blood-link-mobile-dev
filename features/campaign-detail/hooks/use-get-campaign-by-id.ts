import { campaignApi } from "@/services/campaign-api";
import { useQuery } from "@tanstack/react-query";

const useGetCampaignById = (campaignId: string) => {
	const {
		data: campaign,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryKey: ["campaign", campaignId],
		queryFn: async () => {
			const campaignData = await campaignApi.getCampaignById(campaignId);
			return campaignData.data;
		},
		enabled: !!campaignId, // only fetch if ID is available
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: (failureCount, error) => failureCount < 3,
	});

	return {
		campaign,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useGetCampaignById;
