import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useQuery } from "@tanstack/react-query";

const useGetEmergencyRequestDetail = (requestId: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["emergency-request-detail", requestId],
    queryFn: async () => {
      const response = await emergencyRequestApi.getEmergencyRequestById(requestId);
      return response.data;
    },
    enabled: !!requestId, // only fetch if ID is available
    staleTime: 30 * 1000, // 30 seconds (reduced from 5 minutes)
    gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
    refetchInterval: 60 * 1000, // Refetch every 60 seconds for detail view
    refetchIntervalInBackground: false, // Don't refetch when app is in background
    refetchOnWindowFocus: true, // Refetch when app comes into focus
    refetchOnMount: true, // Always refetch when component mounts
    retry: (failureCount, error) => failureCount < 3,
  });

  return {
    emergencyRequest: data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching, // Expose fetching state for refresh indicators
  };
};

export default useGetEmergencyRequestDetail;
