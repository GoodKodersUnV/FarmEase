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
    <div className="min-h-screen text-black">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Smart Farming Solutions
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Advanced crop monitoring and management platform for modern farmers
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Download App
          </button>
          <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50">
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Camera className="w-8 h-8 text-green-600" />}
            title="Disease Detection"
            description="Instantly identify crop diseases using AI-powered image analysis"
          />
          <FeatureCard
            icon={<Droplet className="w-8 h-8 text-green-600" />}
            title="weather Monitoring"
            description="Track soil moisture, temperature, and climate conditions in real-time"
          />
          <FeatureCard
            icon={<AlertTriangle className="w-8 h-8 text-green-600" />}
            title="Smart Alerts"
            description="Receive timely notifications about weather and crop conditions"
          />
          <FeatureCard
            icon={<BookOpen className="w-8 h-8 text-green-600" />}
            title="Crop Guide"
            description="Access comprehensive guides and fertilizer recommendations"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-green-600" />}
            title="Farmer Community"
            description="Connect with other farmers and share experiences"
          />
          <FeatureCard
            icon={<ShoppingBag className="w-8 h-8 text-green-600" />}
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

      {/* Demo Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Experience Smart Farming</h2>
          <p className="text-gray-600 mb-6">
            Transform your farming practices with our comprehensive suite of
            tools and technologies.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Try Demo
          </button>
        </div>
        {/* <div className="bg-gray-100 rounded-xl p-4">
          <img 
            src="/api/placeholder/600/400" 
            alt="Farm monitoring dashboard" 
            className="rounded-lg w-full"
          />
        </div> */}
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 border rounded-xl hover:shadow-lg  shadow-lg hover:scale-105 transition-all duration-500">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div>
    <div className="text-3xl font-bold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600">{label}</div>
  </div>
);

export default HomePage;
