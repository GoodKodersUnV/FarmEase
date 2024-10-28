import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	return (
		<Tabs
			screenOptions={({ route }) => ({
				headerShown: true,
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? theme.dark.background
							: theme.light.background,
				},
				tabBarShowLabel: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "explore") {
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
			<Tabs.Screen name="home" />
			<Tabs.Screen name="weather" />
			<Tabs.Screen name="community" />
			<Tabs.Screen name="explore" />
			<Tabs.Screen name="settings" />
			<Tabs.Screen name="results" options={{
				href: null,
			}} />
			<Tabs.Screen name="disease-details" options={{
				href: null,
			}} />

		</Tabs>
	);
}
