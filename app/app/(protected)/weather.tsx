import { Text } from "@/components/ui/text";
import { View, ActivityIndicator, Image, ScrollView, Dimensions } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Button } from "@/components/ui/button";

const OPENWEATHER_API_KEY = "71e1abf78f10a0167b2f29e3d9f618f0";
const API_URL = "https://api.openweathermap.org/data/2.5";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
  timezone: number;
}

export default function Weather() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid" | "terrain">("satellite");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  const fetchWeather = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `${API_URL}/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to fetch weather data: ${err.message}`);
      } else {
        setError("Failed to fetch weather data");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-green-50">
        <ActivityIndicator size="large" color="#22C55E" />
        <Text className="mt-4 text-lg font-medium text-green-700">Loading weather information...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-red-50">
        <Text className="text-xl font-semibold text-red-600 text-center">{error}</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-xl font-medium text-gray-600">Weather information not available</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-green-50">
      <View className="p-4">
        <Text className="text-3xl font-bold mb-4 text-center text-green-900">
          {weather.name}, {weather.sys.country}
        </Text>

        {/* Main Weather Card */}
        <View className="bg-white rounded-xl p-6 mb-4 shadow">
          <View className="flex-row items-center justify-center">
            {weather.weather[0].icon && (
              <Image
                source={{
                  uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
                }}
                className="w-20 h-20"
              />
            )}
            <Text className="text-5xl font-bold text-green-900 ml-2">
              {Math.round(weather.main.temp)}°C
            </Text>
          </View>
          <Text className="text-xl text-center text-green-800 mt-2">
            {weather.weather[0].description}
          </Text>
        </View>

        {/* Map Section */}
        {location && (
          <View className="mb-4 rounded-xl overflow-hidden shadow bg-white" style={{ height: 400 }}>
            <View className="flex-row justify-around p-2 bg-green-50">
              <Button
                variant={mapType === "standard" ? "default" : "outline"}
                onPress={() => setMapType("standard")}
                className="flex-1 mx-1"
              >
                <Text>Standard</Text>
              </Button>
              <Button
                variant={mapType === "satellite" ? "default" : "outline"}
                onPress={() => setMapType("satellite")}
                className="flex-1 mx-1"
              >
                <Text>Satellite</Text>
              </Button>
              <Button
                variant={mapType === "hybrid" ? "default" : "outline"}
                onPress={() => setMapType("hybrid")}
                className="flex-1 mx-1"
              >
                <Text>Hybrid</Text>
              </Button>
            </View>
            <MapView
              style={{ flex: 1, minHeight: 300, borderRadius: 10, paddingHorizontal: 10 }}
              mapType={mapType}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
              showsUserLocation={true}
              showsMyLocationButton={true}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="Your Location"
                pinColor="#22C55E"
              />
            </MapView>
          </View>
        )}

        {/* Weather Details Grid */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow">
          <Text className="text-xl font-bold mb-4 text-green-900">Detailed Weather Information</Text>

          <View className="space-y-4">
            <View className="flex-row justify-between items-center p-3 bg-green-50 rounded-lg">
              <Text className="text-green-800 text-lg">Temperature Range</Text>
              <Text className="text-xl font-bold text-green-900">
                {Math.round(weather.main.temp_min)}°C - {Math.round(weather.main.temp_max)}°C
              </Text>
            </View>

            <View className="flex-row justify-between items-center p-3 bg-green-50 rounded-lg">
              <Text className="text-green-800 text-lg">Humidity</Text>
              <Text className="text-xl font-bold text-green-900">{weather.main.humidity}%</Text>
            </View>

            <View className="flex-row justify-between items-center p-3 bg-green-50 rounded-lg">
              <Text className="text-green-800 text-lg">Wind Speed</Text>
              <Text className="text-xl font-bold text-green-900">{weather.wind.speed} m/s</Text>
            </View>

            <View className="flex-row justify-between items-center p-3 bg-green-50 rounded-lg">
              <Text className="text-green-800 text-lg">Visibility</Text>
              <Text className="text-xl font-bold text-green-900">{(weather.visibility / 1000).toFixed(1)} km</Text>
            </View>
          </View>
        </View>

        {/* Sunrise/Sunset Card */}
        <View className="bg-white rounded-xl p-4 shadow">
          <Text className="text-xl font-bold mb-4 text-green-900">Sunrise and Sunset</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-green-800 text-lg">Sunrise</Text>
              <Text className="text-lg font-bold text-green-900">
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-green-800 text-lg">Sunset</Text>
              <Text className="text-lg font-bold text-green-900">
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
