import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex flex-1 justify-center bg-background p-4">
			<View className="flex items-center justify-center gap-y-4">
				<H1 className="text-center">Welcome to VJH</H1>
				<Muted className="text-center">
					Your one-stop shop for all your needs.
				</Muted>
			</View>
			<View className="flex flex-row gap-x-4">
				<Button
					className="flex-1 m-10"
					size="default"
					variant="default"
					onPress={() => {
						router.push("/sign-in");
					}}
				>
					<Text>Sign In</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
