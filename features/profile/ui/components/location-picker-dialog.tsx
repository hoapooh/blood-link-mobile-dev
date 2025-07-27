import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { ChevronDownIcon, CloseIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/components/ui/modal";
import {
	Select,
	SelectBackdrop,
	SelectContent,
	SelectDragIndicator,
	SelectDragIndicatorWrapper,
	SelectIcon,
	SelectInput,
	SelectItem,
	SelectPortal,
	SelectScrollView,
	SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IDistrictItem, IProvinceItem, IWardItem } from "@/interfaces/location";
import { IUserUpdate } from "@/interfaces/user";
import React from "react";
import { useLocationPicker } from "../../hooks/use-location-picker";

interface LocationPickerDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (locationData: Partial<IUserUpdate>) => void;
	initialLocation?: {
		province?: IProvinceItem;
		district?: IDistrictItem;
		ward?: IWardItem;
	};
	initialAddress?: string;
}

const LocationPickerDialog: React.FC<LocationPickerDialogProps> = ({
	isOpen,
	onClose,
	onSave,
	initialLocation,
	initialAddress = "",
}) => {
	const [address, setAddress] = React.useState(initialAddress);
	const {
		provinces,
		districts,
		wards,
		selectedProvince,
		selectedDistrict,
		selectedWard,
		handleProvinceSelect,
		handleDistrictSelect,
		handleWardSelect,
		provincesLoading,
		districtsLoading,
		wardsLoading,
		provincesError,
		districtsError,
		wardsError,
		isComplete,
	} = useLocationPicker(initialLocation);

	// Reset when dialog opens
	React.useEffect(() => {
		setAddress(initialAddress);
	}, [initialAddress]);

	/* useEffect(() => {
		if (isOpen && !initialLocation) {
			resetSelection();
		}
	}, [isOpen, initialLocation, resetSelection]); */

	const handleSave = () => {
		if (isComplete && selectedProvince && selectedDistrict && selectedWard) {
			const locationData: Partial<IUserUpdate> = {
				provinceCode: selectedProvince.id,
				provinceName: selectedProvince.name,
				districtCode: selectedDistrict.id,
				districtName: selectedDistrict.name,
				wardCode: selectedWard.id,
				wardName: selectedWard.name,
				longitude: selectedWard.longitude,
				latitude: selectedWard.latitude,
				address: address.trim() || null,
			};
			onSave(locationData);
			onClose();
		}
	};

	const renderError = (error: any, message: string) => {
		if (error) {
			return (
				<Text className="text-red-500 text-sm mt-1">
					{error instanceof Error ? error.message : message}
				</Text>
			);
		}
		return null;
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalBackdrop />
			<ModalContent className="max-w-md">
				<ModalHeader>
					<Heading size="lg">Nhập địa điểm</Heading>
					<ModalCloseButton>
						<Icon as={CloseIcon} />
					</ModalCloseButton>
				</ModalHeader>

				<ModalBody>
					<VStack space="md">
						{/* Province Selection */}
						<VStack space="xs">
							<Text className="font-medium">Tỉnh/Thành phố</Text>
							<Select
								selectedValue={selectedProvince?.id}
								onValueChange={(value) => {
									const province = provinces.find((p: IProvinceItem) => p.id === value);
									if (province) handleProvinceSelect(province);
								}}
							>
								<SelectTrigger variant="outline" size="xl">
									<SelectInput
										placeholder={"Chọn tỉnh/thành phố"}
										value={selectedProvince?.name}
										editable={false}
									/>
									<SelectIcon className="mr-3" as={ChevronDownIcon} />
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent className="max-h-96">
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectScrollView>
											{provincesLoading ? (
												<SelectItem label="Loading..." value="loading" isDisabled />
											) : (
												provinces.map((province: IProvinceItem) => (
													<SelectItem key={province.id} label={province.name} value={province.id} />
												))
											)}
										</SelectScrollView>
									</SelectContent>
								</SelectPortal>
							</Select>
							{renderError(provincesError, "Failed to load provinces")}
						</VStack>
						{/* District Selection */}
						<VStack space="xs">
							<Text className="font-medium">Quận/Huyện</Text>
							<Select
								selectedValue={selectedDistrict?.id}
								onValueChange={(value) => {
									const district = districts.find((d: IDistrictItem) => d.id === value);
									if (district) handleDistrictSelect(district);
								}}
								isDisabled={!selectedProvince}
							>
								<SelectTrigger variant="outline" size="xl">
									<SelectInput
										placeholder={
											!selectedProvince
												? "Chọn tỉnh/thành phố trước"
												: districtsLoading
												? "Đang tải quận/huyện..."
												: "Chọn quận/huyện"
										}
										value={selectedDistrict?.name || ""}
										editable={false}
									/>
									<SelectIcon className="mr-3" as={ChevronDownIcon} />
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent className="max-h-96">
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectScrollView>
											{districtsLoading ? (
												<SelectItem label="Loading..." value="loading" isDisabled />
											) : (
												districts.map((district: IDistrictItem) => (
													<SelectItem key={district.id} label={district.name} value={district.id} />
												))
											)}
										</SelectScrollView>
									</SelectContent>
								</SelectPortal>
							</Select>
							{renderError(districtsError, "Failed to load districts")}
						</VStack>
						{/* Ward Selection */}
						<VStack space="xs">
							<Text className="font-medium">Phường/Xã</Text>
							<Select
								selectedValue={selectedWard?.id}
								onValueChange={(value) => {
									const ward = wards.find((w: IWardItem) => w.id === value);
									if (ward) handleWardSelect(ward);
								}}
								isDisabled={!selectedDistrict}
							>
								<SelectTrigger variant="outline" size="xl">
									<SelectInput
										placeholder={
											!selectedDistrict
												? "Chọn quận/huyện trước"
												: wardsLoading
												? "Đang tải phường/xã..."
												: "Chọn phường/xã"
										}
										value={selectedWard?.name || ""}
										editable={false}
									/>
									<SelectIcon className="mr-3" as={ChevronDownIcon} />
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent className="max-h-96">
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectScrollView>
											{wardsLoading ? (
												<SelectItem label="Loading..." value="loading" isDisabled />
											) : (
												wards.map((ward: IWardItem) => (
													<SelectItem key={ward.id} label={ward.name} value={ward.id} />
												))
											)}
										</SelectScrollView>
									</SelectContent>
								</SelectPortal>
							</Select>
							{renderError(wardsError, "Failed to load wards")}
						</VStack>

						{/* Address Field */}
						<VStack space="xs">
							<Text className="font-medium">Địa chỉ chi tiết (Số nhà, tên đường)</Text>
							<Input variant="outline" size="xl">
								<InputField
									placeholder="Nhập số nhà, tên đường..."
									value={address}
									onChangeText={setAddress}
									maxLength={200}
								/>
							</Input>
							<Text className="text-xs text-gray-500">
								Tối đa 200 ký tự ({address.length}/200)
							</Text>
						</VStack>

						{/* Selected Summary */}
						{isComplete && (
							<VStack space="xs" className="bg-green-50 p-3 rounded-lg border border-green-200">
								<Text className="font-medium text-green-800">Địa điểm đã chọn:</Text>
								<Text className="text-green-700 text-sm">
									{address && `${address}, `}
									{selectedWard?.name}, {selectedDistrict?.name}, {selectedProvince?.name}
								</Text>
							</VStack>
						)}
					</VStack>
				</ModalBody>

				<ModalFooter>
					<VStack space="sm" className="w-full">
						<Button
							size="md"
							variant="solid"
							action="primary"
							onPress={handleSave}
							isDisabled={!isComplete}
							className="w-full"
						>
							<ButtonText>Lưu địa điểm</ButtonText>
						</Button>
						<Button
							size="md"
							variant="outline"
							action="secondary"
							onPress={onClose}
							className="w-full"
						>
							<ButtonText>Hủy</ButtonText>
						</Button>
					</VStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default LocationPickerDialog;
