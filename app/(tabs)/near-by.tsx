import React, { useState } from "react";

import { useFindNearbyUsers } from "@/features/auth/hooks";
import { NearbyFilterForm, NearbyUsersList, NearbyUsersMapView } from "@/features/auth/ui";
import { BloodGroup, BloodRh } from "@/interfaces/blood";

const NearBy = () => {
	const [currentView, setCurrentView] = useState<"filter" | "list" | "map">("filter");
	const [radius, setRadius] = useState<number>(10);
	const [selectedGroup, setSelectedGroup] = useState<BloodGroup | null>(null);
	const [selectedRh, setSelectedRh] = useState<BloodRh | null>(null);
	const [hasSearched, setHasSearched] = useState(false);

	const { nearbyUsers, isLoading, refetch } = useFindNearbyUsers({
		radius,
		bloodRh: selectedRh!,
		bloodGroup: selectedGroup!,
		enabled: hasSearched && !!selectedGroup && !!selectedRh && radius > 0,
	});

	console.log(nearbyUsers);

	const handleFilter = () => {
		if (selectedGroup && selectedRh && radius > 0) {
			setHasSearched(true);
			setCurrentView("list");
			refetch();
		}
	};

	const handleReset = () => {
		setRadius(10);
		setSelectedGroup(null);
		setSelectedRh(null);
		setHasSearched(false);
		setCurrentView("filter");
	};

	const handleViewOnMap = () => {
		setCurrentView("map");
	};

	const handleBackToList = () => {
		setCurrentView("list");
	};

	const handleBackToFilter = () => {
		setCurrentView("filter");
	};

	// Render based on current view
	if (currentView === "filter") {
		return (
			<NearbyFilterForm
				radius={radius}
				selectedGroup={selectedGroup}
				selectedRh={selectedRh}
				onRadiusChange={setRadius}
				onGroupSelect={setSelectedGroup}
				onRhSelect={setSelectedRh}
				onFilter={handleFilter}
				onReset={handleReset}
			/>
		);
	}

	if (currentView === "list") {
		return (
			<NearbyUsersList
				users={nearbyUsers?.data?.customers || []}
				isLoading={isLoading}
				onViewOnMap={handleViewOnMap}
				onBackToFilter={handleBackToFilter}
			/>
		);
	}

	if (currentView === "map") {
		return (
			<NearbyUsersMapView users={nearbyUsers?.data?.customers || []} onBack={handleBackToList} />
		);
	}

	return null;
};

export default NearBy;
