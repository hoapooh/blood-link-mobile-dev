import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import React from "react";

interface BloodSearchFormProps {
	selectedGroup: BloodGroup | null;
	selectedRh: BloodRh | null;
	selectedComponent: BloodTypeComponent | null;
	onGroupSelect: (group: BloodGroup) => void;
	onRhSelect: (rh: BloodRh) => void;
	onComponentSelect: (component: BloodTypeComponent) => void;
	onSearch: () => void;
	onReset?: () => void;
}

const BloodSearchForm: React.FC<BloodSearchFormProps> = ({
	selectedGroup,
	selectedRh,
	selectedComponent,
	onGroupSelect,
	onRhSelect,
	onComponentSelect,
	onSearch,
	onReset,
}) => {
	const bloodGroups = [BloodGroup.A, BloodGroup.B, BloodGroup.AB, BloodGroup.O];
	const rhFactors = [BloodRh.POSITIVE, BloodRh.NEGATIVE];
	const components = [
		{ value: BloodTypeComponent.WHOLE_BLOOD, label: "Toàn phần" },
		{ value: BloodTypeComponent.RED_CELLS, label: "Hồng cầu" },
		{ value: BloodTypeComponent.PLASMA, label: "Huyết tương" },
		{ value: BloodTypeComponent.PLATELETS, label: "Tiểu cầu" },
	];

	const isSearchEnabled = selectedGroup && selectedRh && selectedComponent;

	return (
		<VStack space="lg" className="p-4">
			<Text className="text-xl font-bold text-center">Tìm kiếm thông tin nhóm máu</Text>

			{/* Blood Group Selection */}
			<VStack space="sm">
				<HStack className="justify-between items-center">
					<Text className="text-lg font-semibold">Chọn nhóm máu:</Text>
					{/* {selectedGroup && onReset && (
						<Button variant="outline" size="sm" onPress={onReset}>
							<ButtonText className="text-sm">Chọn lại</ButtonText>
						</Button>
					)} */}
				</HStack>
				<HStack space="sm" className="flex-wrap">
					{bloodGroups.map((group) => (
						<Button
							key={group}
							variant={selectedGroup === group ? "solid" : "outline"}
							disabled={selectedGroup !== null && selectedGroup !== group}
							onPress={() => onGroupSelect(group)}
							className="flex-1 min-w-16"
						>
							<ButtonText>{group}</ButtonText>
						</Button>
					))}
				</HStack>
			</VStack>

			{/* Rh Factor Selection */}
			<VStack space="sm">
				<Text className="text-lg font-semibold">Chọn yếu tố Rh:</Text>
				<HStack space="sm">
					{rhFactors.map((rh) => (
						<Button
							key={rh}
							variant={selectedRh === rh ? "solid" : "outline"}
							onPress={() => onRhSelect(rh)}
							className="flex-1"
						>
							<ButtonText>{rh}</ButtonText>
						</Button>
					))}
				</HStack>
			</VStack>

			{/* Component Type Selection */}
			<VStack space="sm">
				<Text className="text-lg font-semibold">Chọn loại thành phần máu:</Text>
				<VStack space="xs">
					{components.map((component) => (
						<Button
							key={component.value}
							variant={selectedComponent === component.value ? "solid" : "outline"}
							onPress={() => onComponentSelect(component.value)}
						>
							<ButtonText>{component.label}</ButtonText>
						</Button>
					))}
				</VStack>
			</VStack>

			{/* Search Button */}
			<Button onPress={onSearch} isDisabled={!isSearchEnabled} className="mt-4">
				<ButtonText>Tìm kiếm thông tin tương thích</ButtonText>
			</Button>
		</VStack>
	);
};

export default BloodSearchForm;
