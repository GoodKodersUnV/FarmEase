import { useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Modal, Platform } from "react-native";
import { Post, NewPost } from "@/app/types/community";
import { Heart, MessageCircle, Send, Plus, Image as ImageIcon, X } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

export default function CommunityScreen() {
	const [posts, setPosts] = useState<Post[]>([
		{
			id: "1",
			username: "Raju",
			userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
			image: "https://plus.unsplash.com/premium_photo-1678655852198-9af5cf9da524?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			caption: "Our paddy fields are flourishing! The recent rainfall has been a blessing. 🌾 #OrganicFarming #Sustainability",
			likes: 142,
			isLiked: false,
			comments: [
				{
					id: "c1",
					username: "KisanSuresh",
					text: "Amazing progress! Which variety of rice is this?",
					timestamp: "2h ago"
				},
				{
					id: "c2",
					username: "AgroExpert",
					text: "Perfect water level maintenance! 👍",
					timestamp: "1h ago"
				}
			],
			timestamp: "3h ago"
		},
		{
			id: "2",
			username: "Lakshmi",
			userAvatar: "https://randomuser.me/api/portraits/women/45.jpg",
			image: "https://images.unsplash.com/photo-1604300721398-3f58fdf81780?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			caption: "First batch of organic vegetables ready for the market! 🥬🍅 #FarmFresh #LocalProduce",
			likes: 98,
			isLiked: true,
			comments: [
				{
					id: "c3",
					username: "GreenThumb",
					text: "Those tomatoes look perfect! What's your secret?",
					timestamp: "30m ago"
				}
			],
			timestamp: "5h ago"
		},
		{
			id: "3",
			username: "KisanPatel",
			userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
			image: "https://plus.unsplash.com/premium_photo-1661825317479-0b8e91a640b7?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			caption: "New drip irrigation system installed! Saving water and improving yield. 💧 #SmartFarming",
			likes: 76,
			isLiked: false,
			comments: [],
			timestamp: "1d ago"
		}
	]);

	const [newComment, setNewComment] = useState("");
	const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
	const [isNewPostModalVisible, setIsNewPostModalVisible] = useState(false);
	const [newPost, setNewPost] = useState<NewPost>({ image: "", caption: "" });

	const handleLike = (postId: string) => {
		setPosts(posts.map(post => {
			if (post.id === postId) {
				return {
					...post,
					likes: post.isLiked ? post.likes - 1 : post.likes + 1,
					isLiked: !post.isLiked
				};
			}
			return post;
		}));
	};

	const handleComment = (postId: string) => {
		if (!newComment.trim()) return;

		setPosts(posts.map(post => {
			if (post.id === postId) {
				return {
					...post,
					comments: [...post.comments, {
						id: Date.now().toString(),
						username: "udaysagar",
						text: newComment,
						timestamp: "Just now"
					}]
				};
			}
			return post;
		}));

		setNewComment("");
		setActiveCommentId(null);
	};

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setNewPost({ ...newPost, image: result.assets[0].uri });
		}
	};

	const handleCreatePost = () => {
		if (!newPost.image || !newPost.caption.trim()) return;

		const post: Post = {
			id: Date.now().toString(),
			username: "udaysagar",
			userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
			image: newPost.image,
			caption: newPost.caption,
			likes: 0,
			isLiked: false,
			comments: [],
			timestamp: "Just now"
		};

		setPosts([post, ...posts]);
		setNewPost({ image: "", caption: "" });
		setIsNewPostModalVisible(false);
	};

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{posts.map(post => (
					<View key={post.id} className="mb-6 bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
						{/* Post Header */}
						<View className="flex-row items-center p-4">
							<Image
								source={{ uri: post.userAvatar }}
								className="w-12 h-12 rounded-full border-2 border-green-500"
							/>
							<View className="ml-3 flex-1">
								<Text className="font-bold text-green-800 text-lg">{post.username}</Text>
								<Text className="text-green-600 text-xs">{post.timestamp}</Text>
							</View>
							<TouchableOpacity className="bg-green-50 p-2 rounded-full">
								<Text className="text-green-600">•••</Text>
							</TouchableOpacity>
						</View>

						{/* Post Image */}
						<View className="bg-black rounded-xl overflow-hidden">
							<Image
								source={{ uri: post.image }}
								className="w-full h-96 opacity-95"
								resizeMode="cover"
							/>
						</View>

						{/* Actions */}
						<View className="p-4">
							<View className="flex-row items-center justify-between">
								<View className="flex-row items-center gap-6">
									<TouchableOpacity 
										onPress={() => handleLike(post.id)} 
										className="flex-row items-center gap-2"
									>
										<Heart 
											size={28} 
											color={post.isLiked ? "#ef4444" : "#166534"} 
											fill={post.isLiked ? "#ef4444" : "none"}
										/>
										<Text className="font-semibold text-green-800">{post.likes}</Text>
									</TouchableOpacity>
									<TouchableOpacity 
										onPress={() => setActiveCommentId(post.id)}
										className="flex-row items-center gap-2"
									>
										<MessageCircle size={28} color="#166534" />
										<Text className="font-semibold text-green-800">
											{post.comments.length}
										</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity>
									<Send size={24} color="#166534" />
								</TouchableOpacity>
							</View>

							{/* Caption */}
							<View className="mt-4">
								<Text className="text-base leading-6">
									<Text className="font-bold text-green-800">{post.username}</Text>{" "}
									{post.caption}
								</Text>
							</View>

							{/* Comments */}
							{post.comments.length > 0 && (
								<View className="mt-4 bg-green-50 rounded-2xl p-4">
									{post.comments.map(comment => (
										<View key={comment.id} className="mb-3 last:mb-0">
											<View className="flex-row justify-between">
												<Text className="font-bold text-green-800">{comment.username}</Text>
												<Text className="text-xs text-green-600">{comment.timestamp}</Text>
											</View>
											<Text className="text-green-900 mt-1">{comment.text}</Text>
										</View>
									))}
								</View>
							)}

							{/* Comment Input */}
							{activeCommentId === post.id && (
								<View className="flex-row items-center mt-4">
									<TextInput
										className="flex-1 mr-2 p-4 border border-green-300 rounded-2xl bg-green-50"
										placeholder="Share your farming tips..."
										value={newComment}
										onChangeText={setNewComment}
									/>
									<TouchableOpacity 
										onPress={() => handleComment(post.id)}
										className="bg-green-600 p-4 rounded-2xl"
									>
										<Send size={20} color="#fff" />
									</TouchableOpacity>
								</View>
							)}
						</View>
					</View>
				))}
			</ScrollView>

			{/* Floating Action Button */}
			<TouchableOpacity 
				onPress={() => setIsNewPostModalVisible(true)}
				className="absolute bottom-6 right-6 bg-green-600 w-16 h-16 rounded-full items-center justify-center shadow-lg"
				style={{
					elevation: 5,
					shadowColor: "#166534",
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.3,
					shadowRadius: 4,
				}}
			>
				<Plus size={32} color="#fff" />
			</TouchableOpacity>

			<Modal
				visible={isNewPostModalVisible}
				animationType="slide"
				transparent={true}
			>
				<View className="flex-1 bg-black/50 justify-end">
					<View className="bg-white rounded-t-3xl p-6">
						<View className="flex-row justify-between items-center mb-6">
							<Text className="text-2xl font-bold text-green-800">Share Your Farm Story</Text>
							<TouchableOpacity 
								onPress={() => setIsNewPostModalVisible(false)}
								className="bg-green-50 p-2 rounded-full"
							>
								<X size={24} color="#166534" />
							</TouchableOpacity>
						</View>

						<TouchableOpacity 
							onPress={pickImage}
							className="border-2 border-dashed border-green-300 rounded-2xl p-6 mb-4 items-center bg-green-50"
						>
							{newPost.image ? (
								<Image 
									source={{ uri: newPost.image }} 
										className="w-full h-56 rounded-xl"
										resizeMode="cover"
								/>
							) : (
								<View className="items-center py-8">
									<ImageIcon size={48} color="#166534" />
									<Text className="mt-4 text-green-800 font-semibold">Tap to choose a photo</Text>
									<Text className="mt-2 text-green-600 text-center">Share your farm's beauty with the community</Text>
								</View>
							)}
						</TouchableOpacity>

						<TextInput
							className="border border-green-300 rounded-2xl p-4 mb-6 bg-green-50 min-h-[100px]"
							placeholder="Tell us about your farming experience..."
							value={newPost.caption}
							onChangeText={(text) => setNewPost({ ...newPost, caption: text })}
							multiline
							textAlignVertical="top"
						/>

						<TouchableOpacity 
							onPress={handleCreatePost}
							className="bg-green-600 p-4 rounded-2xl items-center shadow-sm"
						>
							<Text className="text-white font-bold text-lg">Share with Community</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#f0fdf4",
	}
});
