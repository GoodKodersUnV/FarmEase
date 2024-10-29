import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SupabaseProvider } from "@/context/supabase-provider";

export {
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	return (
		<SupabaseProvider>
			<SafeAreaProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(protected)" />
					<Stack.Screen name="(public)" />
					<Stack.Screen
						name="modal"
						options={{
							presentation: "modal",
							headerShown: false,
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</SupabaseProvider>
	);
}
