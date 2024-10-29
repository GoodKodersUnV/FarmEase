import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { TouchableOpacity } from "react-native";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();
	const router = useRouter();

	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: true,
				headerRight: () => (
					<TouchableOpacity 
						onPress={() => router.push("/notifications")}
						style={{ marginRight: 15 }}
					>
						<Ionicons 
							name="notifications-outline" 
							size={24} 
							color={colorScheme === "dark" ? "white" : "black"} 
						/>
					</TouchableOpacity>
				),
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? theme.dark.background
							: theme.light.background,
				},
				tabBarShowLabel: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "explore") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "home") {
						iconName = focused ? "search" : "search-outline";
					} else if (route.name === "settings") {
						iconName = focused ? "person" : "person-outline";
					} else if (route.name === "community") {
						iconName = focused ? "people" : "people-outline";
					} else if (route.name === "weather") {
						iconName = focused ? "cloud" : "cloud-outline";
					}

					return <Ionicons name={iconName as any} size={size} color="black" />;
				},
			})}
		>

			<Tabs.Screen name="explore" options={{
				title: "Explore"
			}} />

			<Tabs.Screen name="home" options={{
				title: "Crop Disease Detection"
			}} />
			<Tabs.Screen name="weather" options={{
				title: "Weather"
			}} />
			<Tabs.Screen name="community" options={{
				title: "Community"
			}} />
			<Tabs.Screen name="settings" options={{
				title: "Settings"
			}} />
			<Tabs.Screen name="results" options={{
				href: null,
				title: "Results"
			}} />
			<Tabs.Screen name="disease-details" options={{
				href: null,
				title: "Disease Details"
			}} />

			<Tabs.Screen name="crop-details/[id]" options={{
				href: null,
				title: "Crop Details"
			}} />

			<Tabs.Screen name="notifications" options={{
				href: null,
				title: "Notifications"
			}} />

		</Tabs>
	);
}
