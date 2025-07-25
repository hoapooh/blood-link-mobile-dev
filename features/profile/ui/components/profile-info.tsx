import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
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
	const { updateProfileAsync, isLoading: isUpdating } = useUpdateProfile();
	const toast = useToast();

	const handleLocationUpdate = async (locationData: Partial<IUserUpdate>) => {
		try {
			await updateProfileAsync(locationData);
			toast.show({
				placement: "top",
				render: ({ id }) => {
					return (
						<Toast nativeID={id} action="success" variant="outline">
							<ToastTitle>Thành công</ToastTitle>
							<ToastDescription>Cập nhật địa chỉ thành công!</ToastDescription>
						</Toast>
					);
				},
			});
			setIsLocationDialogOpen(false);
		} catch {
			toast.show({
				placement: "top",
				render: ({ id }) => {
					return (
						<Toast nativeID={id} action="error" variant="outline">
							<ToastTitle>Lỗi</ToastTitle>
							<ToastDescription>Không thể cập nhật địa chỉ. Vui lòng thử lại!</ToastDescription>
						</Toast>
					);
				},
			});
		}
	};

	const handlePersonalInfoUpdate = async (personalData: IUserUpdate) => {
		try {
			await updateProfileAsync(personalData);
			toast.show({
				placement: "top",
				render: ({ id }) => {
					return (
						<Toast nativeID={id} action="success" variant="outline">
							<ToastTitle>Thành công</ToastTitle>
							<ToastDescription>Cập nhật thông tin thành công!</ToastDescription>
						</Toast>
					);
				},
			});
			setIsPersonalInfoDialogOpen(false);
		} catch {
			toast.show({
				placement: "top",
				render: ({ id }) => {
					return (
						<Toast nativeID={id} action="error" variant="outline">
							<ToastTitle>Lỗi</ToastTitle>
							<ToastDescription>Không thể cập nhật thông tin. Vui lòng thử lại!</ToastDescription>
						</Toast>
					);
				},
			});
		}
	};

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

	const getBloodTypeDisplay = () => {
		// Handle the case where bloodType is null (from API response)
		if (!user?.data?.bloodType) {
			return null;
		}
		
		// If bloodType exists and has both group and rh
		if (user.data.bloodType.group && user.data.bloodType.rh) {
			return `${user.data.bloodType.group}${user.data.bloodType.rh}`;
		}
		
		return null;
	};

	const getGenderDisplay = (gender: string | null | undefined) => {
		if (!gender) return null;
		return gender === "male" ? "Nam" : gender === "female" ? "Nữ" : gender === "other" ? "Khác" : gender;
	};

	const formatDateOfBirth = (dateString: string | null | undefined) => {
		if (!dateString) return null;
		try {
			// Handle both DD/MM/YYYY and ISO date formats
			if (dateString.includes("/")) {
				return dateString; // Already in DD/MM/YYYY format
			} else {
				return new Date(dateString).toLocaleDateString("vi-VN");
			}
		} catch {
			return dateString; // Return as-is if parsing fails
		}
	};

	const getFullAddress = () => {
		const parts = [user?.data?.wardName, user?.data?.districtName, user?.data?.provinceName].filter(
			Boolean
		);
		return parts.length > 0 ? parts.join(", ") : null;
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
				<InfoRow label="Giới tính" value={getGenderDisplay(user?.data?.gender)} />
				<InfoRow label="Ngày sinh" value={formatDateOfBirth(user?.data?.dateOfBirth)} />
				<InfoRow label="CCCD/CMND" value={user?.data?.citizenId} />
				<InfoRow label="Nhóm máu" value={getBloodTypeDisplay()} />
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
					<InfoRow
						label="Lần hiến máu cuối"
						value={
							user?.data?.lastDonationDate
								? new Date(user.data.lastDonationDate).toLocaleDateString("vi-VN", {
										year: "numeric",
										month: "long",
										day: "2-digit",
								  })
								: null
						}
					/>
					<InfoRow label="Trạng thái" value={user?.data?.status === "active" ? "Hoạt động" : user?.data?.status} />
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
					gender: user?.data?.gender as "male" | "female" | "other" | null,
					dateOfBirth: user?.data?.dateOfBirth,
					citizenId: user?.data?.citizenId,
					bloodGroup: user?.data?.bloodType?.group || null,
					bloodRh: user?.data?.bloodType?.rh || null,
				}}
				isLoading={isUpdating}
			/>
		</View>
	);
};

export default ProfileInfo;
