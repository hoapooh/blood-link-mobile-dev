import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
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
    SelectTrigger,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ChevronDown, UserPlus, X } from "lucide-react-native";
import React, { useState } from "react";
import { View } from "react-native";

interface RegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: RegistrationData) => void;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  bloodType: string;
  phoneNumber: string;
  email: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    bloodType: "",
    phoneNumber: "",
    email: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "bloodType",
      "phoneNumber",
      "email",
    ];
    const missing = requiredFields.filter(
      (f) => !formData[f as keyof RegistrationData]
    );
    if (missing.length > 0) {
      console.warn("Missing:", missing);
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      bloodType: "",
      phoneNumber: "",
      email: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <ModalBackdrop />
      <ModalContent className="bg-[#fffafa] max-w-md mx-4">
        <ModalHeader className="pb-4">
          <HStack className="items-center justify-between w-full">
            <HStack className="items-center space-x-3">
              <Icon as={UserPlus} size="lg" className="text-red-500" />
              <Text className="text-xl font-bold text-gray-900">
                Donor Registration
              </Text>
            </HStack>
            <Button
              variant="outline"
              size="sm"
              className="border-0 bg-transparent"
              onPress={handleClose}
            >
              <Icon as={X} size="md" className="text-gray-500" />
            </Button>
          </HStack>
        </ModalHeader>

        <ModalBody>
          <VStack className="space-y-8">
            <VStack className="space-y-4">
              <Text className="text-lg font-semibold text-gray-900 pb-2 pt-1">
                Personal Information
              </Text>

              <HStack className="space-x-4">
                <VStack className="flex-1 space-y-2 pt-1 pb-1">
                  <Text className="text-sm text-gray-700 pb-1">First Name *</Text>
                  <Input className="border border-gray-300 bg-white">
                    <InputField
                      placeholder="First name"
                      value={formData.firstName}
                      onChangeText={(value) =>
                        handleInputChange("firstName", value)
                      }
                      className="text-gray-900"
                    />
                  </Input>
                </VStack>

                <VStack className="flex-1 space-y-2 pt-1 pb-1 ml-2">
                  <Text className="text-sm text-gray-700 pb-1">Last Name *</Text>
                  <Input className="border border-gray-300 bg-white">
                    <InputField
                      placeholder="Last name"
                      value={formData.lastName}
                      onChangeText={(value) =>
                        handleInputChange("lastName", value)
                      }
                      className="text-gray-900"
                    />
                  </Input>
                </VStack>
              </HStack>

              <VStack className="space-y-2 pt-1 pb-1">
                <Text className="text-sm text-gray-700 pb-1">Date of Birth *</Text>
                <Input className="border border-gray-300 bg-white">
                  <InputField
                    placeholder="YYYY-MM-DD"
                    value={formData.dateOfBirth}
                    onChangeText={(value) =>
                      handleInputChange("dateOfBirth", value)
                    }
                    className="text-gray-900"
                  />
                </Input>
              </VStack>
            </VStack>
            <View className="h-px bg-gray-200 mt-2" />
            {/* Blood Details */}
            <VStack className="space-y-4">
              <Text className="text-lg font-semibold text-gray-900 pb-2 pt-1">
                Blood Details
              </Text>
              <VStack className="space-y-2 pt-1 pb-1">
                <Text className="text-sm text-gray-700 pb-1">
                  Blood Type *
                </Text>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("bloodType", value)
                  }
                >
                  <SelectTrigger className="border border-gray-300 bg-white">
                    <SelectInput
                      placeholder="Select blood type"
                      className="text-gray-900"
                    />
                    <SelectIcon as={ChevronDown} className="text-gray-500" />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className="bg-white">
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {bloodTypes.map((type) => (
                        <SelectItem key={type} label={type} value={type} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </VStack>
            </VStack>
            <View className="h-px bg-gray-200 mt-2" />
            {/* Contact Info */}
            <VStack className="space-y-4">
              <Text className="text-lg font-semibold text-gray-900 pb-2 pt-1">
                Contact Information
              </Text>
 
              <VStack className="space-y-2 pt-1 pb-1">
                <Text className="text-sm text-gray-700 pb-1">
                  Phone Number *
                </Text>
                <Input className="border border-gray-300 bg-white">
                  <InputField
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChangeText={(value) =>
                      handleInputChange("phoneNumber", value)
                    }
                    keyboardType="phone-pad"
                    className="text-gray-900"
                  />
                </Input>
              </VStack>

              <VStack className="space-y-2 pt-1 pb-1">
                <Text className="text-sm text-gray-700 pb-1">
                  Email *
                </Text>
                <Input className="border border-gray-300 bg-white">
                  <InputField
                    placeholder="Enter email"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange("email", value)}
                    keyboardType="email-address"
                    className="text-gray-900"
                  />
                </Input>
              </VStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter className="pt-6">
          <HStack className="space-x-3 w-full">
            <Button
              variant="outline"
              action="secondary"
              className="flex-1 border-gray-300"
              onPress={handleClose}
            >
              <ButtonText className="text-gray-700">Cancel</ButtonText>
            </Button>

            <Button
              variant="solid"
              action="primary"
              className="flex-1 bg-red-500 ml-2"
              onPress={handleSubmit}
            >
              <Icon as={UserPlus} size="sm" className="text-white mr-2" />
              <ButtonText className="text-white font-semibold">
                Register
              </ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegistrationForm;
