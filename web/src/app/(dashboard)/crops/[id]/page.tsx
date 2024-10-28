import React from 'react'
import Image from "next/image"
import { Leaf, Droplets, Thermometer, Apple, Bug } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function page({ params }: any) {

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
      const crop = crops.find((crop) => crop.id == params.id)
      if (!crop) {
          console.log("crop not found")
      }
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <Image
              src={crop?.image}
              alt={crop?.name}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
              <h1 className="text-4xl sm:text-5xl font-bold text-white p-6">{crop?.name}</h1>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <p className="text-lg text-gray-700">{crop?.description}</p>
              <p className="mt-2 text-sm text-gray-500">Harvest Time: {crop?.harvest_time}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    Growing Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-semibold">Soil Type:</dt>
                      <dd>{crop?.growing_conditions.soil_type}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">pH Level:</dt>
                      <dd>{crop?.growing_conditions.pH_level}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Climate:</dt>
                      <dd>{crop?.growing_conditions.climate}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5 text-red-500" />
                    Nutritional Value
                  </CardTitle>
                  <CardDescription>(per 100g)</CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-2">
                    <div>
                      <dt className="font-semibold">Carbohydrates:</dt>
                      <dd>{crop?.nutritional_value.carbohydrates}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Protein:</dt>
                      <dd>{crop?.nutritional_value.protein}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Fiber:</dt>
                      <dd>{crop?.nutritional_value.fiber}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-yellow-500" />
                  Common Pests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {crop?.common_pests.map((pest, index) => (
                    <Badge key={index} variant="secondary">
                      {pest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page