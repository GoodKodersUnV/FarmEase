import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft, Droplets, Sun, Wind, Thermometer, Info } from "lucide-react-native";

const CROP_DETAILS: Record<number, any> = {
  1: {
    name: "Wheat",
    image: "https://plus.unsplash.com/premium_photo-1661963447711-27f892ffe292?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Wheat is one of the world's most important cereal crops. It's a hardy crop that can be grown in various climates and soil conditions.",
    season: {
      best: "Rabi (Winter)",
      sowing: "October-November",
      harvest: "March-April"
    },
    growing_conditions: {
      temperature: "15-25°C",
      rainfall: "450-650mm",
      soil_type: "Well-drained loamy",
      pH: "6.0-7.0"
    },
    cultivation: {
      seed_rate: "100-125 kg/hectare",
      spacing: "20-22.5 cm (row)",
      depth: "5-6 cm"
    },
    fertilizers: {
      nitrogen: "120 kg/ha",
      phosphorus: "60 kg/ha",
      potassium: "40 kg/ha"
    },
    irrigation: {
      frequency: "4-6 times",
      critical_stages: [
        "Crown root initiation",
        "Tillering",
        "Jointing",
        "Flowering",
        "Grain filling"
      ]
    },
    pests: [
      "Aphids",
      "Army worm",
      "Stem borer"
    ],
    diseases: [
      "Leaf rust",
      "Powdery mildew",
      "Loose smut"
    ],
    yield: "3.5-4.0 tonnes/hectare",
    market_price: "₹2000-2400/quintal"
  },
  2: {
    name: "Rice",
    image: "https://plus.unsplash.com/premium_photo-1674654419403-1a80edb26881?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Rice is a major staple food crop and the most important cereal crop in India. It's well-suited for regions with high rainfall and humidity.",
    season: {
      best: "Kharif (Monsoon)",
      sowing: "June-July",
      harvest: "November-December"
    },
    growing_conditions: {
      temperature: "22-32°C",
      rainfall: "1000-1500mm",
      soil_type: "Clay or clay loam",
      pH: "5.5-6.5"
    },
    cultivation: {
      seed_rate: "40-45 kg/hectare",
      spacing: "20x15 cm",
      depth: "2-3 cm"
    },
    fertilizers: {
      nitrogen: "100 kg/ha",
      phosphorus: "50 kg/ha",
      potassium: "50 kg/ha"
    },
    irrigation: {
      frequency: "Throughout growing period",
      critical_stages: [
        "Tillering",
        "Panicle initiation",
        "Flowering",
        "Grain filling"
      ]
    },
    pests: [
      "Stem borer",
      "Brown planthopper",
      "Leaf folder"
    ],
    diseases: [
      "Blast",
      "Bacterial blight",
      "Sheath blight"
    ],
    yield: "4.0-6.0 tonnes/hectare",
    market_price: "₹1800-2200/quintal"
  },
  3: {
    name: "Cotton",
    image: "https://images.unsplash.com/photo-1502395809857-fd80069897d0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Cotton is an important fiber crop with high commercial value. It requires warm climate and well-distributed rainfall.",
    season: {
      best: "Kharif (Monsoon)",
      sowing: "May-June",
      harvest: "November-December"
    },
    growing_conditions: {
      temperature: "21-30°C",
      rainfall: "500-1000mm",
      soil_type: "Deep black soil",
      pH: "6.5-8.0"
    },
    cultivation: {
      seed_rate: "15-20 kg/hectare",
      spacing: "60x30 cm",
      depth: "3-5 cm"
    },
    fertilizers: {
      nitrogen: "100-120 kg/ha",
      phosphorus: "50-60 kg/ha",
      potassium: "50 kg/ha"
    },
    irrigation: {
      frequency: "6-7 times",
      critical_stages: [
        "Flowering",
        "Boll formation",
        "Boll development"
      ]
    },
    pests: [
      "Bollworms",
      "Whitefly",
      "Pink bollworm"
    ],
    diseases: [
      "Wilt",
      "Root rot",
      "Leaf curl virus"
    ],
    yield: "15-20 quintals/hectare",
    market_price: "₹5000-6000/quintal"
  },
  4: {
    name: "Tomatoes",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80",
    description: "Tomatoes are a popular vegetable crop known for their versatility and nutritional value. They can be grown year-round with proper care and management.",
    season: {
      best: "Year-round",
      sowing: "Spring/Summer",
      harvest: "60-80 days after planting"
    },
    growing_conditions: {
      temperature: "20-27°C",
      rainfall: "400-600mm",
      soil_type: "Well-drained loamy",
      pH: "6.0-6.8"
    },
    cultivation: {
      seed_rate: "400-500g/hectare",
      spacing: "60x45 cm",
      depth: "1-2 cm"
    },
    fertilizers: {
      nitrogen: "100 kg/ha",
      phosphorus: "50 kg/ha",
      potassium: "50 kg/ha"
    },
    irrigation: {
      frequency: "Regular intervals",
      critical_stages: [
        "Seedling establishment",
        "Flowering",
        "Fruit development",
        "Fruit maturation"
      ]
    },
    pests: [
      "Tomato fruit worm",
      "Whiteflies",
      "Leaf miners"
    ],
    diseases: [
      "Early blight",
      "Late blight",
      "Fusarium wilt"
    ],
    yield: "20-25 tonnes/hectare",
    market_price: "₹1000-2500/quintal"
  },
  5: {
    name: "Sugarcane",
    image: "https://plus.unsplash.com/premium_photo-1695189283588-1d3c6f709afc?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sugarcane is a major cash crop known for its high sugar content. It's a long-duration crop that requires careful management for optimal yields.",
    season: {
      best: "Spring",
      sowing: "February-March",
      harvest: "December-March"
    },
    growing_conditions: {
      temperature: "21-27°C",
      rainfall: "1500-2000mm",
      soil_type: "Deep rich loamy",
      pH: "6.5-7.5"
    },
    cultivation: {
      seed_rate: "32000-40000 setts/hectare",
      spacing: "90x30 cm",
      depth: "5-7 cm"
    },
    fertilizers: {
      nitrogen: "250 kg/ha",
      phosphorus: "100 kg/ha",
      potassium: "120 kg/ha"
    },
    irrigation: {
      frequency: "25-30 times",
      critical_stages: [
        "Germination",
        "Tillering",
        "Grand growth",
        "Maturity"
      ]
    },
    pests: [
      "Early shoot borer",
      "Top borer",
      "Root borer"
    ],
    diseases: [
      "Red rot",
      "Smut",
      "Wilt"
    ],
    yield: "70-100 tonnes/hectare",
    market_price: "₹2800-3500/quintal"
  },
  6: {
    name: "Potatoes",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80",
    description: "Potatoes are a major tuber crop with high nutritional value and versatile uses. They are well-suited for winter cultivation.",
    season: {
      best: "Rabi (Winter)",
      sowing: "October-November",
      harvest: "January-February"
    },
    growing_conditions: {
      temperature: "15-25°C",
      rainfall: "500-700mm",
      soil_type: "Sandy loam",
      pH: "5.5-6.5"
    },
    cultivation: {
      seed_rate: "2500-3000 kg/hectare",
      spacing: "60x20 cm",
      depth: "5-6 cm"
    },
    fertilizers: {
      nitrogen: "120 kg/ha",
      phosphorus: "80 kg/ha",
      potassium: "100 kg/ha"
    },
    irrigation: {
      frequency: "6-8 times",
      critical_stages: [
        "Sprouting",
        "Stolon formation",
        "Tuber formation",
        "Tuber development"
      ]
    },
    pests: [
      "Potato tuber moth",
      "Cutworms",
      "Aphids"
    ],
    diseases: [
      "Late blight",
      "Early blight",
      "Black scurf"
    ],
    yield: "25-30 tonnes/hectare",
    market_price: "₹800-1200/quintal"
  },
  7: {
    name: "Maize",
    image: "https://plus.unsplash.com/premium_photo-1661823535147-483dbfa82806?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Maize is a versatile cereal crop used for both human consumption and animal feed. It's one of the most important crops in terms of global production.",
    season: {
      best: "Kharif (Monsoon)",
      sowing: "June-July",
      harvest: "September-October"
    },
    growing_conditions: {
      temperature: "21-30°C",
      rainfall: "600-1100mm",
      soil_type: "Well-drained loamy",
      pH: "6.0-7.0"
    },
    cultivation: {
      seed_rate: "20-25 kg/hectare",
      spacing: "60x20 cm",
      depth: "4-5 cm"
    },
    fertilizers: {
      nitrogen: "120 kg/ha",
      phosphorus: "60 kg/ha",
      potassium: "40 kg/ha"
    },
    irrigation: {
      frequency: "5-6 times",
      critical_stages: [
        "Knee-high stage",
        "Tasseling",
        "Silking",
        "Grain filling"
      ]
    },
    pests: [
      "Stem borer",
      "Fall armyworm",
      "Shoot fly"
    ],
    diseases: [
      "Leaf blight",
      "Rust",
      "Downy mildew"
    ],
    yield: "5-6 tonnes/hectare",
    market_price: "₹1800-2200/quintal"
  },
  8: {
    name: "Soybeans",
    image: "https://images.unsplash.com/photo-1601314167099-232775b3d6fd?q=80",
    description: "Soybeans are a protein-rich legume crop with high nutritional value and multiple industrial uses. It's an important oilseed crop.",
    season: {
      best: "Kharif (Monsoon)",
      sowing: "June-July",
      harvest: "October-November"
    },
    growing_conditions: {
      temperature: "20-30°C",
      rainfall: "600-1000mm",
      soil_type: "Well-drained loamy",
      pH: "6.0-7.5"
    },
    cultivation: {
      seed_rate: "65-75 kg/hectare",
      spacing: "45x5 cm",
      depth: "3-5 cm"
    },
    fertilizers: {
      nitrogen: "20 kg/ha",
      phosphorus: "60 kg/ha",
      potassium: "40 kg/ha"
    },
    irrigation: {
      frequency: "2-3 times",
      critical_stages: [
        "Flowering",
        "Pod formation",
        "Seed development"
      ]
    },
    pests: [
      "Stem fly",
      "Girdle beetle",
      "Pod borer"
    ],
    diseases: [
      "Yellow mosaic",
      "Rust",
      "Bacterial pustule"
    ],
    yield: "2.5-3.0 tonnes/hectare",
    market_price: "₹3800-4200/quintal"
  },
  9: {
    name: "Onions",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?q=80",
    description: "Onions are an essential vegetable crop with high demand throughout the year. They are known for their storage capacity and market value.",
    season: {
      best: "Rabi (Winter)",
      sowing: "October-November",
      harvest: "March-April"
    },
    growing_conditions: {
      temperature: "13-25°C",
      rainfall: "650-750mm",
      soil_type: "Sandy loam",
      pH: "6.0-7.0"
    },
    cultivation: {
      seed_rate: "8-10 kg/hectare",
      spacing: "15x10 cm",
      depth: "2-3 cm"
    },
    fertilizers: {
      nitrogen: "100 kg/ha",
      phosphorus: "50 kg/ha",
      potassium: "50 kg/ha"
    },
    irrigation: {
      frequency: "12-15 times",
      critical_stages: [
        "Bulb initiation",
        "Bulb development",
        "Bulb maturity"
      ]
    },
    pests: [
      "Thrips",
      "Onion fly",
      "Cut worms"
    ],
    diseases: [
      "Purple blotch",
      "Stemphylium blight",
      "Basal rot"
    ],
    yield: "25-30 tonnes/hectare",
    market_price: "₹1000-3000/quintal"
  },
  10: {
    name: "Mangoes",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80",
    description: "Mangoes are a popular fruit crop known as the 'King of Fruits'. They require long-term investment but provide good returns.",
    season: {
      best: "Summer",
      sowing: "June-July (planting)",
      harvest: "April-June"
    },
    growing_conditions: {
      temperature: "24-30°C",
      rainfall: "750-2500mm",
      soil_type: "Deep loamy",
      pH: "5.5-7.5"
    },
    cultivation: {
      seed_rate: "100 plants/hectare",
      spacing: "10x10 meters",
      depth: "1x1x1 meter pit"
    },
    fertilizers: {
      nitrogen: "1000g/tree",
      phosphorus: "500g/tree",
      potassium: "1000g/tree"
    },
    irrigation: {
      frequency: "Regular intervals",
      critical_stages: [
        "Flowering",
        "Fruit set",
        "Fruit development",
        "Fruit maturity"
      ]
    },
    pests: [
      "Fruit flies",
      "Mango hoppers",
      "Stem borer"
    ],
    diseases: [
      "Powdery mildew",
      "Anthracnose",
      "Bacterial canker"
    ],
    yield: "10-12 tonnes/hectare",
    market_price: "₹4000-8000/quintal"
  }
};

