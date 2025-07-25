import { donationApi } from "@/services/donation-api";
import { useQuery } from "@tanstack/react-query";

const useGetDonationDetail = (donationId: string) => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["donation-detail", donationId],
    queryFn: async () => {
      const donationData = await donationApi.getMyRequestHistoryById(donationId);
      return donationData.data;
    },
    enabled: !!donationId, // only fetch if ID is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => failureCount < 3,
  });

  return {
    donation: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetDonationDetail;
