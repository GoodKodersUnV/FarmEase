import React from "react";
import {
  Leaf,
  Camera,
  Droplet,
  Users,
  ShoppingBag,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen text-gray-900 bg-white">
      {/* Hero Section */}
      <div className="text-center py-10 pt-16 px-6 bg-gradient-to-b from-green-50 to-white">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-8 transition-transform duration-500 hover:scale-105">
          Smart Farming Solutions
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Advanced crop monitoring and management platform for the modern farmer
        </p>
        <div className="flex justify-center gap-6">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105">
            Download App
          </button>
          <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-all duration-300 shadow-lg transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Camera className="w-10 h-10 text-green-600" />}
            title="Disease Detection"
            description="Instantly identify crop diseases using AI-powered image analysis"
          />
          <FeatureCard
            icon={<Droplet className="w-10 h-10 text-green-600" />}
            title="Weather Monitoring"
            description="Track soil moisture, temperature, and climate conditions in real-time"
          />
          <FeatureCard
            icon={<AlertTriangle className="w-10 h-10 text-green-600" />}
            title="Smart Alerts"
            description="Receive timely notifications about weather and crop conditions"
          />
          <FeatureCard
            icon={<BookOpen className="w-10 h-10 text-green-600" />}
            title="Crop Guide"
            description="Access comprehensive guides and fertilizer recommendations"
          />
          <FeatureCard
            icon={<Users className="w-10 h-10 text-green-600" />}
            title="Farmer Community"
            description="Connect with other farmers and share experiences"
          />
          <FeatureCard
            icon={<ShoppingBag className="w-10 h-10 text-green-600" />}
            title="Marketplace"
            description="Buy and sell crops directly through our platform"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="2.5s" label="Average Detection Time" />
            <StatCard number="100+" label="Crop Varieties" />
            <StatCard number="1000+" label="Active Farmers" />
            <StatCard number="95%" label="Accuracy Rate" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="p-6 border border-gray-100 rounded-xl shadow-md transition-all duration-300 transform hover:shadow-2xl hover:scale-105 hover:bg-green-50">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }: any) => (
  <div className="transition-transform transform hover:scale-105 duration-300">
    <div className="text-4xl font-bold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default HomePage;
