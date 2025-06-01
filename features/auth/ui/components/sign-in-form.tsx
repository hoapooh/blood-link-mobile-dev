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
import Feather from "@expo/vector-icons/Feather";
import { Link, router } from "expo-router";
import React from "react";
import { Controller } from "react-hook-form";
import colors from "tailwindcss/colors";
import useSignInHook, { loginSchema } from "../../hooks/use-sign-in-hook";

const LoginForm = () => {
	const {
		control,
		clerkErrors,
		errors,
		handleKeyPress,
		handleState,
		handleSubmit,
		isSigningIn,
		onSubmit,
		showPassword,
	} = useSignInHook();

	return (
		<VStack className="max-w-[440px] w-full" space="md">
			<VStack className="items-center" space="xs">
				<Heading size="3xl">Log in</Heading>
				<Text size="xl">
					Welcome to <Text></Text>
					<Text
						size="xl"
						bold
						className="text-red-500 font-bold"
						onPress={() => router.push("/home")}
					>
						Blood
					</Text>
					<Text size="xl" className="text-black">
						Link
					</Text>
				</Text>
			</VStack>
			<VStack className="w-full" space="xl">
				<VStack space="xl" className="w-full">
					<FormControl isInvalid={!!errors?.email} className="w-full">
						<FormControlLabel>
							<FormControlLabelText>Email</FormControlLabelText>
						</FormControlLabel>
						<Controller
							defaultValue=""
							name="email"
							control={control}
							rules={{
								validate: async (value) => {
									try {
										await loginSchema.parseAsync({ email: value });
										return true;
									} catch (error: any) {
										return error.message;
									}
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										placeholder="Enter email"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
									/>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								as={() => <Feather name="alert-triangle" size={16} color={colors.red[700]} />}
							/>
							<FormControlErrorText>
								{errors?.email?.message || "Email ID not found"}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>

					<FormControl isInvalid={!!errors.password} className="w-full">
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
										await loginSchema.parseAsync({ password: value });
										return true;
									} catch (error: any) {
										return error.message;
									}
								},
							}}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input>
									<InputField
										type={showPassword ? "text" : "password"}
										placeholder="Enter password"
										value={value}
										onChangeText={onChange}
										onBlur={onBlur}
										onSubmitEditing={handleKeyPress}
										returnKeyType="done"
									/>
									<InputSlot onPress={handleState} style={{ paddingRight: 10 }}>
										<InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
									</InputSlot>
								</Input>
							)}
						/>
						<FormControlError>
							<FormControlErrorIcon
								as={() => <Feather name="alert-triangle" size={16} color={colors.red[700]} />}
							/>
							<FormControlErrorText>
								{errors?.password?.message || "Password was incorrect"}
							</FormControlErrorText>
						</FormControlError>
					</FormControl>
				</VStack>
				<VStack className="w-full" space="lg">
					<Button
						className="w-full bg-red-500"
						onPress={handleSubmit(onSubmit)}
						disabled={isSigningIn}
					>
						<ButtonText className="font-semibold">
							{isSigningIn ? <Spinner size={"small"} color={colors.white} /> : "Log in"}
						</ButtonText>
					</Button>
				</VStack>
				<HStack className="self-center" space="sm">
					<Text size="md">Don&apos;t have an account?</Text>
					<Link href="/(auth)/sign-up">
						<LinkText
							className="font-medium text-primary-700 group-hover/link:text-primary-600  group-hover/pressed:text-primary-700"
							size="md"
						>
							Sign up
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
};

export default LoginForm;
