import { IUserUpdate } from "@/interfaces/user";
import { authApi } from "@/services/auth-api";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import { setUserInfoToLocalStorage } from "@/utils/auth-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfile = () => {
	const { setUserData } = useAuthStore();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (data: IUserUpdate) => {
			return await authApi.updateCurrentProfile(data);
		},
		onSuccess: async (updatedUser) => {
			// Update local storage and zustand store
			await setUserInfoToLocalStorage(updatedUser);
			setUserData(updatedUser);

			// Invalidate and refetch user query
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
		onError: (error) => {
			console.error("Failed to update profile:", error);
		},
	});

	return {
		updateProfile: mutation.mutate,
		updateProfileAsync: mutation.mutateAsync,
		isLoading: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};

export default useUpdateProfile;
