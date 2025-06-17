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
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IUserUpdate } from "@/interfaces/user";
import React, { useEffect, useState } from "react";

interface PersonalInfoEditDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (data: IUserUpdate) => void;
	initialData?: {
		firstName?: string | null;
		lastName?: string | null;
		phone?: string | null;
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

	// Update state when initialData changes
	useEffect(() => {
		setFirstName(initialData?.firstName || "");
		setLastName(initialData?.lastName || "");
		setPhone(initialData?.phone || "");
	}, [initialData]);

	const handleSave = () => {
		const updateData: IUserUpdate = {
			firstName: firstName.trim() || null,
			lastName: lastName.trim() || null,
			phone: phone.trim() || null,
		};
		onSave(updateData);
	};

	const handleClose = () => {
		// Reset form when closing
		setFirstName(initialData?.firstName || "");
		setLastName(initialData?.lastName || "");
		setPhone(initialData?.phone || "");
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<ModalBackdrop />
			<ModalContent className="bg-white dark:bg-gray-800 m-4 max-w-md">
				<ModalHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
					<Heading size="lg" className="text-gray-900 dark:text-white">
						Chỉnh sửa thông tin cá nhân
					</Heading>
				</ModalHeader>
				<ModalBody className="py-6">
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
									onChangeText={setPhone}
									keyboardType="phone-pad"
									className="text-gray-900 dark:text-white"
								/>
							</Input>
						</VStack>
					</VStack>
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
