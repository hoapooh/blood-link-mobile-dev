import SignUpForm from "@/features/auth/ui/components/sign-up-form";
import { AuthLayout } from "@/features/auth/ui/layouts/auth-layout";
import React from "react";

const SignUpPage = () => {
	return (
		<AuthLayout>
			<SignUpForm />
		</AuthLayout>
	);
};

export default SignUpPage;
