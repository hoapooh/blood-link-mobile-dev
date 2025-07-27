import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import {
	Modal,
	ModalBackdrop,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/components/ui/modal";
import { ScrollView } from "@/components/ui/scroll-view";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh } from "@/interfaces/blood";
import { IUserUpdate } from "@/interfaces/user";
import React, { useEffect, useState } from "react";
import { formatDateOfBirth } from "../../../auth/utils/signup-utils";

interface PersonalInfoEditDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: IUserUpdate) => void;
	initialData?: {
		firstName?: string | null;
		lastName?: string | null;
		phone?: string | null;
		gender?: "male" | "female" | "other" | null;
		dateOfBirth?: string | null;
		citizenId?: string | null;
		bloodGroup?: BloodGroup | null;
		bloodRh?: BloodRh | null;
	};
	isLoading?: boolean;
}

const PersonalInfoEditDialog: React.FC<PersonalInfoEditDialogProps> = ({
	isOpen,
	onClose,
	onSave,
	initialData,
	isLoading = false,
}) => {
	const [firstName, setFirstName] = useState(initialData?.firstName || "");
	const [lastName, setLastName] = useState(initialData?.lastName || "");
	const [phone, setPhone] = useState(initialData?.phone || "");
	const [phoneError, setPhoneError] = useState("");
	const [gender, setGender] = useState<"male" | "female" | "other" | "">(
		initialData?.gender || ""
	);
	const [dateOfBirth, setDateOfBirth] = useState(initialData?.dateOfBirth || "");
	const [dateOfBirthError, setDateOfBirthError] = useState("");
	const [citizenId, setCitizenId] = useState(initialData?.citizenId || "");
	const [citizenIdError, setCitizenIdError] = useState("");
	const [bloodGroup, setBloodGroup] = useState<BloodGroup | "">(
		initialData?.bloodGroup || ""
	);
	const [bloodRh, setBloodRh] = useState<BloodRh | "">(
		initialData?.bloodRh || ""
	);
	
	// Parse initial date if available
	useEffect(() => {
		if (initialData?.dateOfBirth) {
			// Validate the date format
			validateDateOfBirth(initialData.dateOfBirth);
		}
	}, [initialData?.dateOfBirth]);

	// Update state when initialData changes
	useEffect(() => {
		setFirstName(initialData?.firstName || "");
		setLastName(initialData?.lastName || "");
		setPhone(initialData?.phone || "");
		setPhoneError("");
		setGender(initialData?.gender || "");
		setDateOfBirth(initialData?.dateOfBirth || "");
		setDateOfBirthError("");
		setCitizenId(initialData?.citizenId || "");
		setCitizenIdError("");
		setBloodGroup(initialData?.bloodGroup || "");
		setBloodRh(initialData?.bloodRh || "");
	}, [initialData]);
	
	// No date picker handlers needed
	
	// Validation functions
	const validateVietnamesePhone = (value: string): boolean => {
		// Vietnamese phone number format: starts with 0 and contains exactly 10 digits
		const phoneRegex = /^0\d{9}$/;
		const isValid = phoneRegex.test(value);
		setPhoneError(isValid || value === "" ? "" : "Số điện thoại không hợp lệ");
		return isValid || value === "";
	};
	
	const validateDateOfBirth = (value: string): boolean => {
		if (value === "") return true;
		
		// Format validation: DD/MM/YYYY
		const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
		const match = value.match(dateRegex);
		
		if (!match) {
			setDateOfBirthError("Ngày sinh không đúng định dạng DD/MM/YYYY");
			return false;
		}
		
		const day = parseInt(match[1], 10);
		const month = parseInt(match[2], 10);
		const year = parseInt(match[3], 10);
		
		// Create date object and check if valid date
		const dateObj = new Date(year, month - 1, day);
		if (
			dateObj.getFullYear() !== year ||
			dateObj.getMonth() !== month - 1 ||
			dateObj.getDate() !== day
		) {
			setDateOfBirthError("Ngày sinh không hợp lệ");
			return false;
		}
		
		// Age validation: 18-65 years old
		const today = new Date();
		const ageDiff = today.getFullYear() - year;
		const monthDiff = today.getMonth() - (month - 1);
		const dayDiff = today.getDate() - day;
		let age = ageDiff;
		
		if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
			age--;
		}
		
		if (age < 18 || age > 65) {
			setDateOfBirthError("Người hiến máu phải từ 18-65 tuổi");
			return false;
		}
		
		setDateOfBirthError("");
		return true;
	};
	
	const validateCitizenId = (value: string): boolean => {
		if (value === "") return true;
		
		// Vietnamese Citizen ID: 9 digits (old) or 12 digits (new)
		const citizenIdRegex = /^(\d{9}|\d{12})$/;
		const isValid = citizenIdRegex.test(value);
		setCitizenIdError(isValid ? "" : "Số CMND/CCCD không hợp lệ");
		return isValid;
	};

	const handleSave = () => {
		// Validate all fields before saving
		const isPhoneValid = validateVietnamesePhone(phone.trim());
		const isDateOfBirthValid = validateDateOfBirth(dateOfBirth.trim());
		const isCitizenIdValid = validateCitizenId(citizenId.trim());
		
		// If all validations pass
		if (isPhoneValid && isDateOfBirthValid && isCitizenIdValid) {
			const updateData: IUserUpdate = {
				firstName: firstName.trim() || null,
				lastName: lastName.trim() || null,
				phone: phone.trim() || null,
				gender: gender || null,
				dateOfBirth: dateOfBirth.trim() || null,
				citizenId: citizenId.trim() || null,
				bloodGroup: bloodGroup || null,
				bloodRh: bloodRh || null,
			};
			onSave(updateData);
		}
	};

	const handleClose = () => {
		// Reset form when closing
		setFirstName(initialData?.firstName || "");
		setLastName(initialData?.lastName || "");
		setPhone(initialData?.phone || "");
		setPhoneError("");
		setGender(initialData?.gender || "");
		setDateOfBirth(initialData?.dateOfBirth || "");
		setDateOfBirthError("");
		setCitizenId(initialData?.citizenId || "");
		setCitizenIdError("");
		setBloodGroup(initialData?.bloodGroup || "");
		setBloodRh(initialData?.bloodRh || "");
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<ModalBackdrop />
			<ModalContent className="bg-white dark:bg-gray-800 m-4 max-w-md h-[85%]">
				<ModalHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
					<Heading size="lg" className="text-gray-900 dark:text-white">
						Chỉnh sửa thông tin cá nhân
					</Heading>
				</ModalHeader>
				<ModalBody className="py-6 flex-1">
					<ScrollView 
						showsVerticalScrollIndicator={true}
						contentContainerStyle={{ paddingBottom: 20 }}
						className="flex-1"
					>
						<VStack space="lg">
						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Tên</Text>
							<Input variant="outline" size="md">
								<InputField
									placeholder="Nhập tên của bạn"
									value={firstName}
									onChangeText={setFirstName}
									className="text-gray-900 dark:text-white"
								/>
							</Input>
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Họ</Text>
							<Input variant="outline" size="md">
								<InputField
									placeholder="Nhập họ của bạn"
									value={lastName}
									onChangeText={setLastName}
									className="text-gray-900 dark:text-white"
								/>
							</Input>
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Số điện thoại</Text>
							<Input variant="outline" size="md">
								<InputField
									placeholder="Nhập số điện thoại của bạn"
									value={phone}
									onChangeText={(text) => {
										setPhone(text);
										validateVietnamesePhone(text);
									}}
									keyboardType="phone-pad"
									className="text-gray-900 dark:text-white"
								/>
							</Input>
							{phoneError ? (
								<Text className="text-red-500 text-sm">{phoneError}</Text>
							) : null}
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Giới tính</Text>
							<Select
								selectedValue={gender}
								onValueChange={(value) => setGender(value as "male" | "female" | "other" | "")}
							>
								<SelectTrigger variant="outline" size="md">
									<SelectInput placeholder="Chọn giới tính" className="text-gray-900 dark:text-white" />
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem label="Nam" value="male" />
										<SelectItem label="Nữ" value="female" />
										<SelectItem label="Khác" value="other" />
									</SelectContent>
								</SelectPortal>
							</Select>
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Ngày sinh (DD/MM/YYYY)</Text>
							<Input variant="outline" size="md">
								<InputField
									placeholder="VD: 01/01/1990"
									value={dateOfBirth}
									onChangeText={(text) => {
										const formatted = formatDateOfBirth(text);
										setDateOfBirth(formatted);
										validateDateOfBirth(formatted);
									}}
									className="text-gray-900 dark:text-white"
									keyboardType="numeric"
									maxLength={10}
								/>
							</Input>
							{dateOfBirthError ? (
								<Text className="text-red-500 text-sm">{dateOfBirthError}</Text>
							) : null}
							<Text className="text-sm text-gray-500 mt-1">
								Lưu ý: Nhập ngày sinh theo định dạng DD/MM/YYYY (VD: 01/01/1990). 
								Người hiến máu phải từ 18-65 tuổi.
							</Text>
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">CCCD/CMND</Text>
							<Input variant="outline" size="md">
								<InputField
									placeholder="Nhập số CCCD/CMND"
									value={citizenId}
									onChangeText={(text) => {
										setCitizenId(text);
										validateCitizenId(text);
									}}
									keyboardType="numeric"
									className="text-gray-900 dark:text-white"
								/>
							</Input>
							{citizenIdError ? (
								<Text className="text-red-500 text-sm">{citizenIdError}</Text>
							) : null}
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Nhóm máu</Text>
							<Select
								selectedValue={bloodGroup}
								onValueChange={(value) => setBloodGroup(value as BloodGroup | "")}
							>
								<SelectTrigger variant="outline" size="md">
									<SelectInput placeholder="Chọn nhóm máu" className="text-gray-900 dark:text-white" />
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem label="A" value={BloodGroup.A} />
										<SelectItem label="B" value={BloodGroup.B} />
										<SelectItem label="AB" value={BloodGroup.AB} />
										<SelectItem label="O" value={BloodGroup.O} />
									</SelectContent>
								</SelectPortal>
							</Select>
						</VStack>

						<VStack space="sm">
							<Text className="text-gray-700 dark:text-gray-300 font-medium">Yếu tố Rh</Text>
							<Select
								selectedValue={bloodRh}
								onValueChange={(value) => setBloodRh(value as BloodRh | "")}
							>
								<SelectTrigger variant="outline" size="md">
									<SelectInput placeholder="Chọn yếu tố Rh" className="text-gray-900 dark:text-white" />
								</SelectTrigger>
								<SelectPortal>
									<SelectBackdrop />
									<SelectContent>
										<SelectDragIndicatorWrapper>
											<SelectDragIndicator />
										</SelectDragIndicatorWrapper>
										<SelectItem label="Dương tính (+)" value={BloodRh.POSITIVE} />
										<SelectItem label="Âm tính (-)" value={BloodRh.NEGATIVE} />
									</SelectContent>
								</SelectPortal>
							</Select>
						</VStack>
						</VStack>
					</ScrollView>
				</ModalBody>
				<ModalFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
					<VStack space="sm" className="w-full">
						<Button
							action="primary"
							onPress={handleSave}
							disabled={isLoading}
							className="w-full bg-red-500 hover:bg-red-600"
						>
							<ButtonText className="text-white font-medium">
								{isLoading ? "Đang lưu..." : "Lưu thay đổi"}
							</ButtonText>
						</Button>

						<Button
							action="secondary"
							variant="outline"
							onPress={handleClose}
							disabled={isLoading}
							className="w-full border-gray-300 dark:border-gray-600"
						>
							<ButtonText className="text-gray-700 dark:text-gray-300">Hủy</ButtonText>
						</Button>
					</VStack>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default PersonalInfoEditDialog;
