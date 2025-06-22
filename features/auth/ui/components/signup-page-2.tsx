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
import { useSignUpStore } from "@/store/slice/signup/signup-store";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import colors from "tailwindcss/colors";
import { useSignUpLogic } from "../../hooks/use-signup-logic";
import { page2Schema, Page2SchemaType } from "../../validations/signup-schemas";

export default function SignUpPage2() {
	const { isSigningUp, clerkErrors, goToPreviousPage } = useSignUpStore();

	const { handleSignUp } = useSignUpLogic();
	const [showPassword, setShowPassword] = React.useState(false);

	const form = useForm<Page2SchemaType>({
		resolver: zodResolver(page2Schema),
		defaultValues: {
			phone: "",
			email: "",
			password: "",
		},
	});

	const handleState = () => {
		setShowPassword((showState) => !showState);
	};

	const handleSubmit = async (data: Page2SchemaType) => {
		try {
			await handleSignUp(data);
			form.reset();
		} catch (error) {
			console.error("Signup error:", error);
		}
	};

	const handleKeyPress = () => {
		Keyboard.dismiss();
	};

	const handleGoBack = () => {
		form.reset({
			phone: "",
			email: "",
			password: "",
		});
		goToPreviousPage();
	};

	return (
		<VStack className="max-w-[440px] w-full" space="md">
			<VStack className="items-center" space="xs">
				<Heading size="3xl">Sign up</Heading>
				<Text bold size="lg">
					Contact Information (2/2)
				</Text>
				<Text size="sm" className="text-gray-600">
					Please provide your contact details
				</Text>
			</VStack>

			<VStack className="w-full" space="2xl">
				<VStack space="xl" className="w-full">
					{/* Phone */}
					<FormControl isInvalid={!!form.formState.errors.phone}>
						<FormControlLabel>
							<FormControlLabelText>Phone Number</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="phone"
							control={form.control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										placeholder="Enter your phone number"
										className="text-sm"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
										type="text"
										keyboardType="phone-pad"
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>{form.formState.errors?.phone?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* Email */}
					<FormControl isInvalid={!!form.formState.errors.email}>
						<FormControlLabel>
							<FormControlLabelText>Email</FormControlLabelText>
						</FormControlLabel>
						<Controller
							name="email"
							defaultValue=""
							control={form.control}
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
										keyboardType="email-address"
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								size="md"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>{form.formState.errors?.email?.message}</FormControlErrorText>
						</FormControlError>
					</FormControl>

					{/* Password */}
					<FormControl isInvalid={!!form.formState.errors.password}>
						<FormControlLabel>
							<FormControlLabelText>Password</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="password"
							control={form.control}
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
						<FormControlError>
							<FormControlErrorIcon
								size="sm"
								as={() => <Feather name="alert-triangle" size={18} color="#bd2929" />}
							/>
							<FormControlErrorText>
								{form.formState.errors?.password?.message}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</VStack>

				{/* Navigation Buttons */}
				<VStack className="w-full" space="lg">
					<Button
						className="w-full bg-red-500"
						onPress={form.handleSubmit(handleSubmit)}
						isDisabled={isSigningUp}
					>
						<ButtonText className="font-medium">
							{isSigningUp ? <Spinner size={"small"} color={colors.white} /> : "Sign up"}
						</ButtonText>
					</Button>

					<Button className="w-full" variant="outline" onPress={handleGoBack}>
						<ButtonText className="font-medium">Back</ButtonText>
					</Button>
				</VStack>

				{/* Login Navigation Link */}
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
