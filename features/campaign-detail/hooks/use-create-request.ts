import { ICreateDonationRequestPayload } from "@/interfaces/donation-request";
import { donationApi } from "@/services/donation-api";
import { useMutation } from "@tanstack/react-query";

const useCreateDonationRequest = () => {

  const mutation = useMutation({
    mutationFn: async (data: ICreateDonationRequestPayload) => {
      return await donationApi.createDonationRequest(data);
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
