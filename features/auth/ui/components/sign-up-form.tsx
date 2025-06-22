import { useSignUpStore } from "@/store/slice/signup/signup-store";
import * as React from "react";
import EmailCodeVerfication from "./email-code-verification";
import SignUpPage1 from "./signup-page-1";
import SignUpPage2 from "./signup-page-2";

export default function SignUpForm() {
	const { currentPage, pendingVerification } = useSignUpStore();

	if (pendingVerification) {
		return <EmailCodeVerfication />;
	}

	if (currentPage === 1) {
		return <SignUpPage1 />;
	}

	return <SignUpPage2 />;
}
