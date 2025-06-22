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
				<Heading size="3xl">Sign up</Heading>
				<Text bold size="lg">
					Personal Information (1/2)
				</Text>
				<Text size="sm" className="text-gray-600">
					Please fill in your personal details
				</Text>
			</VStack>

			<VStack className="w-full" space="2xl">
				<VStack space="xl" className="w-full">
					<HStack className="w-full" space="lg">
						{/* First Name */}
						<FormControl isInvalid={!!form.formState.errors.firstName} className="flex-1">
							<FormControlLabel>
								<FormControlLabelText>First Name</FormControlLabelText>
							</FormControlLabel>
							<Controller
								defaultValue=""
								name="firstName"
								control={form.control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											placeholder="First Name"
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
								<FormControlLabelText>Last Name</FormControlLabelText>
							</FormControlLabel>
							<Controller
								defaultValue=""
								name="lastName"
								control={form.control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											placeholder="Last Name"
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
							<FormControlLabelText>Citizen ID</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="citizenId"
							control={form.control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										placeholder="Enter your citizen ID"
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
							<FormControlLabelText>Gender</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="gender"
							control={form.control}
							render={({ field: { onChange, value } }) => (
								<Select selectedValue={value} onValueChange={onChange}>
									<SelectTrigger variant="outline" size="xl">
										<SelectInput
											placeholder="Select your gender"
											value={
												value === "male"
													? "Male"
													: value === "female"
													? "Female"
													: value === "other"
													? "Other"
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
												<SelectItem label="Male" value="male" />
												<SelectItem label="Female" value="female" />
												<SelectItem label="Other" value="other" />
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
							<FormControlLabelText>Date of Birth</FormControlLabelText>
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
							<FormControlLabelText>Address</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="address"
							control={form.control}
							render={({ field: { value } }) => (
								<TouchableOpacity onPress={() => setShowLocationPicker(true)}>
									<Input pointerEvents="none">
										<InputField
											placeholder="Select your address"
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
						<ButtonText className="font-medium">Next</ButtonText>
					</Button>
				</VStack>

				{/* Login Navigation Link */}
				<HStack className="self-center" space="sm">
					<Text size="md">Already have an account?</Text>
					<Link href="/(auth)/sign-in">
						<LinkText
							className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
							size="md"
						>
							Login
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
