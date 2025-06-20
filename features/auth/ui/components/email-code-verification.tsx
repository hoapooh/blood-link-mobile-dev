import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

const EmailCodeVerfication = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [code, setCode] = React.useState("");

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.replace("/sign-in");
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<HStack space="md">
			<Text>Verify your email</Text>
			<Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
				<InputField
					value={code}
					onChangeText={(code) => setCode(code)}
					placeholder="Enter your verification code"
				/>
			</Input>
			<Button size="md" variant="solid" action="primary" onPress={onVerifyPress}>
				<ButtonText>Verify</ButtonText>
			</Button>
		</HStack>
	);
};

export default EmailCodeVerfication;
