import { ICreateDonationRequestPayload } from "@/interfaces/donation-request";
import { donationApi } from "@/services/donation-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateDonationRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ICreateDonationRequestPayload) => {
      return await donationApi.createDonationRequest(data);
    },
    onSuccess: () => {
      // Invalidate and refetch donation history to show the new request
      queryClient.invalidateQueries({
        queryKey: ["donation-history"],
      });
    },
    onError: (error) => {
      console.error("Failed to create donation request:", error);
    },
  });

  return {
    createRequest: mutation.mutate,
    createRequestAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useCreateDonationRequest;
