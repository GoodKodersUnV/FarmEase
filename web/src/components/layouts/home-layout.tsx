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
    {
      name: "Home",
      icon: <RxDashboard />,
      path: "/",
    },
    {
      name: "Crops",
      icon: <RxDashboard />,
      path: "/crops",
    },
    {
      name: "Community",
      icon: <RxDashboard />,
      path: "/community",
    },
    {
      name: "Market",
      icon: <RxDashboard />,
      path: "/market",
    },
  ];
  const pathname = usePathname();
  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <span className="text-xl font-bold">FarmSense</span>
        </div>
        <div className="hidden md:flex space-x-6">
          {
            items.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-gray-600 hover:text-green-600 ${pathname === item.path ? "text-green-600 font-bold" : ""}`}
              >{item.name}</Link>
            ))
          }
        </div>
        <div className='flex gap-4 items-center'>
        {!currentUser && <Link href="/signin" className="text-gray-600 hover:text-green-600">Login</Link>}
        <Link href="/predict-disease" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
          <FaCamera />
        </Link>
        </div> 
      </nav>
      <div className="flex justify-center">
        {/* <Sidebar items={items} menu={menu} setMenu={setMenu} /> */}
        <Suspense fallback={<Loading />}>
          <div
            className={`w-full`}
          >
            {children}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
