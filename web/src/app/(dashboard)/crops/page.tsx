'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const crops = [
  {
    id: 1,
    name: "Wheat",
    image: "https://media.istockphoto.com/id/1673457545/photo/farmer-examining-ripe-ear-of-wheat-in-field-before-the-harvest.jpg?s=612x612&w=0&k=20&c=sG-Ro-n-3FmkmbXmWtwpxzYN1kJNMb5x0DbSmzITdVM=",
    description: "A staple grain crop.",
    growing_conditions: {
      soil_type: "Loamy or sandy soil",
      pH_level: "6.0 to 7.0",
      climate: "Temperate, with moderate rainfall"
    },
    nutritional_value: {
      carbohydrates: "71 g",
      protein: "13 g",
      fiber: "12 g"
    },
    common_pests: ["Aphids", "Wheat Weevil"],
    harvest_time: "June to August"
  },
  {
    id: 2,
    name: "Corn",
    image: "https://cdn.britannica.com/36/167236-050-BF90337E/Ears-corn.jpg",
    description: "Versatile crop for food and fuel.",
    growing_conditions: {
      soil_type: "Well-drained, fertile soil",
      pH_level: "5.8 to 7.0",
      climate: "Warm and humid"
    },
    nutritional_value: {
      carbohydrates: "73 g",
      protein: "9 g",
      fiber: "7 g"
    },
    common_pests: ["Corn Earworm", "Rootworms"],
    harvest_time: "September to October"
  },
  {
    id: 3,
    name: "Rice",
    image: "https://media.istockphoto.com/id/153737841/photo/rice.jpg?s=612x612&w=0&k=20&c=lfO7iLT0UsDDzra0uBOsN1rvr2d5OEtrG2uwbts33_c=",
    description: "Major food source for many cultures.",
    growing_conditions: {
      soil_type: "Clayey or loamy soil",
      pH_level: "5.5 to 7.0",
      climate: "Tropical and subtropical regions"
    },
    nutritional_value: {
      carbohydrates: "80 g",
      protein: "2.7 g",
      fiber: "<1 g"
    },
    common_pests: ["Rice Weevil", "Brown Planthopper"],
    harvest_time: "September to November"
  },
  {
    id: 4,
    name: "Soybeans",
    image: "https://www.thespruceeats.com/thmb/NwTe_ngAJwwFiXfoPlFQ1Zl5LuI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-soy-beans-717368577-5abc422fba6177003796e9bd.jpg",
    description: "Protein-rich legume crop.",
    growing_conditions: {
      soil_type: "Well-drained, fertile soil",
      pH_level: "6.5 to 7.5",
      climate: "Warm growing season"
    },
    nutritional_value: {
      carbohydrates: "9 g",
      protein: "36 g",
      fat: "20 g"
    },
    common_pests: ["Soybean Aphid", "Japanese Beetle"],
    harvest_time: "September to October"
  },
  {
    id: 5,
    name: "Potatoes",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI7t2YvyHFQgaI_hiHdCsZ1RNUvQnMVrpfRA&s",
    description: "Starchy tuber vegetable",
    growing_conditions: {
      soil_type: "Well-drained, loose soil",
      pH_level: "5.0 to 6.0",
      climate: "Cool climate with moderate rainfall"
    },
    nutritional_value: {
      carbohydrates: "17 g",
      protein: "2 g",
      fiber: "2 g"
    },
    common_pests: ["Colorado Potato Beetle", "Aphids"],
    harvest_time: "July to September"
  },
  {
    id: 6,
    name: "Tomatoes",
    image: "https://images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg",
    description: "Popular fruit often used as a vegetable.",
    growing_conditions: {
      soil_type: "Fertile, well-drained soil",
      pH_level: "6.0 to 6.8",
      climate: "Warm growing season with full sun"
    },
    nutritional_value: {
      carbohydrates: "4 g",
      protein: "1 g",
      fiber: "1 g"
    },
    common_pests: ["Tomato Hornworm", "Whiteflies"],
    harvest_time: "July to September"
  },
  {
    id: 7,
    name: "Lettuce",
    image: "https://media.istockphoto.com/id/182889875/photo/leaf-of-green-romaine-lettuce-with-white-background.jpg?s=612x612&w=0&k=20&c=kYijfxJUMs9hI4ml-SAhhcXspUYVwHkyVgnhZK3iojU=",
    description: "Leafy green vegetable.",
    growing_conditions: {
      soil_type: "Sandy loam or silt loam",
      pH_level: "6.0 to 7.0",
      climate: "Cool weather, prefers partial shade"
    },
    nutritional_value: {
      carbohydrates: "2 g",
      protein: "1 g",
      fiber: "1 g"
    },
    common_pests: ["Aphids", "Slugs"],
    harvest_time: "May to July"
  },
  {
    id: 8,
    name: "Carrots",
    image: "https://media.istockphoto.com/id/1015995028/photo/fresh-carrot-bunches-in-open-air-market.jpg?s=612x612&w=0&k=20&c=aawVlKTmhZintF7sSJoklMfhT7yLmPQdubTlcF63gl4=",
    description: "Root vegetable rich in beta-carotene.",
    growing_conditions: {
      soil_type: "Loose, well-drained soil",
      pH_level: "6.0 to 6.8",
      climate: "Cool season crop, prefers full sun"
    },
    nutritional_value: {
      carbohydrates: "10 g",
      protein: "1 g",
      fiber: "3 g"
    },
    common_pests: ["Carrot Fly", "Aphids"],
    harvest_time: "June to August"
  }
]




export default function Component() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCrops = crops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-emerald-800">Farmer's Crop Catalog</h1>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search crops..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-emerald-500" />
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredCrops.map((crop) => (
          <motion.div
          onClick={() => window.location.href = `/crops/${crop.id}`}
            key={crop.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            whileHover={{ scale: 1.03 }}
            layout
          >
            <img src={crop.image} alt={crop.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-emerald-800 mb-2">{crop.name}</h2>
              <p className="text-gray-600">{crop.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredCrops.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No crops found. Try a different search term.</p>
      )}
    </div>
  )
}