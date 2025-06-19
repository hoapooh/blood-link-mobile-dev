
import { campaignApi } from './../../../services/campaign-api';

import { useQuery } from "@tanstack/react-query";

const useGetCampaigns = () => {

    const {
        data: campaigns,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryFn: async () => {
            const campaignData = await campaignApi.getAllCampaign();
            return campaignData.data;
        },
        queryKey: ["campaigns"],
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error: any) => {
			return failureCount < 3;
		},
    });

    return {
        campaigns,
        isLoading,
        isError,
        error,
        refetch
    };
};

export default useGetCampaigns;
