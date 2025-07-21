import { GoogleMaps } from "expo-maps";
import { ArrowLeft } from "lucide-react-native";

import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IUserData } from "@/interfaces/user";

interface NearbyUsersMapViewProps {
	users: IUserData[];
	onBack: () => void;
}

const NearbyUsersMapView = ({ users, onBack }: NearbyUsersMapViewProps) => {
	// Filter users that have valid coordinates
	const usersWithLocation = users.filter(
		(user) => user.latitude !== null && user.longitude !== null
	);

	// Calculate center point from all user locations
	const getCenterCoordinates = () => {
		if (usersWithLocation.length === 0) {
			// Default center (Ho Chi Minh City)
			return {
				latitude: 10.836088,
				longitude: 106.7567252,
			};
		}

		// Use the first donor's coordinates instead of averaging
		// This is more reliable and avoids calculation errors
		const firstUser = usersWithLocation[0];
		return {
			latitude: Number(firstUser.latitude!),
			longitude: Number(firstUser.longitude!),
		};

		// Original averaging code (keeping as reference but commented out)
		// const totalLat = usersWithLocation.reduce((sum, user) => sum + (user.latitude || 0), 0);
		// const totalLng = usersWithLocation.reduce((sum, user) => sum + (user.longitude || 0), 0);
		// return {
		// 	latitude: totalLat / usersWithLocation.length,
		// 	longitude: totalLng / usersWithLocation.length,
		// };
	};

	// Calculate zoom level based on the spread of coordinates
	const getZoomLevel = () => {
		if (usersWithLocation.length <= 1) return 15;

		const latitudes = usersWithLocation.map((user) => user.latitude || 0);
		const longitudes = usersWithLocation.map((user) => user.longitude || 0);

		const maxLat = Math.max(...latitudes);
		const minLat = Math.min(...latitudes);
		const maxLng = Math.max(...longitudes);
		const minLng = Math.min(...longitudes);

		const latDiff = maxLat - minLat;
		const lngDiff = maxLng - minLng;
		const maxDiff = Math.max(latDiff, lngDiff);

		// Adjust zoom based on coordinate spread
		if (maxDiff > 1) return 8;
		if (maxDiff > 0.5) return 10;
		if (maxDiff > 0.1) return 12;
		if (maxDiff > 0.01) return 14;
		return 15;
	};

	const centerCoordinates = getCenterCoordinates();
	const zoomLevel = getZoomLevel();

	const markers = usersWithLocation.map((user, index) => {
		const lat = Number(user.latitude!);
		const lng = Number(user.longitude!);

		return {
			id: `marker-${index}`, // Add required ID field
			coordinates: {
				latitude: lat,
				longitude: lng,
			},
			title:
				user.firstName || user.lastName
					? `${user.firstName || ""} ${user.lastName || ""}`.trim()
					: "Anonymous Donor",
			snippet: `${
				user.districtName
					? `${user.wardName}, ${user.districtName}${
							user.provinceName ? `, ${user.provinceName}` : ""
					  }`
					: ""
			}`,
			showCallout: true,
		};
	});

	return (
		<VStack className="flex-1">
			{/* Header */}
			<HStack className="bg-white p-4 justify-between items-center border-b border-gray-200">
				<Button variant="outline" onPress={onBack} className="flex-row items-center">
					<ButtonIcon as={ArrowLeft} />
					<ButtonText>Quay lại danh sách</ButtonText>
				</Button>
				<Text className="font-semibold">Tìm thấy {usersWithLocation.length} người</Text>
			</HStack>
			{/* Map */}
			<GoogleMaps.View
				style={{ flex: 1 }}
				cameraPosition={{
					coordinates: centerCoordinates,
					zoom: zoomLevel,
				}}
				markers={markers}
			/>
			{/* Info Footer */}
			{usersWithLocation.length < users.length && (
				<VStack className="bg-yellow-50 p-3 border-t border-yellow-200">
					<Text className="text-sm text-yellow-800 text-center">
						{users.length - usersWithLocation.length} donor(s) don&apos;t have location data and are
						not shown on the map
					</Text>
				</VStack>
			)}
		</VStack>
	);
};

export default NearbyUsersMapView;
