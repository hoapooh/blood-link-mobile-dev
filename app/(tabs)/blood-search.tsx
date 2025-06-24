import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useBloodCompatibility from "@/features/blood-search/hooks/use-blood-compatibility";
import BloodCompatibilityResults from "@/features/blood-search/ui/blood-compatibility-results";
import BloodSearchForm from "@/features/blood-search/ui/blood-search-form";
import { BloodGroup, BloodRh, BloodTypeComponent } from "@/interfaces/blood";
import React, { useState } from "react";

const BloodSearch = () => {
	const [selectedGroup, setSelectedGroup] = useState<BloodGroup | null>(null);
	const [selectedRh, setSelectedRh] = useState<BloodRh | null>(null);
	const [selectedComponent, setSelectedComponent] = useState<BloodTypeComponent | null>(null);
	const [showResults, setShowResults] = useState(false);
	const { compatibility, isLoading } = useBloodCompatibility({
		group: selectedGroup,
		rh: selectedRh,
		componentType: selectedComponent,
	});

	const handleSearch = () => {
		if (selectedGroup && selectedRh && selectedComponent) {
			setShowResults(true);
		}
	};

	const handleReset = () => {
		setSelectedGroup(null);
		setSelectedRh(null);
		setSelectedComponent(null);
		setShowResults(false);
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<VStack className="flex-1">
				{!showResults ? (
					<BloodSearchForm
						selectedGroup={selectedGroup}
						selectedRh={selectedRh}
						selectedComponent={selectedComponent}
						onGroupSelect={setSelectedGroup}
						onRhSelect={setSelectedRh}
						onComponentSelect={setSelectedComponent}
						onSearch={handleSearch}
					/>
				) : compatibility?.data ? (
					<VStack className="flex-1">
						<HStack className="p-4 justify-start">
							<Button variant="outline" onPress={handleReset}>
								<ButtonText>← Tìm kiếm mới</ButtonText>
							</Button>
						</HStack>
						<BloodCompatibilityResults
							compatibility={compatibility.data[0]}
							isLoading={isLoading}
							selectedGroup={selectedGroup!}
							selectedRh={selectedRh!}
							selectedComponent={selectedComponent!}
						/>
					</VStack>
				) : (
					<VStack className="flex-1 justify-center items-center p-4">
						<Text>Không thể tải thông tin</Text>
					</VStack>
				)}
			</VStack>
		</SafeAreaView>
	);
};

export default BloodSearch;
