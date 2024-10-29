import { Text } from "@/components/ui/text";
import { View, Image, Alert, Platform } from "react-native";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { router } from "expo-router";
import { cn } from "@/lib/utils";
import { H1 } from "@/components/ui/typography";

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
  const [placeName, setPlaceName] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Sorry, we need camera permissions to make this work!");
        }
      }

      const staticLocation = {
        coords: {
          latitude: 17.537188962169562,
          longitude: 78.38519009404381,
          accuracy: 0,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: 0
      };
      setLocation(staticLocation);

      try {
        const [place] = await Location.reverseGeocodeAsync({
          latitude: staticLocation.coords.latitude,
          longitude: staticLocation.coords.longitude,
        });
        if (place) {
          setPlaceName(place.district || place.region || place.city);
        }
      } catch (error) {
        console.error("Error getting place name:", error);
      }
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
      <View className="bg-blue-50 p-4 rounded-lg mb-6 flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-bold mb-1">
            {placeName || "Loading location..."}
          </Text>
          {location && (
            <Text className="text-sm text-gray-600">
              📍 {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
            </Text>
          )}
        </View>
        <Button
          onPress={() => router.push("/weather")}
          className="bg-blue-500"
        >
          <Text className="text-white font-bold">Check Weather</Text>
        </Button>
      </View>

      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Select Your Crop:</Text>
        <Select
          value={selectedPlant}
          onValueChange={setSelectedPlant}
          items={PLANT_TYPES}
          className="w-full bg-gray-50 border-2 border-gray-200"
        />
      </View>

      <View className="items-center mb-6">
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-[300px] rounded-xl"
          />
        ) : (
          <View className="w-full h-[300px] rounded-xl bg-gray-50 justify-center items-center border-2 border-gray-200 border-dashed">
            <Text className="text-lg text-gray-500 font-semibold">Take or select a photo of your crop</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-between mb-6">
        <Button
          onPress={takePhoto}
          className="w-[48%] bg-indigo-600 py-4 shadow-md"
        >
          <Text className="text-white text-lg font-bold">📸 Camera</Text>
        </Button>
        <Button
          onPress={pickImage}
          className="w-[48%] bg-purple-600 py-4 shadow-md"
        >
          <Text className="text-white text-lg font-bold">🖼️ Gallery</Text>
        </Button>
      </View>

      {image && (
        <Button
          onPress={handlePredictDisease}
          className={cn(
            "bg-orange-500 py-4 shadow-lg",
            predicting && "bg-gray-400"
          )}
          disabled={predicting}
        >
          <Text className="text-white text-xl font-bold">
            {predicting ? "Analyzing..." : "Detect Disease"}
          </Text>
        </Button>
      )}
    </View>
  );
}
