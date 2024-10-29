import { View, ScrollView, TouchableOpacity, Image } from "react-native";
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

const DISEASE_FERTILIZERS: Record<string, any> = {
  "fungicide": {
    name: "Copper Fungicide",
    image: "https://southernag.com/wp-content/uploads/2020/06/COPPER-LIQ-FUNG-PINT-mu.jpg",
    description: "Controls fungal diseases",
    price_range: "₹500-700/L",
    usage: "2-3ml per liter of water"
  },
  "organic_fungicide": {
    name: "Neem Oil",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8GVOg4V4xbI53C0IamaplUxTIsbn3uR6o2w&s",
    description: "Natural disease control",
    price_range: "₹200-300/L",
    usage: "5ml per liter of water"
  },
  "soil_treatment": {
    name: "Trichoderma",
    image: "https://m.media-amazon.com/images/I/61kA8t-efbL.jpg",
    description: "Beneficial fungi for soil",
    price_range: "₹400-500/kg",
    usage: "2kg per acre"
  },
  "plant_booster": {
    name: "Seaweed Extract",
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/soil-manure/a/q/z/0-75-combo-of-seaweed-fertilizer-micronutrient-fertilizer-and-original-imaghfgmjnm2nye9.jpeg?q=20&crop=false",
    description: "Improves plant immunity",
    price_range: "₹800-1000/L",
    usage: "2-3ml per liter"
  },
  "bio_control": {
    name: "Bacillus subtilis",
    image: "https://krishisevakendra.in/cdn/shop/files/Untitleddesign_27.webp?v=1701782050",
    description: "Biological disease control",
    price_range: "₹600-800/kg",
    usage: "1kg per acre"
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
          {diseaseInfo.treatment?.map((item: string, index: number) => (
            <Text key={index} className="text-base mb-2 text-blue-900">• {item}</Text>
          ))}
        </View>

        <View className="bg-purple-50 p-6 rounded-xl mb-6 border border-purple-100">
          <Text className="text-2xl font-semibold mb-3 text-purple-800">Prevention</Text>
          {diseaseInfo.prevention.map((item: string, index: number) => (
            <Text key={index} className="text-base mb-2 text-purple-900">• {item}</Text>
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-2xl font-semibold mb-4 text-gray-800">
            Recommended Products
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            {Object.entries(DISEASE_FERTILIZERS).map(([key, product]) => (
              <TouchableOpacity
                key={key}
                className="mr-4 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
                style={{ width: 200 }}
              >
                <Image
                  source={{ uri: product.image }}
                  className="w-full h-32"
                  resizeMode="contain"
                />
                <View className="p-3">
                  <Text className="text-lg font-bold text-gray-800 mb-1">
                    {product.name}
                  </Text>
                  <Text className="text-sm text-gray-500 mb-2">
                    {product.description}
                  </Text>
                  <View className="space-y-2">
                    <Text className="text-xs text-green-800 bg-green-100 px-2 py-1 rounded-full">
                      {product.price_range}
                    </Text>
                    <Text className="text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded-full">
                      Usage: {product.usage}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className="bg-emerald-50 p-4 rounded-2xl mb-6">
            <Text className="text-xl font-bold text-emerald-800 mb-4">
              Application Guide
            </Text>
            <View className="space-y-3">
              <Text className="text-emerald-700">
                1️⃣ Clean equipment thoroughly before application
              </Text>
              <Text className="text-emerald-700">
                2️⃣ Apply during early morning or late evening
              </Text>
              <Text className="text-emerald-700">
                3️⃣ Ensure complete coverage of affected areas
              </Text>
              <Text className="text-emerald-700">
                4️⃣ Repeat application as per product instructions
              </Text>
              <Text className="text-emerald-700 mt-2">
                ⚠️ Always wear protective gear during application
              </Text>
            </View>
          </View>

          <View className="bg-red-50 p-4 rounded-2xl mb-6">
            <Text className="text-xl font-bold text-red-800 mb-4">
              Safety Precautions
            </Text>
            <View className="space-y-2">
              <Text className="text-red-700">
                • Wear protective clothing and masks
              </Text>
              <Text className="text-red-700">
                • Keep children and pets away during application
              </Text>
              <Text className="text-red-700">
                • Store products in original containers
              </Text>
              <Text className="text-red-700">
                • Follow recommended dosage strictly
              </Text>
              <Text className="text-red-700">
                • Wash hands thoroughly after handling
              </Text>
            </View>
          </View>
        </View>

        <Button
          onPress={() => router.back()}
          className="bg-green-600 py-4 rounded-xl mx-6 mb-6"
        >
          <Text className="text-white text-lg font-bold">Back to Results</Text>
        </Button>
      </View>
    </ScrollView>
  );
}
