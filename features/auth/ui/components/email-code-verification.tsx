import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useSignUpStore } from "@/store/slice/signup/signup-store";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";

const EmailCodeVerfication = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const { resetSignUpState } = useSignUpStore();
	const [code, setCode] = React.useState("");

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			}); // If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				resetSignUpState(); // Reset signup state after successful verification
				router.replace("/(tabs)/home");
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
		<VStack space="md">
			<Text>Xác thực email của bạn</Text>
			<Input variant="outline" size="md" isDisabled={false} isInvalid={false} isReadOnly={false}>
				<InputField
					value={code}
					onChangeText={(code) => setCode(code)}
					placeholder="Nhập mã xác thực"
				/>
			</Input>
			<Button size="md" variant="solid" action="primary" onPress={onVerifyPress}>
				<ButtonText>Xác thực</ButtonText>
			</Button>
		</VStack>
	);
};

export default EmailCodeVerfication;
