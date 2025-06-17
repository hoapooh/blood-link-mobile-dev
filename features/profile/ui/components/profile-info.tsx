import { IDistrictItem, IProvinceItem, IWardItem } from "@/interfaces/location";
import { IUser, IUserUpdate } from "@/interfaces/user";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import useUpdateProfile from "../../hooks/use-update-profile";
import LocationPickerDialog from "./location-picker-dialog";
import PersonalInfoEditDialog from "./personal-info-edit-dialog";

interface ProfileInfoProps {
	user: IUser | null;
	isLoading: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, isLoading }) => {
	const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
	const [isPersonalInfoDialogOpen, setIsPersonalInfoDialogOpen] = useState(false);
	const { updateProfile, isLoading: isUpdating } = useUpdateProfile();

	if (isLoading) {
		return (
			<View className="px-6 py-8">
				<ActivityIndicator size="large" color="#ef4444" />
			</View>
		);
	}
	const InfoRow = ({ label, value }: { label: string; value: string | null | undefined }) => (
		<View className="flex-row justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
			<Text className="text-gray-600 dark:text-gray-400 font-medium">{label}</Text>
			<Text className="text-gray-900 dark:text-white text-right flex-1 ml-4">
				{value || "Chưa cung cấp"}
			</Text>
		</View>
	);
	const getFullAddress = () => {
		const parts = [user?.data?.wardName, user?.data?.districtName, user?.data?.provinceName].filter(
			Boolean
		);
		return parts.length > 0 ? parts.join(", ") : null;
	};
	const handleLocationUpdate = (locationData: Partial<IUserUpdate>) => {
		updateProfile(locationData);
		setIsLocationDialogOpen(false);
	};

	const handlePersonalInfoUpdate = (personalData: IUserUpdate) => {
		updateProfile(personalData);
		setIsPersonalInfoDialogOpen(false);
	};

	const getInitialLocation = () => {
		if (!user?.data) return undefined;

		const { provinceCode, provinceName, districtCode, districtName, wardCode, wardName } =
			user.data;

		if (!provinceCode || !districtCode || !wardCode) return undefined;

		return {
			province:
				provinceCode && provinceName
					? ({
							id: provinceCode,
							name: provinceName,
							name_en: "",
							full_name: provinceName,
							full_name_en: "",
							latitude: "",
							longitude: "",
					  } as IProvinceItem)
					: undefined,
			district:
				districtCode && districtName
					? ({
							id: districtCode,
							name: districtName,
							name_en: "",
							full_name: districtName,
							full_name_en: "",
							latitude: "",
							longitude: "",
					  } as IDistrictItem)
					: undefined,
			ward:
				wardCode && wardName
					? ({
							id: wardCode,
							name: wardName,
							name_en: "",
							full_name: wardName,
							full_name_en: "",
							latitude: "",
							longitude: "",
					  } as IWardItem)
					: undefined,
		};
	};
	const AddressRow = () => (
		<TouchableOpacity
			onPress={() => setIsLocationDialogOpen(true)}
			className="flex-row justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
		>
			<Text className="text-gray-600 dark:text-gray-400 font-medium">Địa chỉ</Text>
			<View className="flex-1 ml-4 flex-row justify-between items-center">
				<Text className="text-gray-900 dark:text-white text-right flex-1">
					{getFullAddress() || "Chưa cung cấp"}
				</Text>
				<Text className="text-red-500 text-sm ml-2">Chỉnh sửa</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View className="px-6 py-6">
			<View className="flex-row justify-between items-center mb-6">
				<Text className="text-xl font-bold text-gray-900 dark:text-white">Thông tin cá nhân</Text>
				<TouchableOpacity
					className="bg-red-500 px-4 py-2 rounded-lg"
					onPress={() => setIsPersonalInfoDialogOpen(true)}
				>
					<Text className="text-white font-medium">Chỉnh sửa</Text>
				</TouchableOpacity>
			</View>
			<View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
				<InfoRow label="Tên" value={user?.data?.firstName} />
				<InfoRow label="Họ" value={user?.data?.lastName} />
				<InfoRow label="Email" value={user?.data?.account.email} />
				<InfoRow label="Số điện thoại" value={user?.data?.phone} />
				<InfoRow label="Nhóm máu" value={user?.data?.bloodType} />
				<AddressRow />
			</View>
			{/* Account Info */}
			<View className="mt-6">
				<Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
					Chi tiết tài khoản
				</Text>
				<View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
					<InfoRow
						label="Thành viên từ"
						value={
							user?.data?.createdAt
								? new Date(user.data.createdAt).toLocaleDateString("vi-VN", {
										year: "numeric",
										month: "long",
										day: "2-digit",
								  })
								: null
						}
					/>
				</View>
			</View>
			<LocationPickerDialog
				isOpen={isLocationDialogOpen}
				onClose={() => setIsLocationDialogOpen(false)}
				onSave={handleLocationUpdate}
				initialLocation={getInitialLocation()}
			/>
			<PersonalInfoEditDialog
				isOpen={isPersonalInfoDialogOpen}
				onClose={() => setIsPersonalInfoDialogOpen(false)}
				onSave={handlePersonalInfoUpdate}
				initialData={{
					firstName: user?.data?.firstName,
					lastName: user?.data?.lastName,
					phone: user?.data?.phone,
				}}
				isLoading={isUpdating}
			/>
		</View>
	);
};

export default ProfileInfo;
