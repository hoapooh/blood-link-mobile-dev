import { Icon } from "@/components/ui/icon";
import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { LogOutIcon } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export const SignOutButton = () => {
	// Use `useClerk()` to access the `signOut()` function
	const { signOut } = useClerk();
	const handleSignOut = async () => {
		try {
			await signOut();
			// Redirect to your desired page
			Linking.openURL(Linking.createURL("/sign-in"));
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};
	return (
		<TouchableOpacity onPress={handleSignOut} className="mr-4">
			<Icon className="text-white w-6 h-6" as={LogOutIcon} />
		</TouchableOpacity>
	);
};
