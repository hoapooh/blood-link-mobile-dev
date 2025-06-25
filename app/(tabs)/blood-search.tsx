import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useAllBloodInfo from "@/features/blood-search/hooks/use-all-blood-info";
import useBloodCompatibility from "@/features/blood-search/hooks/use-blood-compatibility";
import BloodCompatibilityResults from "@/features/blood-search/ui/blood-compatibility-results";
import BloodSearchForm from "@/features/blood-search/ui/blood-search-form";
import BloodTypeDetailView from "@/features/blood-search/ui/blood-type-detail-view";
import BloodTypeList from "@/features/blood-search/ui/blood-type-list";
import { BloodGroup, BloodRh, BloodTypeComponent, IBloodInfoData } from "@/interfaces/blood";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";

const BloodSearch = () => {
	const [selectedGroup, setSelectedGroup] = useState<BloodGroup | null>(null);
	const [selectedRh, setSelectedRh] = useState<BloodRh | null>(null);
	const [selectedComponent, setSelectedComponent] = useState<BloodTypeComponent | null>(null);
	const [currentView, setCurrentView] = useState<"list" | "detail" | "search" | "results">("list");
	const [selectedBloodInfo, setSelectedBloodInfo] = useState<IBloodInfoData | null>(null);

	const { bloodInfoList, isLoading: isLoadingList } = useAllBloodInfo();
	const { compatibility, isLoading } = useBloodCompatibility({
		group: selectedGroup,
		rh: selectedRh,
		componentType: selectedComponent,
	});

	const handleViewDetails = (group: BloodGroup, rh: BloodRh) => {
		const bloodInfo = bloodInfoList.find((info) => info.group === group && info.rh === rh);
		if (bloodInfo) {
			setSelectedBloodInfo(bloodInfo);
			setCurrentView("detail");
		}
	};

	const handleCompatibilityCheck = (group: BloodGroup, rh: BloodRh) => {
		setSelectedGroup(group);
		setSelectedRh(rh);
		setCurrentView("search");
	};

	const handleSearch = () => {
		if (selectedGroup && selectedRh && selectedComponent) {
			setCurrentView("results");
		}
	};

	const handleBackToList = () => {
		setCurrentView("list");
		setSelectedBloodInfo(null);
	};

	const handleBackToDetail = () => {
		setCurrentView("detail");
	};

	const handleFormReset = () => {
		setSelectedGroup(null);
		setSelectedRh(null);
		setSelectedComponent(null);
	};

	const handleReset = () => {
		setSelectedGroup(null);
		setSelectedRh(null);
		setSelectedComponent(null);
		setCurrentView("list");
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<VStack className="flex-1">
				{currentView === "list" && (
					<BloodTypeList
						bloodTypes={bloodInfoList}
						isLoading={isLoadingList}
						onViewDetails={handleViewDetails}
					/>
				)}

				{currentView === "detail" && selectedBloodInfo && (
					<BloodTypeDetailView
						bloodInfo={selectedBloodInfo}
						onBack={handleBackToList}
						onCompatibilityCheck={handleCompatibilityCheck}
					/>
				)}

				{currentView === "search" && (
					<VStack className="flex-1">
						<HStack className="p-4 justify-start">
							<Button variant="outline" onPress={handleBackToDetail}>
								<ButtonIcon as={ArrowLeft} />
								<ButtonText>Quay lại</ButtonText>
							</Button>
						</HStack>
						<BloodSearchForm
							selectedGroup={selectedGroup}
							selectedRh={selectedRh}
							selectedComponent={selectedComponent}
							onGroupSelect={setSelectedGroup}
							onRhSelect={setSelectedRh}
							onComponentSelect={setSelectedComponent}
							onSearch={handleSearch}
							onReset={handleFormReset}
						/>
					</VStack>
				)}

				{currentView === "results" && compatibility?.data ? (
					<VStack className="flex-1">
						<HStack className="p-4 justify-start">
							<Button variant="outline" onPress={handleReset}>
								<ButtonText>← Quay lại danh sách</ButtonText>
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
					currentView === "results" && (
						<VStack className="flex-1 justify-center items-center p-4">
							<Text>Không thể tải thông tin tương thích</Text>
							<Button variant="outline" onPress={handleReset} className="mt-4">
								<ButtonText>← Quay lại danh sách</ButtonText>
							</Button>
						</VStack>
					)
				)}
			</VStack>
		</SafeAreaView>
	);
};

export default BloodSearch;
