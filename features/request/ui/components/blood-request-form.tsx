import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
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
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { VStack } from "@/components/ui/vstack";
import { useGetProfile } from "@/features/profile/hooks";
import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import { CreateEmergencyRequestDto } from "@/interfaces/create-emergency-request";
import { ChevronDown, HeartIcon, X } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator } from "react-native";

interface BloodRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (requestData: CreateEmergencyRequestDto) => void;
  isLoading?: boolean;
}

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const { user } = useGetProfile();
  const [formData, setFormData] = useState<Partial<CreateEmergencyRequestDto>>({
    requiredVolume: 0,
    bloodGroup: undefined, // Start with undefined
    bloodRh: undefined, // Start with undefined
    bloodTypeComponent: undefined, // Start with undefined
    description: "",
    wardCode: "",
    districtCode: "",
    provinceCode: "",
    wardName: "",
    districtName: "",
    provinceName: "",
    longitude: "",
    latitude: "",
  });

  const [errors, setErrors] = useState<{
    requiredVolume?: string;
    bloodGroup?: string;
    bloodRh?: string;
    bloodTypeComponent?: string;
  }>({});

  const bloodGroups = [
    { label: "A", value: BloodGroup.A },
    { label: "B", value: BloodGroup.B },
    { label: "AB", value: BloodGroup.AB },
    { label: "O", value: BloodGroup.O },
  ];

  const bloodRhOptions = [
    { label: "Dương tính (+)", value: BloodRh.POSITIVE },
    { label: "Âm tính (-)", value: BloodRh.NEGATIVE },
  ];

  const bloodTypeComponents = [
    { label: "Máu toàn phần", value: BloodTypeComponent.WHOLE_BLOOD },
    { label: "Huyết tương", value: BloodTypeComponent.PLASMA },
    { label: "Hồng cầu", value: BloodTypeComponent.RED_CELLS },
    { label: "Tiểu cầu", value: BloodTypeComponent.PLATELETS },
  ];

  const handleInputChange = (
    field: keyof CreateEmergencyRequestDto,
    value: string | number | BloodGroup | BloodRh | BloodTypeComponent
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Clear previous errors
    setErrors({});

    const newErrors: typeof errors = {};

    // Validate required fields
    if (!formData.requiredVolume || formData.requiredVolume < 1) {
      newErrors.requiredVolume = "Thể tích yêu cầu phải ít nhất là 1ml";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Vui lòng chọn nhóm máu";
    }

    if (!formData.bloodRh) {
      newErrors.bloodRh = "Vui lòng chọn yếu tố Rh";
    }

    if (!formData.bloodTypeComponent) {
      newErrors.bloodTypeComponent = "Vui lòng chọn thành phần máu";
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare request data with user address information
    const requestData: CreateEmergencyRequestDto = {
      requiredVolume: formData.requiredVolume!,
      bloodGroup: formData.bloodGroup!,
      bloodRh: formData.bloodRh!,
      bloodTypeComponent: formData.bloodTypeComponent!,
      description: formData.description || "",
      wardCode: user?.data?.wardCode || "",
      districtCode: user?.data?.districtCode || "",
      provinceCode: user?.data?.provinceCode || "",
      wardName: user?.data?.wardName || "",
      districtName: user?.data?.districtName || "",
      provinceName: user?.data?.provinceName || "",
      longitude: user?.data?.longitude?.toString() || "",
      latitude: user?.data?.latitude?.toString() || "",
    };

    // Call parent's onSubmit - parent will handle API call and form closure
    onSubmit(requestData);
  };

  const handleClose = () => {
    setFormData({
      requiredVolume: 0,
      bloodGroup: undefined, // Reset to undefined
      bloodRh: undefined, // Reset to undefined
      bloodTypeComponent: undefined, // Reset to undefined
      description: "",
      wardCode: "",
      districtCode: "",
      provinceCode: "",
      wardName: "",
      districtName: "",
      provinceName: "",
      longitude: "",
      latitude: "",
    });
    setErrors({}); // Clear validation errors
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="lg"
      className="my-10 rounded-xl max-h-[95vh] overflow-y-auto pt-10 pb-10"
    >
      <ModalBackdrop />
      <ModalContent className="bg-[#fffafa] max-w-md mx-4">
        <ModalHeader className="pb-4">
          <HStack className="items-center justify-between w-full">
            <HStack className="items-center space-x-3">
              {/* <Icon as={HeartIcon} size="lg" className="text-red-500" /> */}
              <Text className="text-xl font-bold text-gray-900">
                Yêu cầu máu khẩn cấp
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

        <ModalBody className="py-4">
          <VStack className="space-y-8">
            {/* Critical Information Card */}
            <Card className="p-6 mb-4 border border-red-200 rounded-xl">
              <VStack className="space-y-6">
                {/* <HStack className="space-x-4"> */}
                <FormControl isInvalid={!!errors.bloodGroup}>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm font-medium text-gray-700 mb-2">
                      Nhóm máu *
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("bloodGroup", value as BloodGroup)
                    }
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Chọn nhóm máu" />
                      <SelectIcon
                        as={ChevronDown}
                        className="absolute right-2.5"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent className="bg-white ">
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {bloodGroups.map((group) => (
                          <SelectItem
                            key={group.value}
                            label={group.label}
                            value={group.value}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  {errors.bloodGroup && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.bloodGroup}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.bloodRh}>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm font-medium text-gray-700 mb-2 mt-4">
                      Yếu tố Rh *
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange("bloodRh", value as BloodRh)
                    }
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Chọn Rh" />
                      <SelectIcon
                        as={ChevronDown}
                        className="absolute right-2.5"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent className="bg-white">
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {bloodRhOptions.map((rh) => (
                          <SelectItem
                            key={rh.value}
                            label={rh.label}
                            value={rh.value}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  {errors.bloodRh && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.bloodRh}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
                {/* </HStack> */}

                {/* <HStack className="space-x-4"> */}

                <FormControl isInvalid={!!errors.bloodTypeComponent}>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm font-medium text-gray-700 mb-2 mt-4">
                      Thành phần máu *
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    onValueChange={(value) =>
                      handleInputChange(
                        "bloodTypeComponent",
                        value as BloodTypeComponent
                      )
                    }
                  >
                    <SelectTrigger variant="outline" size="md">
                      <SelectInput placeholder="Chọn thành phần" />
                      <SelectIcon
                        as={ChevronDown}
                        className="absolute right-2.5"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent className="bg-white">
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {bloodTypeComponents.map((component) => (
                          <SelectItem
                            key={component.value}
                            label={component.label}
                            value={component.value}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  {errors.bloodTypeComponent && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.bloodTypeComponent}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
                <FormControl isInvalid={!!errors.requiredVolume}>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm font-medium text-gray-700 mb-2 mt-4">
                      Thể tích cần thiết (ml) *
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input className="border border-gray-300 bg-white">
                    <InputField
                      placeholder="Ví dụ: 500"
                      value={formData.requiredVolume?.toString() || "0"}
                      onChangeText={(value) =>
                        handleInputChange(
                          "requiredVolume",
                          parseInt(value) || 0
                        )
                      }
                      keyboardType="numeric"
                      className="text-gray-900"
                    />
                  </Input>
                  {errors.requiredVolume && (
                    <FormControlError>
                      <FormControlErrorText>
                        {errors.requiredVolume}
                      </FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
                {/* </HStack> */}
                {/* Description */}
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm font-medium text-gray-700 mb-2 mt-4">
                      Mô tả
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Textarea
                    className="border border-gray-300 bg-white min-h-[100px]"
                    size="md"
                    variant="default"
                  >
                    <TextareaInput
                      placeholder="Mô tả mức độ khẩn cấp, tình trạng bệnh nhân hoặc bất kỳ thông tin bổ sung nào..."
                      value={formData.description}
                      onChangeText={(value) =>
                        handleInputChange("description", value)
                      }
                      className="text-gray-900 p-3"
                      multiline={true}
                      textAlignVertical="top"
                      autoCorrect={false}
                      autoCapitalize="sentences"
                      style={{ textAlignVertical: "top" }}
                    />
                  </Textarea>
                </FormControl>
              </VStack>
            </Card>

            {/* Location Information from User Profile */}
            <Card className="p-6 bg-blue-50 border border-blue-200 rounded-xl mb-4">
              <VStack className="space-y-3">
                <Text className="text-lg font-semibold text-gray-900">
                  Địa điểm yêu cầu
                </Text>
                <Text className="text-sm text-gray-600">
                  Địa điểm sẽ được tự động thiết lập từ hồ sơ của bạn:
                </Text>
                <Text className="text-sm font-medium text-gray-800">
                  {user?.data?.wardName &&
                  user?.data?.districtName &&
                  user?.data?.provinceName
                    ? `${user.data.wardName}, ${user.data.districtName}, ${user.data.provinceName}`
                    : "Vui lòng cập nhật địa chỉ trong cài đặt hồ sơ"}
                </Text>
              </VStack>
            </Card>

            {/* Disclaimer */}
            <Card className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
              <Text className="text-sm text-yellow-800 leading-relaxed">
                Đây là hệ thống yêu cầu máu khẩn cấp. Vui lòng đảm bảo tất cả
                thông tin đều đầy đủ và chính xác. 
              </Text>
            </Card>
          </VStack>
        </ModalBody>

        <ModalFooter className="pt-2">
          <HStack className="space-x-4 w-full">
            <Button
              variant="outline"
              action="secondary"
              className="flex-1 border-gray-300"
              onPress={handleClose}
              disabled={isLoading}
            >
              <ButtonText className="text-gray-700">Hủy</ButtonText>
            </Button>

            <Button
              variant="solid"
              action="primary"
              className="flex-1 bg-red-500"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Icon as={HeartIcon} size="sm" className="text-white mr-2" />
              )}
              <ButtonText className="text-white font-semibold">
                {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
              </ButtonText>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BloodRequestForm;
