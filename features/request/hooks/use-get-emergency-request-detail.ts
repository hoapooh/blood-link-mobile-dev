import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useQuery } from "@tanstack/react-query";

const useGetEmergencyRequestDetail = (requestId: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["emergency-request-detail", requestId],
    queryFn: async () => {
      const response = await emergencyRequestApi.getEmergencyRequestById(requestId);
      return response.data;
    },
    enabled: !!requestId, // only fetch if ID is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => failureCount < 3,
  });

  return {
    emergencyRequest: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetEmergencyRequestDetail;
