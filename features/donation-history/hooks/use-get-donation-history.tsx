import { donationApi } from "@/services/donation-api";
import { useQuery } from "@tanstack/react-query";

const useGetDonationHistory = (params?: Record<string, any>) => {
	const { data, isLoading, isError, error, refetch } = useQuery({
		queryFn: () => donationApi.getMyAllRequest(params),
		queryKey: ["donation-history", params],
		staleTime: 2 * 60 * 1000, // 2 minutes (reduced from 5)
		gcTime: 5 * 60 * 1000, // 5 minutes garbage collection time (replaces cacheTime in v5)
		retry: (failureCount, error: any) => {
			return failureCount < 2; // Reduced retry attempts
		},
		retryDelay: 1000, // 1 second delay between retries
		refetchOnWindowFocus: false, // Prevent unnecessary refetches
	});
	return {
		data: data?.data ?? [],
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useGetDonationHistory;
