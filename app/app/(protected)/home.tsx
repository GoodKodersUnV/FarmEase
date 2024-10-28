import { Text } from "@/components/ui/text";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Button } from "@/components/ui/button";

export default function HomeScreen() {
	const [image, setImage] = useState<string | null>(null);
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [locationError, setLocationError] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setLocationError("Permission to access location was denied");
				return;
			}

			const currentLocation = await Location.getCurrentPositionAsync({});
			setLocation(currentLocation);
		})();
	}, []);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const takePhoto = async () => {
		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	const handlePredictDisease = () => {
		console.log("Predicting disease...");
		console.log("Location:", location);
		console.log("Image:", image);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Crop Disease Detection</Text>
			
			<View style={styles.locationContainer}>
				<Text style={styles.subtitle}>Location Status:</Text>
				{locationError ? (
					<Text style={styles.error}>{locationError}</Text>
				) : location ? (
					<Text style={styles.locationText}>
						📍 Lat: {location.coords.latitude.toFixed(4)}, Long: {location.coords.longitude.toFixed(4)}
					</Text>
				) : (
					<Text>Getting location...</Text>
				)}
			</View>

			<View style={styles.imageContainer}>
				{image ? (
					<Image source={{ uri: image }} style={styles.imagePreview} />
				) : (
					<View style={styles.placeholderImage}>
						<Text>No image selected</Text>
					</View>
				)}
			</View>

			<View style={styles.buttonContainer}>
				<Button onPress={takePhoto} style={styles.button}>
					<Text style={styles.buttonText}>Take Photo</Text>
				</Button>
				<Button onPress={pickImage} style={styles.button}>
					<Text style={styles.buttonText}>Pick from Gallery</Text>
				</Button>
			</View>
 
			{image && (
				<Button 
					onPress={handlePredictDisease} 
					style={styles.predictButton}
				>
					<Text style={styles.buttonText}>Predict Disease</Text>
				</Button>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
	},
	locationContainer: {
		marginBottom: 20,
	},
	locationText: {
		fontSize: 16,
	},
	error: {
		color: "red",
		fontSize: 16,
	},
	imageContainer: {
		alignItems: "center",
		marginBottom: 20,
	},
	imagePreview: {
		width: 300,
		height: 225,
		borderRadius: 8,
	},
	placeholderImage: {
		width: 300,
		height: 225,
		borderRadius: 8,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: "#ddd",
		borderStyle: "dashed",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 20,
	},
	button: {
		width: "45%",
	},
	predictButton: {
		backgroundColor: "#4CAF50",
		marginTop: 10,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
