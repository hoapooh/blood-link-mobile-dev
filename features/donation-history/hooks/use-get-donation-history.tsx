

import { donationApi } from '@/services/donation-api';
import { useQuery } from "@tanstack/react-query";

const useGetDonationHistory = () => {

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryFn: () => donationApi.getMyAllRequest(),
        queryKey: ["donation-history"],
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error: any) => {
            return failureCount < 3;
        },
    });
    // console.log("Donation History:", data);
    return {
        data: data ? data.data : [],
        isLoading,
        isError,
        error,
        refetch
    };
};

export default useGetDonationHistory;
