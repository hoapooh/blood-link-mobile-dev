import { authApi } from "@/services/auth-api";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import { setUserInfoToLocalStorage } from "@/utils/auth-utils";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = () => {
	const { isAuthenticated, setUserData } = useAuthStore();

	const {
		data: user,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryFn: async () => {
			const userData = await authApi.getCurrentProfile();
			// Store user data in local storage and zustand store
			await setUserInfoToLocalStorage(userData);
			setUserData(userData);
			return userData;
		},
		queryKey: ["user"],
		enabled: isAuthenticated, // Only fetch when authenticated
		retry: (failureCount, error: any) => {
			// Don't retry on 401 errors
			if (error?.response?.status === 401) {
				return false;
			}
			return failureCount < 3;
		},
	});

	return {
		user,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useGetProfile;
