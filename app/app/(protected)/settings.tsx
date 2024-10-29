import { View, ScrollView, Image, Modal, TouchableOpacity } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { User, LogOut, Mail, Phone, Calendar, Clock, Shield, MapPin, Sprout, Settings } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SettingsScreen() {
	const { signOut, user } = useSupabase();
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<ScrollView className="flex-1 bg-background">
				<View className="bg-gradient-to-b from-primary-600 to-primary-500 pt-12 pb-20 rounded-b-[48px] shadow-xl">
					<View className="items-center">
						<View className="bg-white p-2 rounded-full shadow-md">
							<Image
								source={{ uri: "https://ui-avatars.com/api/?name=" + (user?.email || "User") + "&background=f0fdf4&color=166534" }}
								className="w-28 h-28 rounded-full"
							/>
						</View>
						{user?.email && (
							<Text className="font-medium mt-4 text-lg">
								{user.email}
							</Text>
						)}
					</View>
				</View>

				{user ? (
					<View className="px-6 -mt-14">
						<View className="bg-white rounded-3xl p-8 shadow-xl mb-6 border border-gray-100">
							<H2 className="mb-6 text-primary-600 text-xl">
								Account Information
							</H2>

							<View className="space-y-6">
								<View className="flex-row items-center">
									<View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
										<Mail size={24} color="#166534" />
									</View>
									<View>
										<Text className="text-sm text-gray-500 mb-1">Email</Text>
										<Text className="font-semibold text-gray-800">{user.email}</Text>
									</View>
								</View>

								<View className="flex-row items-center">
									<View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
										<Phone size={24} color="#166534" />
									</View>
									<View>
										<Text className="text-sm text-gray-500 mb-1">Phone</Text>
										<Text className="font-semibold text-gray-800">{user.phone || "Not set"}</Text>
									</View>
								</View>

								<View className="flex-row items-center">
									<View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
										<Sprout size={24} color="#166534" />
									</View>
									<View>
										<Text className="text-sm text-gray-500 mb-1">Current Crop</Text>
										<Text className="font-semibold text-gray-800">Potato</Text>
									</View>
								</View>

								<View className="flex-row items-center">
									<View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
										<MapPin size={24} color="#166534" />
									</View>
									<View>
										<Text className="text-sm text-gray-500 mb-1">Current Location</Text>
										<Text className="font-semibold text-gray-800">17.5371, 78.3851</Text>
									</View>
								</View>

								<View className="flex-row items-center">
									<View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
										<Calendar size={24} color="#166534" />
									</View>
									<View>
										<Text className="text-sm text-gray-500 mb-1">Account Created</Text>
										<Text className="font-semibold text-gray-800">{new Date(user.created_at).toLocaleDateString()}</Text>
									</View>
								</View>

								<View className="flex-row items-center">
									<View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mr-4">
										<Clock size={24} color="#166534" />
									</View>
									<View>
										<Text className="text-sm text-gray-500 mb-1">Last Sign In</Text>
										<Text className="font-semibold text-gray-800">
											{user.last_sign_in_at
												? new Date(user.last_sign_in_at).toLocaleDateString()
												: "Never"}
										</Text>
									</View>
								</View>
							</View>
						</View>

						<View className="mb-8">
							<Button
								className="w-full bg-red-500 py-4 rounded-2xl shadow-md"
								size="lg"
								variant="destructive"
								onPress={() => signOut()}
							>
								<View className="flex-row items-center">
									<LogOut size={24} color="white" />
									<Text className="text-white ml-3 font-bold text-lg">Sign Out</Text>
								</View>
							</Button>
						</View>
					</View>
				) : (
					<View className="p-8 bg-white rounded-3xl mx-6 -mt-14 shadow-xl">
						<Muted className="text-center text-lg">User data not available</Muted>
					</View>
				)}
			</ScrollView>

			<Modal
				animationType="slide"
				transparent={true}
				visible={showModal}
				onRequestClose={() => setShowModal(false)}
			>
				<TouchableOpacity
					style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}
					activeOpacity={1}
					onPress={() => setShowModal(false)}
				>
					<View className="bg-white rounded-t-3xl absolute bottom-0 w-full p-6">
						<View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />
						<H2 className="text-xl mb-4">Edit Settings</H2>

						<View className="space-y-4">
							<Button
								className="w-full bg-primary-600"
								onPress={() => {

									setShowModal(false);
								}}
							>
								<Text className="text-white">Edit Profile</Text>
							</Button>

							<Button
								className="w-full bg-primary-600"
								onPress={() => {
									setShowModal(false);
								}}
							>
								<Text className="text-white">Change Password</Text>
							</Button>

							<Button
								className="w-full bg-primary-600"
								onPress={() => {
									setShowModal(false);
								}}
							>
								<Text className="text-white">Notification Settings</Text>
							</Button>
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
}
