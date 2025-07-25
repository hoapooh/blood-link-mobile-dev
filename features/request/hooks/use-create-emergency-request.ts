import { CreateEmergencyRequestDto } from "@/interfaces/create-emergency-request";
import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateEmergencyRequest = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (data: CreateEmergencyRequestDto) => {
			return await emergencyRequestApi.createEmergencyRequest(data);
		},
		onSuccess: () => {
			// Invalidate and refetch emergency requests to show the new request
			queryClient.invalidateQueries({
				queryKey: ["emergency-requests"],
			});
		},
		onError: (error) => {
			console.error("Failed to create emergency request:", error);
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

export default useCreateEmergencyRequest;
