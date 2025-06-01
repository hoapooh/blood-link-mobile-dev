import LoginForm from "@/features/auth/ui/components/sign-in-form";
import { AuthLayout } from "@/features/auth/ui/layouts/auth-layout";
import React from "react";

const SignInPage = () => {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
};

export default SignInPage;
