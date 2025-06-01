import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email(),
	password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const useSignInHook = () => {
	const [clerkErrors, setClerkErrors] = React.useState<ClerkAPIError[]>();
	const { signIn, setActive, isLoaded } = useSignIn();
	const [showPassword, setShowPassword] = useState(false);
	const [isSigningIn, setIsSigningIn] = useState(false);
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginSchemaType) => {
		if (!isLoaded) return;

		setIsSigningIn(true);
		// Clear any errors that may have occurred during previous form submission
		setClerkErrors(undefined);

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: data.email,
				password: data.password,
			});

			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace("/home");
				reset();
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			if (isClerkAPIResponseError(err)) setClerkErrors(err.errors);
		} finally {
			setIsSigningIn(false);
		}
	};

	const handleState = () => {
		setShowPassword((showState) => !showState);
	};

	const handleKeyPress = () => {
		Keyboard.dismiss();
		handleSubmit(onSubmit)();
	};

	return {
		control,
		handleSubmit,
		onSubmit,
		errors,
		showPassword,
		handleState,
		handleKeyPress,
		isSigningIn,
		clerkErrors,
	};
};

export default useSignInHook;
