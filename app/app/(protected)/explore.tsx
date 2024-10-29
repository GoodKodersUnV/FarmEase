import { useState } from "react";
import { View, ScrollView, TextInput, TouchableOpacity, Image } from "react-native";
import { Text } from "@/components/ui/text";
import { Search, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

export default function ExploreScreen() {
	const [searchQuery, setSearchQuery] = useState("");

	const crops = [
		{
			id: 1,
			name: "Wheat",
			image: "https://plus.unsplash.com/premium_photo-1661963447711-27f892ffe292?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			season: "Rabi (Winter)",
			shortDescription: "A staple grain crop perfect for winter cultivation.",
			category: "Cereal",
			difficulty: "Moderate"
		},
		{
			id: 2,
			name: "Rice",
			image: "https://plus.unsplash.com/premium_photo-1674654419403-1a80edb26881?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			season: "Kharif (Monsoon)",
			shortDescription: "Essential grain crop suited for monsoon season.",
			category: "Cereal",
			difficulty: "Hard"
		},
		{
			id: 3,
			name: "Cotton",
			image: "https://images.unsplash.com/photo-1502395809857-fd80069897d0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			season: "Kharif (Monsoon)",
			shortDescription: "Major cash crop with high market value.",
			category: "Fiber",
			difficulty: "Hard"
		},
		{
			id: 4,
			name: "Tomatoes",
			image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80",
			season: "Year-round",
			shortDescription: "Popular vegetable crop with quick returns.",
			category: "Vegetable",
			difficulty: "Easy"
		},
		{
			id: 5,
			name: "Sugarcane",
			image: "https://plus.unsplash.com/premium_photo-1695189283588-1d3c6f709afc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			season: "Spring",
			shortDescription: "Long-duration crop with high sugar content.",
			category: "Cash Crop",
			difficulty: "Hard"
		},
		{
			id: 6,
			name: "Potatoes",
			image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80",
			season: "Rabi (Winter)",
			shortDescription: "Underground tuber crop with high yield potential.",
			category: "Vegetable",
			difficulty: "Moderate"
		},
		{
			id: 7,
			name: "Maize",
			image: "https://plus.unsplash.com/premium_photo-1661823535147-483dbfa82806?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			season: "Kharif (Monsoon)",
			shortDescription: "Versatile crop used for food and animal feed.",
			category: "Cereal",
			difficulty: "Moderate"
		},
		{
			id: 8,
			name: "Soybeans",
			image: "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?q=80",
			season: "Kharif (Monsoon)",
			shortDescription: "Protein-rich legume with high market demand.",
			category: "Pulse",
			difficulty: "Moderate"
		},
		{
			id: 9,
			name: "Onions",
			image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80",
			season: "Rabi (Winter)",
			shortDescription: "Essential vegetable crop with good returns.",
			category: "Vegetable",
			difficulty: "Easy"
		},
		{
			id: 10,
			name: "Mangoes",
			image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80",
			season: "Summer",
			shortDescription: "Popular fruit crop with high value.",
			category: "Fruit",
			difficulty: "Hard"
		}
	];

	const filteredCrops = crops.filter(crop =>
		crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		crop.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty.toLowerCase()) {
			case "easy":
				return "bg-green-100 text-green-800";
			case "moderate":
				return "bg-yellow-100 text-yellow-800";
			case "hard":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<View className="flex-1 bg-white">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<View className="p-6">
					{/* Search Bar */}
					<View className="mb-6">
						<View className="relative">
							<TextInput
								className="bg-gray-100 px-4 py-3 rounded-xl pl-12"
								placeholder="Search crops by name or category..."
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
							<View className="absolute left-4 top-3">
								<Search size={24} color="#666" />
							</View>
						</View>
					</View>

					{/* Categories */}
					<ScrollView 
						horizontal 
						showsHorizontalScrollIndicator={false} 
						className="mb-6"
					>
						{["All", "Cereal", "Vegetable", "Fruit", "Pulse", "Cash Crop", "Fiber"].map((category) => (
							<TouchableOpacity 
								key={category}
								onPress={() => setSearchQuery(category === "All" ? "" : category)}
								className={`mr-4 px-6 py-3 rounded-full border-2 
									${searchQuery === category || (category === "All" && !searchQuery)
										? "border-green-600 bg-green-50"
										: "border-gray-200"
									}`}
							>
								<Text className={`font-semibold ${
									searchQuery === category || (category === "All" && !searchQuery)
										? "text-green-800"
										: "text-gray-600"
								}`}>
									{category}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					{/* Crops Grid */}
					<View className="flex-row flex-wrap justify-between">
						{filteredCrops.map((crop) => (
							<TouchableOpacity
								key={crop.id}
								className="w-[48%] mb-4 bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100"
								onPress={() => router.push(`/crop-details/${crop.id}`)}
							>
								<Image
									source={{ uri: crop.image }}
									className="w-full h-40"
									resizeMode="cover"
								/>
								<View className="p-4">
									<Text className="text-lg font-bold text-gray-800 mb-1">
										{crop.name}
									</Text>
									<Text className="text-sm text-gray-500 mb-2">
										{crop.season}
									</Text>
									<View className="flex-row justify-between items-center">
										<Text className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(crop.difficulty)}`}>
											{crop.difficulty}
										</Text>
										<ChevronRight size={20} color="#166534" />
									</View>
								</View>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
}