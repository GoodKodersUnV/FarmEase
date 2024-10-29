"use client";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import { RxDashboard } from "react-icons/rx";
import { FaCamera } from "react-icons/fa6";
import { Suspense, useState } from "react";
import Loading from "@/app/(dashboard)/loading";
import { User } from "@prisma/client";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  const [menu, setMenu] = useState<boolean>(true);
  const items = [
    { name: "Home", icon: <RxDashboard />, path: "/" },
    { name: "Crops", icon: <RxDashboard />, path: "/crops" },
    { name: "Community", icon: <RxDashboard />, path: "/community" },
    { name: "Market", icon: <RxDashboard />, path: "/market" },
    { name: "Chat-Bot", icon: <RxDashboard />, path: "/chat-bot" }
  ];
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen bg-gray-100 transition-all">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-3 px-4 border-b shadow-md bg-white sticky top-0 z-50">
        <div className="flex items-center space-x-2 animate-fadeIn">
          <Leaf className="w-8 h-8 text-green-600 transition-transform hover:scale-110" />
          <span className="text-xl font-bold text-gray-800">FarmSense</span>
        </div>
        {/* <div className="hidden md:flex space-x-6 animate-slideIn">
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-gray-600 transition duration-300 ease-in-out hover:text-green-600 ${
                pathname === item.path ? "text-green-600 font-bold scale-105" : ""
              }`}
            >
              <span className="flex items-center space-x-1">
                {item.icon}
                <span>{item.name}</span>
              </span>
            </Link>
          ))}
        </div> */}
        <div className="flex gap-4 items-center">
          {!currentUser && (
            <Link href="/signin" className="text-gray-600 hover:text-green-600 transition-all">
              Login
            </Link>
          )}
          <Link
            href="/predict-disease"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center"
          >
            <FaCamera />
          </Link>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white shadow-lg w-60 px-4 transition-transform fixed h-full z-50 ${
            menu ? "translate-x-0" : "-translate-x-64"
          } ease-in-out duration-300 transform`}
        >
          {/* <button
            onClick={() => setMenu(!menu)}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            {menu ? "Close Sidebar" : "Open Sidebar"}
          </button> */}
          <ul className="mt-4 space-y-4 animate-slideIn">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block p-2 rounded-md transition-all ${
                    pathname === item.path
                      ? "bg-green-100 text-green-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Suspense fallback={<Loading />}>
          <div className="flex-grow transition-all ps-60">
            <div className="bg-white shadow-md">
              {children}
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
