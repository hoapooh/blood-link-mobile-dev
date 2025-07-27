import { UpdateEmergencyRequestDto } from "@/interfaces/emergency-request";
import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateEmergencyRequest = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateEmergencyRequestDto }) => {
      return await emergencyRequestApi.updateEmergencyRequest(id, data);
    },
    onSuccess: (updatedRequest, variables) => {
      // Invalidate and refetch the specific emergency request
      queryClient.invalidateQueries({ 
        queryKey: ["emergency-request", variables.id] 
      });
      // Also invalidate the emergency requests list
      queryClient.invalidateQueries({ 
        queryKey: ["emergency-requests"] 
      });
    },
    onError: (error) => {
      console.error("Failed to update emergency request:", error);
    },
  });

  return {
    updateEmergencyRequest: mutation.mutate,
    updateEmergencyRequestAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useUpdateEmergencyRequest;
