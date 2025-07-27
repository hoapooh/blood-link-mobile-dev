import { Button, ButtonText } from "@/components/ui/button";
import {
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link";
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
import { IUserUpdate } from "@/interfaces/user";
import { useSignUpStore } from "@/store/slice/signup/signup-store";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, TouchableOpacity } from "react-native";
import LocationPickerDialog from "../../../profile/ui/components/location-picker-dialog";
import { formatDateOfBirth, formatLocationAddress } from "../../utils/signup-utils";
import { page1Schema, Page1SchemaType } from "../../validations/signup-schemas";

export default function SignUpPage1() {
	const { setPage1Data, setLocationData, locationData, goToNextPage } = useSignUpStore();

	const [showLocationPicker, setShowLocationPicker] = React.useState(false);

	const form = useForm<Page1SchemaType>({
		resolver: zodResolver(page1Schema),
		defaultValues: {
			firstName: "",
			lastName: "",
			citizenId: "",
			gender: undefined,
			dateOfBirth: "",
			address: "",
		},
	});

	const handleSubmit = (data: Page1SchemaType) => {
		if (!locationData.provinceCode) {
			form.setError("address", { message: "Please select an address" });
			return;
		}
		setPage1Data(data);
		goToNextPage();
	};

	const handleLocationSave = (location: Partial<IUserUpdate>) => {
		const newLocationData = {
			address: location.address || "",
			provinceCode: location.provinceCode || "",
			provinceName: location.provinceName || "",
			districtCode: location.districtCode || "",
			districtName: location.districtName || "",
			wardCode: location.wardCode || "",
			wardName: location.wardName || "",
			longitude: location.longitude || "",
			latitude: location.latitude || "",
		};

		setLocationData(newLocationData);
		// Set the address field in form
		const addressText = formatLocationAddress({
			address: location.address || "",
			wardName: location.wardName || "",
			districtName: location.districtName || "",
			provinceName: location.provinceName || "",
		});
		form.setValue("address", addressText);
	};

	const handleKeyPress = () => {
		Keyboard.dismiss();
	};

	return (
		<VStack className="max-w-[440px] w-full" space="md">
			<VStack className="items-center" space="xs">
				<Heading size="3xl">Đăng ký</Heading>
				<Text bold size="lg">
					Thông tin cá nhân (1/2)
				</Text>
				<Text size="sm" className="text-gray-600">
					Vui lòng điền thông tin cá nhân của bạn
				</Text>
			</VStack>

			<VStack className="w-full" space="2xl">
				<VStack space="xl" className="w-full">
					<HStack className="w-full" space="lg">
						{/* First Name */}
						<FormControl isInvalid={!!form.formState.errors.firstName} className="flex-1">
							<FormControlLabel>
								<FormControlLabelText>Tên</FormControlLabelText>
							</FormControlLabel>
							<Controller
								defaultValue=""
								name="firstName"
								control={form.control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											placeholder="Tên"
											className="text-sm"
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											onSubmitEditing={handleKeyPress}
											returnKeyType="done"
											type="text"
										/>
									</Input>
								)}
							/>
							<FormControlError>
								<FormControlErrorIcon
									size="sm"
									as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
								/>
								<FormControlErrorText>
									{form.formState.errors?.firstName?.message}
								</FormControlErrorText>
							</FormControlError>
						</FormControl>
						{/* Last Name */}
						<FormControl isInvalid={!!form.formState.errors.lastName} className="flex-1">
							<FormControlLabel>
								<FormControlLabelText>Họ</FormControlLabelText>
							</FormControlLabel>
							<Controller
								defaultValue=""
								name="lastName"
								control={form.control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											placeholder="Họ"
											className="text-sm"
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											onSubmitEditing={handleKeyPress}
											returnKeyType="done"
											type="text"
										/>
									</Input>
								)}
							/>
							<FormControlError>
								<FormControlErrorIcon
									size="sm"
									as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
								/>
								<FormControlErrorText>
									{form.formState.errors?.lastName?.message}
								</FormControlErrorText>
							</FormControlError>
						</FormControl>
					</HStack>
					{/* Citizen ID */}
					<FormControl isInvalid={!!form.formState.errors.citizenId}>
						<FormControlLabel>
							<FormControlLabelText>CCCD/CMND</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="citizenId"
							control={form.control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										placeholder="Nhập số CCCD/CMND"
										className="text-sm"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
										type="text"
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>
								{form.formState.errors?.citizenId?.message}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>
					{/* Gender */}
					<FormControl isInvalid={!!form.formState.errors.gender}>
						<FormControlLabel>
							<FormControlLabelText>Giới tính</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="gender"
							control={form.control}
							render={({ field: { onChange, value } }) => (
								<Select selectedValue={value} onValueChange={onChange}>
									<SelectTrigger variant="outline" size="md">
										<SelectInput
											placeholder="Chọn giới tính"
											value={
												value === "male"
													? "Nam"
													: value === "female"
													? "Nữ"
													: value === "other"
													? "Khác"
													: ""
											}
											editable={false}
										/>
										<SelectIcon className="mr-3" as={ChevronDownIcon} />
									</SelectTrigger>
									<SelectPortal>
										<SelectBackdrop />
										<SelectContent>
											<SelectDragIndicatorWrapper>
												<SelectDragIndicator />
											</SelectDragIndicatorWrapper>
											<SelectScrollView>
												<SelectItem label="Nam" value="male" />
												<SelectItem label="Nữ" value="female" />
												<SelectItem label="Khác" value="other" />
											</SelectScrollView>
										</SelectContent>
									</SelectPortal>
								</Select>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>{form.formState.errors?.gender?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>
					{/* Date of Birth */}
					<FormControl isInvalid={!!form.formState.errors.dateOfBirth}>
						<FormControlLabel>
							<FormControlLabelText>Ngày sinh</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="dateOfBirth"
							control={form.control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										placeholder="DD/MM/YYYY"
										className="text-sm"
										value={value}
										onChangeText={(text) => {
											const formatted = formatDateOfBirth(text);
											onChange(formatted);
										}}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
										type="text"
										keyboardType="numeric"
										maxLength={10}
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>
								{form.formState.errors?.dateOfBirth?.message}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>
					{/* Address */}
					<FormControl isInvalid={!!form.formState.errors.address}>
						<FormControlLabel>
							<FormControlLabelText>Địa chỉ</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="address"
							control={form.control}
							render={({ field: { value } }) => (
								<TouchableOpacity onPress={() => setShowLocationPicker(true)}>
									<Input pointerEvents="none">
										<InputField
											placeholder="Chọn địa chỉ của bạn"
											className="text-sm"
											value={value}
											editable={false}
											type="text"
										/>
										<InputSlot style={{ paddingRight: 10 }}>
											<InputIcon as={ChevronDownIcon} />
										</InputSlot>
									</Input>
								</TouchableOpacity>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>{form.formState.errors?.address?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</VStack>

				{/* Next Button */}
				<VStack className="w-full" space="lg">
					<Button className="w-full bg-red-500" onPress={form.handleSubmit(handleSubmit)}>
						<ButtonText className="font-medium">Tiếp theo</ButtonText>
					</Button>
				</VStack>

				{/* Login Navigation Link */}
				<HStack className="self-center" space="sm">
					<Text size="md">Đã có tài khoản?</Text>
					<Link href="/(auth)/sign-in">
						<LinkText
							className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
							size="md"
						>
							Đăng nhập
						</LinkText>
					</Link>
				</HStack>
			</VStack>

			{/* Location Picker Dialog */}
			<LocationPickerDialog
				isOpen={showLocationPicker}
				onClose={() => setShowLocationPicker(false)}
				onSave={handleLocationSave}
			/>
		</VStack>
	);
}
