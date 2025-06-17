import { IUser } from "@/interfaces/user";

export interface AuthSlice {
	token: string | null;
	user: IUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	// signup: (credentials: IUserRegister) => Promise<void>;
	setUserData: (user: IUser) => void;
	login: (token: string) => Promise<void>;
	logout: () => Promise<void>;
	initializeAuth: () => Promise<void>;
}
