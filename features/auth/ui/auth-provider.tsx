import React from "react";

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// Auth sync is now handled in app/index.tsx for better routing control
	return <>{children}</>;
};
