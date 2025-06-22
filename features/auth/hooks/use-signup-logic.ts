import { useSignUpStore } from "@/store/slice/signup/signup-store";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { Page2SchemaType } from "../validations/signup-schemas";

export const useSignUpLogic = () => {
	const { isLoaded, signUp } = useSignUp();
	const {
		page1Data,
		locationData,
		setIsSigningUp,
		setPendingVerification,
		setClerkErrors,
		resetSignUpState,
	} = useSignUpStore();

	const handleSignUp = async (data: Page2SchemaType) => {
		if (!isLoaded || !page1Data) {
			throw new Error("Form data not ready");
		}

		setIsSigningUp(true);
		setClerkErrors(null);

		// Prepare unsafeMetadata with all additional fields
		const unsafeMetadata = {
			citizenId: page1Data.citizenId,
			gender: page1Data.gender,
			dateOfBirth: page1Data.dateOfBirth,
			phone: data.phone,
			...locationData, // Include all location data
		};

		try {
			await signUp.create({
				emailAddress: data.email,
				password: data.password,
				firstName: page1Data.firstName,
				lastName: page1Data.lastName,
				unsafeMetadata,
			});

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
			setPendingVerification(true);

			// Optionally reset the signup state after successful signup
			// resetSignUpState();
		} catch (err) {
			if (isClerkAPIResponseError(err)) {
				setClerkErrors(err.errors);
			}
			throw err;
		} finally {
			setIsSigningUp(false);
		}
	};

	return {
		handleSignUp,
		isLoaded,
	};
};
