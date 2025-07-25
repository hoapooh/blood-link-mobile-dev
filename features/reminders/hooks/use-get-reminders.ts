import { reminderApi } from "@/services/reminder-api";
import { useQuery } from "@tanstack/react-query";

const useGetReminders = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => reminderApi.getActiveReminders(),
    queryKey: ["active-reminders"],
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      return failureCount < 3;
    },
  });

  return {
    reminders: data?.data?.reminders || [],
    campaignDonation: data?.data?.campaignDonation,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetReminders;
