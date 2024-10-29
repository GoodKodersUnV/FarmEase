import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/lib/useColorScheme";

const notifications = [
  {
    id: 1,
    title: "Rain Alert",
    message: "There's a 90% chance of rain today. Consider protecting your crops.",
    icon: "rainy-outline", 
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "High Humidity Warning",
    message: "Humidity levels are above 85%. This might affect your tomato plants.",
    icon: "water-outline",
    time: "5 hours ago"
  },
  {
    id: 3,
    title: "Disease Risk Alert", 
    message: "Current weather conditions are favorable for fungal diseases. Check your crops.",
    icon: "warning-outline",
    time: "20 hours ago"
  },
  {
    id: 4,
    title: "Harvest Time",
    message: "Your wheat crop should be ready for harvest within the next week.",
    icon: "leaf-outline",
    time: "1 day ago"
  }
];

export default function NotificationsModal() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className={`flex-1 ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <ScrollView className="flex-1">
        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id}
            className={`flex-row p-4 border-b ${isDark ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}
          >
            <Ionicons 
              name={notification.icon as any}
              size={24}
              color={isDark ? "white" : "black"}
              className="mr-3"
            />
            <View className="flex-1">
              <Text className={`text-base font-bold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>
                {notification.title}
              </Text>
              <Text className={`text-sm mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {notification.message}
              </Text>
              <Text className="text-xs text-gray-500">
                {notification.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}