import { View, ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { useLocalSearchParams, router } from "expo-router";

const DISEASE_INFO: Record<string, any> = {
  "Early blight": {
    description: "Early blight is a serious fungal disease that affects potato plants, caused by the fungus Alternaria solani. It can significantly impact crop yield and quality if left untreated.",
    symptoms: [
      "Dark brown to black lesions with concentric rings (target-like pattern)",
      "Yellowing and browning of leaves starting from older foliage", 
      "Lesions begin as small brown spots that enlarge over time",
      "Affected leaves eventually wither and die",
      "Stem lesions are dark, slightly sunken and concentric",
      "Reduced tuber quality and yield"
    ],
    treatment: [
      "Remove and destroy infected plant parts immediately",
      "Apply appropriate fungicides according to local recommendations",
      "Ensure proper ventilation between plants",
      "Avoid overhead irrigation to reduce leaf wetness",
      "Maintain balanced soil nutrition",
      "Practice good sanitation in the field"
    ],
    prevention: [
      "Use certified disease-free seed potatoes",
      "Implement crop rotation with non-host plants for 2-3 years",
      "Plant resistant varieties when available", 
      "Maintain proper plant spacing for good airflow",
      "Keep plants well-fertilized to improve disease resistance",
      "Monitor fields regularly for early detection",
      "Control weeds that may harbor the disease"
    ]
  },
  "Late blight": {
    description: "Late blight, caused by Phytophthora infestans, is a devastating disease of potato plants that can destroy entire fields within days under favorable conditions. This is the same disease that caused the Irish Potato Famine.",
    symptoms: [
      "Pale green water-soaked spots that quickly turn brown-black",
      "White fuzzy growth on leaf undersides in humid conditions",
      "Rapid blackening and death of leaves and stems",
      "Dark brown surface lesions on tubers",
      "Entire plant collapse in severe cases",
      "Distinctive foul odor from infected tissue"
    ],
    treatment: [
      "Apply protective fungicides before disease onset",
      "Remove and destroy all infected plant material",
      "Harvest tubers as soon as possible if disease is present",
      "Improve drainage in the field",
      "Destroy volunteer plants and weeds",
      "Monitor weather conditions for disease-favorable periods"
    ],
    prevention: [
      "Plant certified disease-free seed potatoes",
      "Choose resistant varieties",
      "Avoid overhead irrigation",
      "Space plants properly for good air circulation", 
      "Monitor local disease forecasting systems",
      "Practice strict field sanitation",
      "Store tubers in cool, dry conditions"
    ]
  },
  "healthy": {
    description: "A healthy potato plant exhibits vigorous growth and normal development patterns, serving as a baseline for identifying potential issues.",
    symptoms: [
      "Deep green foliage",
      "Sturdy, upright stems",
      "Uniform leaf development",
      "No spots or lesions on leaves",
      "Good canopy development",
      "Normal flowering pattern"
    ],
    maintenance: [
      "Regular balanced fertilization",
      "Proper irrigation scheduling", 
      "Routine pest monitoring",
      "Timely weed control",
      "Appropriate hilling practices",
      "Regular field scouting"
    ],
    bestPractices: [
      "Maintain optimal soil pH (5.8-6.5)",
      "Practice crop rotation",
      "Use certified seed potatoes",
      "Proper spacing between plants",
      "Adequate soil preparation",
      "Timely harvest when mature"
    ]
  }
};

export default function DiseaseDetailsScreen() {
  const params = useLocalSearchParams<{
    disease: string;
    plantType: string;
    rawDiseaseName: string;
  }>();

  const diseaseInfo = DISEASE_INFO[params.rawDiseaseName] || {
    description: "Information not available",
    symptoms: [],
    treatment: [],
    prevention: []
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2 text-green-800">
          {params.rawDiseaseName}
        </Text>

        <Text className="text-xl mb-6 text-green-700 capitalize">
          Plant: {params.plantType}
        </Text>

        <View className="bg-green-50 p-6 rounded-xl mb-6 border border-green-100">
          <Text className="text-2xl font-semibold mb-3 text-green-800">Description</Text>
          <Text className="text-base text-green-900">{diseaseInfo.description}</Text>
        </View>

        <View className="bg-orange-50 p-6 rounded-xl mb-6 border border-orange-100">
          <Text className="text-2xl font-semibold mb-3 text-orange-800">Symptoms</Text>
          {diseaseInfo.symptoms.map((symptom: string, index: number) => (
            <Text key={index} className="text-base mb-2 text-orange-900">• {symptom}</Text>
          ))}
        </View>

        <View className="bg-blue-50 p-6 rounded-xl mb-6 border border-blue-100">
          <Text className="text-2xl font-semibold mb-3 text-blue-800">Treatment</Text>
          {diseaseInfo.treatment.map((item: string, index: number) => (
            <Text key={index} className="text-base mb-2 text-blue-900">• {item}</Text>
          ))}
        </View>

        <View className="bg-purple-50 p-6 rounded-xl mb-6 border border-purple-100">
          <Text className="text-2xl font-semibold mb-3 text-purple-800">Prevention</Text>
          {diseaseInfo.prevention.map((item: string, index: number) => (
            <Text key={index} className="text-base mb-2 text-purple-900">• {item}</Text>
          ))}
        </View>

        <Button
          onPress={() => router.back()}
          className="bg-green-600 py-4 rounded-xl"
        >
          <Text className="text-white text-lg font-bold">Back to Results</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
