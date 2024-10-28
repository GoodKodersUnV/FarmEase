import { Text } from "@/components/ui/text";
import { View, Image, Alert, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { router } from "expo-router";
import { cn } from "@/lib/utils";

const API_URL = "http://localhost:8000";

const PLANT_TYPES = [
  { label: "Potato", value: "potato" },
  { label: "Tomato", value: "tomato" },
  { label: "Pepper", value: "pepper" },
];

export interface PredictionResponse {
  class: string;
  confidence: number;
}

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [predicting, setPredicting] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState("potato");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      }

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

  const handlePredictDisease = async () => {
    if (!image) return;

    try {
      setPredicting(true);
      
      const formData = new FormData();
      const imageFile = {
        uri: image,
        type: "image/jpeg",
        name: "image.jpg"
      };
      
      formData.append("file", imageFile as any);

      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      
      router.push({
        pathname: "/results",
        params: {
          class: result.class,
          confidence: result.confidence,
          image: image,
          plantType: selectedPlant,
          latitude: location?.coords.latitude,
          longitude: location?.coords.longitude,
        }
      });

    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert(
        "Error",
        "Failed to predict disease. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setPredicting(false);
    }
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-4 text-center">
        Crop Disease Detection
      </Text>
      
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Plant Type:</Text>
        <Select
          value={selectedPlant}
          onValueChange={setSelectedPlant}
          items={PLANT_TYPES}
          className="w-full"
        />
      </View>
      
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Location Status:</Text>
        {locationError ? (
          <Text className="text-red-500">{locationError}</Text>
        ) : location ? (
          <Text className="text-base">
            📍 Lat: {location.coords.latitude.toFixed(4)}, Long: {location.coords.longitude.toFixed(4)}
          </Text>
        ) : (
          <Text>Getting location...</Text>
        )}
      </View>

      <View className="items-center mb-4">
        {image ? (
          <Image 
            source={{ uri: image }} 
            className="w-[300px] h-[225px] rounded-lg"
          />
        ) : (
          <View className="w-[300px] h-[225px] rounded-lg bg-gray-100 justify-center items-center border-2 border-gray-300 border-dashed">
            <Text>No image selected</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-around mb-4">
        <Button 
          onPress={takePhoto}
          className="w-[45%] bg-slate-600"
        >
          <Text className="text-white font-semibold">Take Photo</Text>
        </Button>
        <Button 
          onPress={pickImage}
          className="w-[45%] bg-slate-600"
        >
          <Text className="text-white font-semibold">Pick from Gallery</Text>
        </Button>
      </View>
 
      {image && (
        <Button 
          onPress={handlePredictDisease} 
          className={cn(
            "bg-green-500 mt-2",
            predicting && "bg-gray-500"
          )}
          disabled={predicting}
        >
          <Text className="text-white font-semibold">
            {predicting ? "Predicting..." : "Predict Disease"}
          </Text>
        </Button>
      )}
    </View>
  );
}