const FERTILIZER_RECOMMENDATIONS: Record<string, any> = {
  "nitrogen": {
    name: "Urea",
    image: "https://5.imimg.com/data5/DE/YF/MY-6312721/urea-pure-500x500.jpeg",
    description: "High nitrogen content fertilizer",
    price_range: "₹300-400/50kg"
  },
  "phosphorus": {
    name: "DAP",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo3aB661m0ce9vKdJ9JI5ZFvnXI-FCmDnbaw&s",
    description: "Balanced phosphorus fertilizer",
    price_range: "₹1200-1400/50kg"
  },
  "potassium": {
    name: "Muriate of Potash",
    image: "https://m.media-amazon.com/images/I/7149KKNtQaL.jpg",
    description: "Rich in potassium",
    price_range: "₹800-1000/50kg"
  },
  "organic": {
    name: "Vermicompost",
    image: "https://parachutekalpavriksha.org/cdn/shop/articles/Vermicomposting_using_coconut_leaves_in_coconut_farms.jpg?v=1711258531&width=2048",
    description: "Natural organic fertilizer",
    price_range: "₹400-500/50kg"
  },
  "micronutrients": {
    name: "Micronutrient Mix",
    image: "https://www.katyayaniorganics.com/wp-content/uploads/2022/06/MIX-MICRONUTRINT-SUPER-.png",
    description: "Essential trace elements",
    price_range: "₹200-300/kg"
  }
};

