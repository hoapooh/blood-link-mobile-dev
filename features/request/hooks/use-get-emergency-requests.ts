import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useQuery } from "@tanstack/react-query";

const useGetEmergencyRequests = (params?: Record<string, any>) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: () => emergencyRequestApi.getAllEmergencyRequests(params),
    queryKey: ["emergency-requests", params],
    staleTime: 30 * 1000, // 30 seconds (reduced from 5 minutes)
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
    refetchIntervalInBackground: false, // Don't refetch when app is in background
    refetchOnWindowFocus: true, // Refetch when app comes into focus
    refetchOnMount: true, // Always refetch when component mounts
    retry: (failureCount, error: any) => {
      return failureCount < 3;
    },
  });

  return {
    emergencyRequests: data?.data?.data || [],
    meta: data?.data?.meta,
    isLoading,
    isError,
    error,
    refetch,
    isFetching, // Expose fetching state for pull-to-refresh indicators
  };
};

export default useGetEmergencyRequests;
