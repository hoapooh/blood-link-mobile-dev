import { emergencyRequestApi } from "@/services/emergency-request-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteEmergencyRequest() {
  const queryClient = useQueryClient();

  const deleteEmergencyRequestMutation = useMutation({
    mutationFn: ({ id }: { id: string }) => 
      emergencyRequestApi.deleteEmergencyRequest(id),
    onSuccess: () => {
      // Invalidate and refetch emergency request queries
      queryClient.invalidateQueries({ queryKey: ["emergency-requests"] });
    },
    onError: (error) => {
      console.error("Delete emergency request failed:", error);
    },
  });

  return {
    deleteEmergencyRequest: deleteEmergencyRequestMutation.mutate,
    isLoading: deleteEmergencyRequestMutation.isPending,
    isError: deleteEmergencyRequestMutation.isError,
    isSuccess: deleteEmergencyRequestMutation.isSuccess,
    error: deleteEmergencyRequestMutation.error,
  };
}
