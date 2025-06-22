
import { ICampaignData } from '@/interfaces/campaign';
import { campaignApi } from './../../../services/campaign-api';

import { useQuery } from "@tanstack/react-query";

const useGetCampaigns = () => {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryFn: () => campaignApi.getAllCampaign(),
        queryKey: ["campaigns"],
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error: any) => {
			return failureCount < 3;
		},
    });
    const campaigns: ICampaignData[] = data?.data || [];
    return {
        campaigns,
        isLoading,
        isError,
        error,
        refetch
    };
};

export default useGetCampaigns;
