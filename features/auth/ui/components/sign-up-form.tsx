import { Button, ButtonText } from "@/components/ui/button";
import {
	FormControl,
	FormControlError,
	FormControlErrorIcon,
	FormControlErrorText,
	FormControlLabel,
	FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { LinkText } from "@/components/ui/link";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import colors from "tailwindcss/colors";
import { z } from "zod";
import EmailCodeVerfication from "./email-code-verification";

const signUpSchema = z.object({
	first_name: z.string().min(1, "First name is required"),
	last_name: z.string().min(1, "Last name is required"),
	email: z.string().min(1, "Email is required").email(),
	password: z
		.string()
		.min(6, "Must be at least 6 characters in length")
		.regex(new RegExp(".*[A-Z].*"), "One uppercase character")
		.regex(new RegExp(".*[a-z].*"), "One lowercase character")
		.regex(new RegExp(".*\\d.*"), "One number")
		.regex(new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"), "One special character"),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
	const { isLoaded, signUp } = useSignUp();
	const [clerkErrors, setClerkErrors] = React.useState<ClerkAPIError[]>();
	const [isSigningUp, setIsSigningUp] = React.useState(false);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
	});

	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleState = () => {
		setShowPassword((showState) => {
			return !showState;
		});
	};

	// Handle submission of sign-up form
	const onSignUpPress = async (data: SignUpSchemaType) => {
		if (!isLoaded) return;
		setIsSigningUp(true);
		// Clear any errors that may have occurred during previous form submission
		setClerkErrors(undefined);

		// Start sign-up process using email and password provided
		try {
			await signUp.create({
				emailAddress: data.email,
				password: data.password,
				firstName: data.first_name,
				lastName: data.last_name,
			});

			// Send user an email with verification code
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			reset();
			setPendingVerification(true);
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			if (isClerkAPIResponseError(err)) setClerkErrors(err.errors);
		} finally {
			setIsSigningUp(false);
		}
	};

	const handleKeyPress = () => {
		Keyboard.dismiss();
		handleSubmit(onSignUpPress)();
	};

	if (pendingVerification) {
		return <EmailCodeVerfication />;
	}

	return (
		<VStack className="max-w-[440px] w-full" space="md">
			<VStack className="items-center" space="xs">
				<Heading size="3xl">Sign up</Heading>
				<Text bold size="lg">
					Sign up and start using{" "}
					<Text bold size="lg">
						CapyCloset
					</Text>
				</Text>
			</VStack>

			<VStack className="w-full" space="2xl">
				<VStack space="xl" className="w-full">
					<HStack className="w-full" space="lg">
						{/* ==== First Name ==== */}
						<FormControl isInvalid={!!errors.first_name} className="flex-1">
							<FormControlLabel>
								<FormControlLabelText>First Name</FormControlLabelText>
							</FormControlLabel>
							<Controller
								defaultValue=""
								name="first_name"
								control={control}
								rules={{
									validate: async (value) => {
										try {
											await signUpSchema.parseAsync({
												first_name: value,
											});
											return true;
										} catch (error: any) {
											return error.message;
										}
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											placeholder="First Name"
											className="text-sm"
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											onSubmitEditing={handleKeyPress}
											returnKeyType="done"
											type={"text"}
										/>
									</Input>
								)}
							/>
							<FormControlError>
								<FormControlErrorIcon
									size="sm"
									as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
								/>
								<FormControlErrorText>{errors?.first_name?.message}</FormControlErrorText>
							</FormControlError>
						</FormControl>

						{/* ==== Last Name ==== */}
						<FormControl isInvalid={!!errors.last_name} className="flex-1">
							<FormControlLabel>
								<FormControlLabelText>Last Name</FormControlLabelText>
							</FormControlLabel>
							<Controller
								defaultValue=""
								name="last_name"
								control={control}
								rules={{
									validate: async (value) => {
										try {
											await signUpSchema.parseAsync({
												last_name: value,
											});
											return true;
										} catch (error: any) {
											return error.message;
										}
									},
								}}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input>
										<InputField
											placeholder="Last Name"
											className="text-sm"
											value={value}
											onChangeText={onChange}
											onBlur={onBlur}
											onSubmitEditing={handleKeyPress}
											returnKeyType="done"
											type={"text"}
										/>
									</Input>
								)}
							/>
							<FormControlError>
								<FormControlErrorIcon
									size="sm"
									as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
								/>
								<FormControlErrorText>{errors?.last_name?.message}</FormControlErrorText>
							</FormControlError>
						</FormControl>
					</HStack>

					{/* ==== EMAIL ==== */}
					<FormControl isInvalid={!!errors.email}>
						<FormControlLabel>
							<FormControlLabelText>Email</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="email"
							defaultValue=""
							control={control}
							rules={{
								validate: async (value) => {
									try {
										await signUpSchema.parseAsync({ email: value });
										return true;
									} catch (error: any) {
										return error.message;
									}
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										className="text-sm"
										placeholder="Email"
										type="text"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
									/>
								</Input>
							)}
						/>
						{/* ==== ERROR ==== */}
						<FormControlError>
							<FormControlErrorIcon
								size="md"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>{errors?.email?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* ==== PASSWORD ==== */}
					<FormControl isInvalid={!!errors.password}>
						<FormControlLabel>
							<FormControlLabelText>Password</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="password"
							control={control}
							rules={{
								validate: async (value) => {
									try {
										await signUpSchema.parseAsync({
											password: value,
										});
										return true;
									} catch (error: any) {
										return error.message;
									}
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										className="text-sm"
										placeholder="Password"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
										type={showPassword ? "text" : "password"}
									/>
									<InputSlot onPress={handleState} style={{ paddingRight: 10 }}>
										<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
									</InputSlot>
								</Input>
							)}
						/>
						{/* ==== ERROR ==== */}
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>{errors?.password?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</VStack>

				{/* ==== SIGN UP BUTTON ==== */}
				<VStack className="w-full" space="lg">
					<Button className="w-full bg-red-500" onPress={handleSubmit(onSignUpPress)}>
						<ButtonText className="font-medium">
							{isSigningUp ? <Spinner size={"small"} color={colors.white} /> : "Sign up"}
						</ButtonText>
					</Button>
				</VStack>

				{/* ==== LOGIN NAVIGATION LINK ==== */}
				<HStack className="self-center" space="sm">
					<Text size="md">Already have an account?</Text>
					<Link href="/(auth)/sign-in">
						<LinkText
							className="font-medium text-primary-700 group-hover/link:text-primary-600 group-hover/pressed:text-primary-700"
							size="md"
						>
							Login
						</LinkText>
					</Link>
				</HStack>
			</VStack>

			{clerkErrors && clerkErrors.length > 0 && (
				<VStack space="sm" className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
					<HStack space="sm" className="items-center">
						<Feather name="alert-circle" size={20} color="#dc2626" />
						<Text className="text-red-700 font-semibold text-base">Authentication Error</Text>
					</HStack>
					<VStack space="xs">
						{clerkErrors.map((error, index) => (
							<Text key={index} className="text-red-600 text-sm leading-5">
								• {error.longMessage || error.message}
							</Text>
						))}
					</VStack>
				</VStack>
			)}
		</VStack>
	);
}
