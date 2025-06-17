import React from "react";
import { View } from "react-native";
import RequestTabs from "../../features/request/ui/components/request-tabs";

const RequestPage = () => {
	return (
		<View className="flex-1 bg-background-0">
			<RequestTabs />
		</View>
	);
};

export default RequestPage;
