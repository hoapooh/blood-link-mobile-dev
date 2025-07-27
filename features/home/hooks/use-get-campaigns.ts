
import { ICampaignData } from '@/interfaces/campaign';
import { campaignApi } from './../../../services/campaign-api';

import { useQuery } from "@tanstack/react-query";

interface UseGetCampaignsParams {
    search?: string;
    status?: string;
}

const useGetCampaigns = (params?: UseGetCampaignsParams) => {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryFn: () => campaignApi.getAllCampaign(params),
        queryKey: ["campaigns", params],
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
