import { donationApi } from "@/services/donation-api";
import { useQuery } from "@tanstack/react-query";

const useGetDonationResult = (donationId: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["donation-result", donationId],
    queryFn: async () => {
      const resultData = await donationApi.getDonationResult(donationId);
      return resultData.data;
    },
    enabled: !!donationId, // only fetch if ID is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => failureCount < 3,
  });

  return {
    result: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetDonationResult;
