export interface Page1Data {
	firstName: string;
	lastName: string;
	citizenId: string;
	gender: "male" | "female" | "other";
	dateOfBirth: string;
	address: string;
}

export interface Page2Data {
	phone: string;
	email: string;
	password: string;
}

export interface LocationData {
	provinceCode?: string;
	provinceName?: string;
	districtCode?: string;
	districtName?: string;
	wardCode?: string;
	wardName?: string;
	longitude?: string;
	latitude?: string;
}

export interface SignUpSlice {
	// State
	currentPage: number;
	page1Data: Page1Data | null;
	page2Data: Page2Data | null;
	locationData: LocationData;
	isSigningUp: boolean;
	pendingVerification: boolean;
	clerkErrors: any[] | null;

	// Actions
	setCurrentPage: (page: number) => void;
	setPage1Data: (data: Page1Data) => void;
	setPage2Data: (data: Page2Data) => void;
	setLocationData: (data: LocationData) => void;
	setIsSigningUp: (loading: boolean) => void;
	setPendingVerification: (pending: boolean) => void;
	setClerkErrors: (errors: any[] | null) => void;
	resetSignUpState: () => void;
	goToNextPage: () => void;
	goToPreviousPage: () => void;
}
