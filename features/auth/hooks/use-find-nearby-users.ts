import { BloodGroup, BloodRh } from "@/interfaces/blood";
import { IUserFindNearByParams } from "@/interfaces/user";
import { authApi } from "@/services/auth-api";
import { useQuery } from "@tanstack/react-query";

interface UseFindNearbyUsersParams {
	radius: number;
	bloodRh: BloodRh;
	bloodGroup: BloodGroup;
	enabled?: boolean;
}

const useFindNearbyUsers = ({
	radius,
	bloodRh,
	bloodGroup,
	enabled = false,
}: UseFindNearbyUsersParams) => {
	const {
		data: nearbyUsers,
		isLoading,
		isError,
		error,
		refetch,
	} = useQuery({
		queryFn: async () => {
			const params: IUserFindNearByParams = {
				radius,
				bloodRh,
				bloodGroup,
			};
			return await authApi.findNearByUsers(params);
		},
		queryKey: ["find-nearby-users", radius, bloodRh, bloodGroup],
		enabled: enabled && !!radius && !!bloodRh && !!bloodGroup,
	});

	return {
		nearbyUsers,
		isLoading,
		isError,
		error,
		refetch,
	};
};

export default useFindNearbyUsers;
