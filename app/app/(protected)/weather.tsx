import { Text } from "@/components/ui/text";
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
}

export default function Weather() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather();
    }
  }, [location]);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (err) {
      setError("Failed to get location");
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
      );

      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }

      const data = await response.json();
      
      const transformedData: WeatherData = {
        main: {
          temp: data.current_weather.temperature,
          humidity: data.hourly.relativehumidity_2m[0],
          feels_like: data.current_weather.temperature, // Open-Meteo doesn't provide feels_like
        },
        weather: [{
          main: data.current_weather.weathercode.toString(), // Weather code from Open-Meteo
          description: getWeatherDescription(data.current_weather.weathercode),
        }],
        wind: {
          speed: data.current_weather.windspeed,
        }
      };

      setWeather(transformedData);
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

  // Helper function to convert Open-Meteo weather codes to descriptions
  const getWeatherDescription = (code: number): string => {
    const weatherCodes: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow fall",
      73: "Moderate snow fall",
      75: "Heavy snow fall",
      95: "Thunderstorm",
    };
    return weatherCodes[code] || "Unknown";
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-2">Loading weather data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  if (!weather) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No weather data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold mb-6 text-center">
        Current Weather
      </Text>

      <View className="bg-blue-50 rounded-lg p-6 mb-4">
        <Text className="text-4xl font-bold text-center mb-2">
          {Math.round(weather.main.temp)}°C
        </Text>
        <Text className="text-lg text-center text-gray-600 mb-4">
          {weather.weather[0].main}
        </Text>
        <Text className="text-center text-gray-500">
          {weather.weather[0].description}
        </Text>
      </View>

      <View className="bg-gray-50 rounded-lg p-4">
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-600">Feels Like</Text>
          <Text className="font-semibold">
            {Math.round(weather.main.feels_like)}°C
          </Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-600">Humidity</Text>
          <Text className="font-semibold">{weather.main.humidity}%</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Wind Speed</Text>
          <Text className="font-semibold">{weather.wind.speed} m/s</Text>
        </View>
      </View>

      {location && (
        <View className="mt-4">
          <Text className="text-center text-gray-500">
            📍 Location: {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
          </Text>
        </View>
      )}
    </View>
  );
}
