import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon, Icon } from "@/components/ui/icon";
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
import { useGetProfile } from "@/features/profile/hooks";
import { ICampaignData } from "@/interfaces/campaign";
import { useAuthStore } from "@/store/slice/auth/auth-store";
import dayjs from "dayjs";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import useCreateDonationRequest from "../../hooks/use-create-request";

interface DonationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: ICampaignData;
}

const DonationRequestModal: React.FC<DonationRequestModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  const { user: authUser } = useAuthStore();
  const { user } = useGetProfile();
  const [agree, setAgree] = useState(false);
  const { createRequestAsync, isLoading } =
    useCreateDonationRequest();
  const [submissionResult, setSubmissionResult] = useState<
    "success" | "error" | null
  >(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const getFullAddress = () => {
    const parts = [
      authUser?.data?.wardName,
      authUser?.data?.districtName,
      authUser?.data?.provinceName,
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "-";
  };

  const handleSubmit = async () => {
    if (!campaign?.id) return;

    try {
      await createRequestAsync({
        campaignId: campaign.id,
        appointmentDate: campaign.bloodCollectionDate,
        note: note || "",
      });
      setSubmissionResult("success");
    } catch (error) {
      setSubmissionResult("error");
      setErrorMessage(error?.toString() || "Đã xảy ra lỗi khi gửi yêu cầu.");
    }
  };

  

  if (isLoading) {
    return (
      <View className="px-6 py-8">
        <ActivityIndicator size="large" color="#ef4444" />
      </View>
    );
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className="my-10 rounded-xl max-h-[95vh] overflow-y-auto pt-10 pb-10"
    >
      <ModalBackdrop />
      <ModalContent className="max-w-md mx-4">
        {submissionResult === "success" ? (
          <>
            <ModalHeader className="pb-4">
              <Text className="text-xl font-bold text-green-600 text-center">
                Đăng ký thành công!
              </Text>
            </ModalHeader>
            <ModalBody>
              <VStack className="space-y-4 items-center">
                <Icon as={CheckIcon} size="xl" className="text-green-500" />
                <Text className="text-md text-gray-800 text-center">
                  Bạn đã đăng ký thành công cho chiến dịch:
                </Text>
                <Text className="text-md font-semibold text-center">
                  {campaign.name}
                </Text>
                <Text className="text-sm text-gray-700">
                  Địa điểm: {campaign.location}
                </Text>
                <Text className="text-sm text-gray-700">
                  Thời gian: {dayjs(campaign.startDate).format("D/MM/YYYY")} -
                  07:30 → 16:30
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} className="w-full bg-green-600">
                <ButtonText className="text-white">Đóng</ButtonText>
              </Button>
            </ModalFooter>
          </>
        ) : submissionResult === "error" ? (
          <>
            <ModalHeader className="pb-4">
              <Text className="text-xl font-bold text-red-600 text-center">
                Đăng ký thất bại
              </Text>
            </ModalHeader>
            <ModalBody>
              <VStack className="space-y-4 items-center">
                <Icon as={X} size="xl" className="text-red-500" />
                <Text className="text-md text-red-700 text-center">
                  {errorMessage}
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} className="w-full bg-red-600">
                <ButtonText className="text-white">Đóng</ButtonText>
              </Button>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalHeader className="pb-4">
              <HStack className="items-center justify-between w-full">
                <HStack className="items-center space-x-3 ">
                  <Text className="text-xl font-bold text-gray-900 text-center">
                    Đăng ký hiến máu
                  </Text>
                </HStack>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-0 bg-transparent"
                  onPress={onClose}
                >
                  <Icon as={X} size="md" className="text-gray-500" />
                </Button>
              </HStack>
            </ModalHeader>

            <ModalBody>
              <VStack className="space-y-8">
                {/* Donor Info */}
                <VStack className="space-y-8 ">
                  <Text className="text-lg font-semibold text-gray-900 pb-4">
                    Thông tin người hiến
                  </Text>
                  <HStack className="space-x-4 pb-4">
                    <VStack className="flex-1 space-y-2">
                      <Text className="text-sm">Họ</Text>
                      <Input isDisabled>
                        <InputField value={user?.data.firstName || "-"} />
                      </Input>
                    </VStack>
                    <VStack className="flex-1 space-y-2">
                      <Text className="text-sm">Tên</Text>
                      <Input isDisabled>
                        <InputField value={user?.data.lastName || "-"} />
                      </Input>
                    </VStack>
                  </HStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Ngày sinh</Text>
                    <Input isDisabled>
                      <InputField value={user?.data.dateOfBirth || "-"} />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">CCCD</Text>
                    <Input isDisabled>
                      <InputField value={user?.data.citizenId || "-"} />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Số điện thoại</Text>
                    <Input isDisabled>
                      <InputField value={user?.data.phone || "-"} />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Email</Text>
                    <Input isDisabled>
                      <InputField value={user?.data?.account.email || "-"} />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Địa chỉ</Text>
                    <Input isDisabled>
                      <InputField value={getFullAddress()} />
                    </Input>
                  </VStack>
                </VStack>

                {/* Campaign Info */}
                <VStack className="space-y-4 pb-4">
                  <Text className="text-lg font-semibold text-gray-900 pb-4">
                    Thông tin chiến dịch
                  </Text>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Tên chiến dịch</Text>
                    <Input isDisabled>
                      <InputField value={campaign?.name || "-"} />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Địa điểm</Text>
                    <Input isDisabled>
                      <InputField value={campaign?.location || "-"} />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Ngày</Text>
                    <Input isDisabled>
                      <InputField
                        value={dayjs(campaign?.startDate).format("D/MM/YYYY")}
                      />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Thời gian</Text>
                    <Input isDisabled>
                      <InputField value="07:30 → 16:30" />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Ngày hẹn hiến máu</Text>
                    <Input isDisabled>
                      <InputField
                        value={dayjs(campaign.bloodCollectionDate).format("DD/MM/YYYY")}
                      />
                    </Input>
                  </VStack>
                  <VStack className="space-y-2 pb-4">
                    <Text className="text-sm">Ghi chú</Text>
                    <Input >
                      <InputField
                        placeholder="Nhập ghi chú (không bắt buộc)"
                        value={note}
                        onChangeText={setNote}
                      />
                    </Input>
                  </VStack>
                </VStack>

                {/* Health Agreement */}
                <VStack className="bg-yellow-50 border border-yellow-200 rounded-md p-4 space-y-3">
                  <Text className="text-sm font-semibold text-yellow-700">
                    Vui lòng xác nhận bạn đáp ứng các điều kiện sau:
                  </Text>
                  <VStack className="pl-2 space-y-1">
                    <Text className="text-sm text-yellow-800">
                      • Không đang bị sốt hoặc cảm cúm
                    </Text>
                    <Text className="text-sm text-yellow-800">
                      • Không mắc bệnh truyền nhiễm
                    </Text>
                    <Text className="text-sm text-yellow-800">
                      • Không uống rượu bia trong vòng 24 giờ
                    </Text>
                    <Text className="text-sm text-yellow-800">
                      • Không dùng thuốc trong vài ngày qua
                    </Text>
                    <Text className="text-sm text-yellow-800">
                      • Có sức khỏe tốt, ngủ đủ, ăn uống hợp lý
                    </Text>
                  </VStack>
                  <Checkbox
                    value="agree"
                    size="md"
                    isChecked={agree}
                    onChange={(checked) => setAgree(checked === true)}
                    className="mt-1"
                  >
                    <CheckboxIndicator>
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel className="text-sm">
                      Tôi xác nhận rằng tôi đáp ứng đầy đủ các điều kiện trên để
                      hiến máu.
                    </CheckboxLabel>
                  </Checkbox>
                </VStack>
              </VStack>
            </ModalBody>

            <ModalFooter className="pt-6">
              <HStack className="space-x-3 w-full">
                <Button
                  variant="outline"
                  action="secondary"
                  className="flex-1 border-gray-300"
                  onPress={onClose}
                >
                  <ButtonText className="text-gray-700">Đóng</ButtonText>
                </Button>
                <Button
                  variant="solid"
                  action="primary"
                  className="flex-1 bg-red-500"
                  onPress={handleSubmit}
                  isDisabled={!agree || isLoading }
                >
                  <ButtonText className="text-white">Gửi</ButtonText>
                </Button>
              </HStack>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DonationRequestModal;
