import { View, Image, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useLocalSearchParams, router } from "expo-router";

export default function ResultsScreen() {
  const params = useLocalSearchParams<{
    class: string;
    confidence: string;
    image: string;
    plantType: string;
    latitude: string;
    longitude: string;
  }>();

  const formatDiseaseName = (name: string) => {
    return name.split("___")[1].replace(/_/g, " ");
  };

  const handleViewDetails = () => {
    router.push({
      pathname: "/disease-details",
      params: {
        disease: params.class,
        plantType: params.plantType,
        rawDiseaseName: params.class 
      }
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4 text-center">
          Detection Results
        </Text>

        <Image
          source={{ uri: params.image }}
          className="w-full h-[300px] rounded-lg mb-4"
        />

        <View className="bg-gray-50 p-4 rounded-lg mb-4">
          <Text className="text-lg font-semibold mb-2">
            Plant Type: {params.plantType}
          </Text>
          <Text className="text-lg font-semibold mb-2">
            Detected Disease: {params.class}
          </Text>
          <Text className="text-lg font-semibold mb-2">
            Confidence: {(parseFloat(params.confidence) * 100).toFixed(2)}%
          </Text>
          <Text className="text-base mb-2">
            Location: {params.latitude}, {params.longitude}
          </Text>
        </View>

        <Button
          onPress={handleViewDetails}
          className="bg-blue-500 mb-4"
        >
          <Text className="text-white font-semibold">
            View Disease Details
          </Text>
        </Button>

        <Button
          onPress={() => router.back()}
          className="bg-gray-500"
        >
          <Text className="text-white font-semibold">
            Back to Camera
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
