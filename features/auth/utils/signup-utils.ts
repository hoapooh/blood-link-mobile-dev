export const formatDateOfBirth = (text: string): string => {
	// Remove all non-numeric characters
	const cleaned = text.replace(/\D/g, "");

	// Apply dd/MM/yyyy format
	if (cleaned.length <= 2) {
		return cleaned;
	} else if (cleaned.length <= 4) {
		return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
	} else {
		return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
	}
};

export const formatLocationAddress = (location: {
	address?: string;
	wardName?: string;
	districtName?: string;
	provinceName?: string;
}): string => {
	const { address, wardName, districtName, provinceName } = location;
	return `${address} ${wardName}, ${districtName}, ${provinceName}`;
};
