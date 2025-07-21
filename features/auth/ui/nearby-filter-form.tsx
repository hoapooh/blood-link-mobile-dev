import React from "react";
import { Pressable } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh } from "@/interfaces/blood";

interface NearbyFilterFormProps {
	radius: number;
	selectedGroup: BloodGroup | null;
	selectedRh: BloodRh | null;
	onRadiusChange: (radius: number) => void;
	onGroupSelect: (group: BloodGroup) => void;
	onRhSelect: (rh: BloodRh) => void;
	onFilter: () => void;
	onReset: () => void;
}

const NearbyFilterForm: React.FC<NearbyFilterFormProps> = ({
	radius,
	selectedGroup,
	selectedRh,
	onRadiusChange,
	onGroupSelect,
	onRhSelect,
	onFilter,
	onReset,
}) => {
	const bloodGroups = [BloodGroup.A, BloodGroup.B, BloodGroup.AB, BloodGroup.O];
	const rhFactors = [BloodRh.POSITIVE, BloodRh.NEGATIVE];

	const getGroupButtonStyle = (group: BloodGroup) => {
		const isSelected = selectedGroup === group;
		const baseStyle = "p-3 rounded-lg border-2";

		if (group === BloodGroup.O) {
			return `${baseStyle} ${
				isSelected ? "bg-red-200 border-red-400" : "bg-red-50 border-red-200"
			}`;
		}
		if (group === BloodGroup.A) {
			return `${baseStyle} ${
				isSelected ? "bg-blue-200 border-blue-400" : "bg-blue-50 border-blue-200"
			}`;
		}
		if (group === BloodGroup.B) {
			return `${baseStyle} ${
				isSelected ? "bg-green-200 border-green-400" : "bg-green-50 border-green-200"
			}`;
		}
		if (group === BloodGroup.AB) {
			return `${baseStyle} ${
				isSelected ? "bg-purple-200 border-purple-400" : "bg-purple-50 border-purple-200"
			}`;
		}
		return `${baseStyle} ${
			isSelected ? "bg-gray-200 border-gray-400" : "bg-gray-50 border-gray-200"
		}`;
	};

	const getRhButtonStyle = (rh: BloodRh) => {
		const isSelected = selectedRh === rh;
		const baseStyle = "p-3 rounded-lg border-2";

		if (rh === BloodRh.POSITIVE) {
			return `${baseStyle} ${
				isSelected ? "bg-red-200 border-red-400" : "bg-red-50 border-red-200"
			}`;
		} else {
			return `${baseStyle} ${
				isSelected ? "bg-gray-200 border-gray-400" : "bg-gray-50 border-gray-200"
			}`;
		}
	};

	const isFormValid = radius > 0 && radius <= 100 && selectedGroup && selectedRh;

	return (
		<VStack className="p-4 bg-white" space="lg">
			<Text className="text-lg font-semibold text-center">Tìm kiếm người hiến máu gần đây</Text>

			{/* Radius Input */}
			<VStack space="sm">
				<Text className="font-medium">Bán kính tìm kiếm (km) - Tối đa 100km</Text>
				<Input>
					<InputField
						placeholder="Nhập bán kính (1-100)"
						value={radius.toString()}
						onChangeText={(text) => {
							const numValue = parseInt(text) || 0;
							if (numValue <= 100) {
								onRadiusChange(numValue);
							}
						}}
						keyboardType="numeric"
					/>
				</Input>
			</VStack>

			{/* Blood Group Selection */}
			<VStack space="sm">
				<Text className="font-medium">Nhóm máu</Text>
				<HStack className="justify-between" space="xs">
					{bloodGroups.map((group) => (
						<Pressable
							key={group}
							className={`${getGroupButtonStyle(group)} flex-1`}
							onPress={() => onGroupSelect(group)}
						>
							<Text className="text-center font-medium">{group}</Text>
						</Pressable>
					))}
				</HStack>
			</VStack>

			{/* Rh Factor Selection */}
			<VStack space="sm">
				<Text className="font-medium">Yếu tố Rh</Text>
				<HStack className="justify-between" space="xs">
					{rhFactors.map((rh) => (
						<Pressable
							key={rh}
							className={`${getRhButtonStyle(rh)} flex-1`}
							onPress={() => onRhSelect(rh)}
						>
							<Text className="text-center font-medium">{rh === BloodRh.POSITIVE ? "+" : "-"}</Text>
						</Pressable>
					))}
				</HStack>
			</VStack>

			{/* Action Buttons */}
			<HStack space="md" className="justify-between">
				<Button variant="outline" onPress={onReset} className="flex-1">
					<ButtonText>Đặt lại</ButtonText>
				</Button>
				<Button onPress={onFilter} className="flex-1" disabled={!isFormValid}>
					<ButtonText>Tìm kiếm</ButtonText>
				</Button>
			</HStack>
		</VStack>
	);
};

export default NearbyFilterForm;
