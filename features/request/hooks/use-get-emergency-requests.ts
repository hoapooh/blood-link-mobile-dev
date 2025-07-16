import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useQuery } from "@tanstack/react-query";

const useGetEmergencyRequests = (params?: Record<string, any>) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryFn: () => emergencyRequestApi.getAllEmergencyRequests(params),
    queryKey: ["emergency-requests", params],
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  };
};

export default useGetEmergencyRequests;
