import { statisticsApi } from "@/services/statistics-api";
import { useQuery } from "@tanstack/react-query";

const useGetStatistics = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: () => statisticsApi.getStatistics(),
    queryKey: ["statistics"],
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      return failureCount < 3;
    },
  });

  return {
    statistics: data?.data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useGetStatistics;
