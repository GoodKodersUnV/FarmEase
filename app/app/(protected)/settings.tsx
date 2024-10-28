import { View, ScrollView } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";

export default function SettingsScreen() {
	const { signOut, user } = useSupabase();

	return (
		<ScrollView className="flex-1 bg-background p-4">
			<H1 className="text-center mb-4">User Profile</H1>

			{user ? (
				<View className="mb-8">
					<H2 className="mb-2">User Details</H2>
					<Text className="mb-1">ID: {user.id}</Text>
					<Text className="mb-1">Email: {user.email}</Text>
					<Text className="mb-1">Phone: {user.phone || "Not set"}</Text>
					<Text className="mb-1">
						Created at: {new Date(user.created_at).toLocaleString()}
					</Text>
					<Text className="mb-1">
						Last sign in:{" "}
						{user.last_sign_in_at
							? new Date(user.last_sign_in_at).toLocaleString()
							: "Never"}
					</Text>
					<Text className="mb-1">Role: {user.role}</Text>
					<Text className="mb-1">
						Email confirmed: {user.email_confirmed_at ? "Yes" : "No"}
					</Text>
				</View>
			) : (
				<Muted className="text-center mb-4">User data not available</Muted>
			)}

			<H2 className="mb-2">Sign Out</H2>
			<Muted className="text-center mb-4">
				Sign out and return to the welcome screen.
			</Muted>
			<Button
				className="w-full"
				size="default"
				variant="destructive"
				onPress={() => signOut()}
			>
				<Text>Sign Out</Text>
			</Button>
		</ScrollView>
	);
}