export default function CropDetailsScreen() {
  const { id } = useLocalSearchParams();
  const cropId = Number(id);
  const crop = CROP_DETAILS[cropId];

  if (!crop) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Crop not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Image */}
      <View className="relative h-72">
        <Image
          source={{ uri: crop.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          className="absolute top-12 left-6 bg-white p-2 rounded-full"
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#166534" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="p-6 -mt-10 bg-white rounded-t-3xl">
        <Text className="text-3xl font-bold text-gray-800 mb-2">{crop.name}</Text>
        <Text className="text-gray-600 mb-6">{crop.description}</Text>

        {/* Growing Season */}
        <View className="bg-green-50 p-4 rounded-2xl mb-6">
          <Text className="text-xl font-bold text-green-800 mb-4">Growing Season</Text>
          <View className="space-y-2">
            <Text className="text-green-700">Best Season: {crop.season.best}</Text>
            <Text className="text-green-700">Sowing Time: {crop.season.sowing}</Text>
            <Text className="text-green-700">Harvest Time: {crop.season.harvest}</Text>
          </View>
        </View>

        {/* Growing Conditions */}
        <Text className="text-xl font-bold text-gray-800 mb-4">Growing Conditions</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="bg-blue-50 p-4 rounded-2xl w-[48%] mb-4">
            <Thermometer size={24} color="#1e40af" className="mb-2" />
            <Text className="text-blue-900 font-semibold">Temperature</Text>
            <Text className="text-blue-700">{crop.growing_conditions.temperature}</Text>
          </View>
          <View className="bg-blue-50 p-4 rounded-2xl w-[48%] mb-4">
            <Droplets size={24} color="#1e40af" className="mb-2" />
            <Text className="text-blue-900 font-semibold">Rainfall</Text>
            <Text className="text-blue-700">{crop.growing_conditions.rainfall}</Text>
          </View>
          <View className="bg-blue-50 p-4 rounded-2xl w-[48%]">
            <Wind size={24} color="#1e40af" className="mb-2" />
            <Text className="text-blue-900 font-semibold">Soil Type</Text>
            <Text className="text-blue-700">{crop.growing_conditions.soil_type}</Text>
          </View>
          <View className="bg-blue-50 p-4 rounded-2xl w-[48%]">
            <Sun size={24} color="#1e40af" className="mb-2" />
            <Text className="text-blue-900 font-semibold">Soil pH</Text>
            <Text className="text-blue-700">{crop.growing_conditions.pH}</Text>
          </View>
        </View>

        {/* Cultivation Details */}
        <View className="bg-orange-50 p-4 rounded-2xl mb-6">
          <Text className="text-xl font-bold text-orange-800 mb-4">Cultivation Details</Text>
          <View className="space-y-2">
            <Text className="text-orange-700">Seed Rate: {crop.cultivation.seed_rate}</Text>
            <Text className="text-orange-700">Spacing: {crop.cultivation.spacing}</Text>
            <Text className="text-orange-700">Depth: {crop.cultivation.depth}</Text>
          </View>
        </View>

        {/* Fertilizers */}
        <View className="bg-purple-50 p-4 rounded-2xl mb-6">
          <Text className="text-xl font-bold text-purple-800 mb-4">Fertilizer Requirements</Text>
          <View className="space-y-2">
            <Text className="text-purple-700">Nitrogen: {crop.fertilizers.nitrogen}</Text>
            <Text className="text-purple-700">Phosphorus: {crop.fertilizers.phosphorus}</Text>
            <Text className="text-purple-700">Potassium: {crop.fertilizers.potassium}</Text>
          </View>
        </View>

        {/* Irrigation */}
        <View className="bg-cyan-50 p-4 rounded-2xl mb-6">
          <Text className="text-xl font-bold text-cyan-800 mb-4">Irrigation</Text>
          <Text className="text-cyan-700 mb-2">Frequency: {crop.irrigation.frequency}</Text>
          <Text className="text-cyan-800 font-semibold mb-2">Critical Stages:</Text>
          {crop.irrigation.critical_stages.map((stage: string, index: number) => (
            <Text key={index} className="text-cyan-700">• {stage}</Text>
          ))}
        </View>

        {/* Pests and Diseases */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-red-50 p-4 rounded-2xl w-[48%]">
            <Text className="text-xl font-bold text-red-800 mb-4">Common Pests</Text>
            {crop.pests.map((pest: string, index: number) => (
              <Text key={index} className="text-red-700 mb-1">• {pest}</Text>
            ))}
          </View>
          <View className="bg-red-50 p-4 rounded-2xl w-[48%]">
            <Text className="text-xl font-bold text-red-800 mb-4">Diseases</Text>
            {crop.diseases.map((disease: string, index: number) => (
              <Text key={index} className="text-red-700 mb-1">• {disease}</Text>
            ))}
          </View>
        </View>

        {/* Economics */}
        <View className="bg-emerald-50 p-4 rounded-2xl">
          <Text className="text-xl font-bold text-emerald-800 mb-4">Economics</Text>
          <Text className="text-emerald-700">Average Yield: {crop.yield}</Text>
          <Text className="text-emerald-700">Market Price: {crop.market_price}</Text>
        </View>
      </View>

      {/* Recommended Fertilizers */}
      <View className="p-6">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Recommended Fertilizers
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {Object.entries(FERTILIZER_RECOMMENDATIONS).map(([key, fertilizer]) => (
            <TouchableOpacity
              key={key}
              className="mr-4 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
              style={{ width: 200 }}
            >
              <Image
                source={{ uri: fertilizer.image }}
                className="w-full h-32"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="text-lg font-bold text-gray-800 mb-1">
                  {fertilizer.name}
                </Text>
                <Text className="text-sm text-gray-500 mb-2">
                  {fertilizer.description}
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="text-xs text-green-800 bg-green-100 px-2 py-1 rounded-full">
                    {fertilizer.price_range}
                  </Text>
                  <TouchableOpacity>
                    <Info size={18} color="#166534" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Fertilizer Application Guide */}
        <View className="bg-blue-50 p-4 rounded-2xl mb-6">
          <Text className="text-xl font-bold text-blue-800 mb-4">
            Application Guide
          </Text>
          <View className="space-y-2">
            <Text className="text-blue-700">
              • Base Application: {crop.fertilizers.nitrogen} Nitrogen
            </Text>
            <Text className="text-blue-700">
              • First Top Dressing: {crop.fertilizers.phosphorus} Phosphorus
            </Text>
            <Text className="text-blue-700">
              • Second Top Dressing: {crop.fertilizers.potassium} Potassium
            </Text>
            <Text className="text-blue-700 mt-2">
              💡 Tip: Always apply fertilizers when soil is moist and follow recommended doses
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
} 