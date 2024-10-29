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
        rawDiseaseName: formatDiseaseName(params.class)
      }
    });
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-6 text-center text-green-800">
          Your Results
        </Text>

        <Image
          source={{ uri: params.image }}
          className="w-[250px] h-[250px] rounded-2xl mb-6 shadow-lg mx-auto"
        />

        <View className="bg-green-50 p-6 rounded-2xl mb-6 border-2 border-green-100">
          <View className="mb-4">
            <Text className="text-lg text-green-800 mb-1">Your Crop</Text>
            <Text className="text-2xl font-bold text-green-900 capitalize">
              {params.plantType}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg text-green-800 mb-1">Found Disease</Text>
            <Text className="text-2xl font-bold text-green-900">
              {formatDiseaseName(params.class)}
            </Text>
          </View>

          <View>
            <Text className="text-lg text-green-800 mb-1">How Sure We Are</Text>
            <Text className="text-2xl font-bold text-green-900">
              {(parseFloat(params.confidence) * 100).toFixed(0)}%
            </Text>
          </View>
        </View>

        <Button
          onPress={handleViewDetails}
          className="bg-green-600 py-4 mb-4 rounded-xl"
        >
          <Text className="text-white text-lg font-bold">
            See Treatment Guide
          </Text>
        </Button>

        <Button
          onPress={() => router.back()}
          className="bg-gray-600 py-4 rounded-xl"
        >
          <Text className="text-white text-lg font-bold">
            Take Another Photo
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
}
