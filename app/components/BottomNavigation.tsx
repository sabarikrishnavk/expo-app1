import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Home, PieChart, Plus, Receipt, Settings } from "lucide-react-native";

interface BottomNavigationProps {
  activeTab?: string;
}

const BottomNavigation = ({ activeTab = "home" }: BottomNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = activeTab || pathname.split("/")[1] || "home";

  const tabs = [
    {
      name: "home",
      icon: Home,
      label: "Home",
      route: "/",
    },
    {
      name: "analytics",
      icon: PieChart,
      label: "Analytics",
      route: "/analytics",
    },
    {
      name: "add",
      icon: Plus,
      label: "Add",
      route: "/add-expense",
    },
    {
      name: "receipts",
      icon: Receipt,
      label: "Receipts",
      route: "/receipts",
    },
    {
      name: "settings",
      icon: Settings,
      label: "Settings",
      route: "/settings",
    },
  ];

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <View className="flex-row items-center justify-between bg-white border-t border-gray-200 h-16 px-2 w-full">
      {tabs.map((tab) => {
        const isActive = currentPath === tab.name;
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.name}
            className={`flex-1 items-center justify-center py-1 ${tab.name === "add" ? "relative -top-2" : ""}`}
            onPress={() => handleNavigation(tab.route)}
          >
            {tab.name === "add" ? (
              <View className="bg-blue-500 p-3 rounded-full">
                <Icon size={24} color="white" />
              </View>
            ) : (
              <>
                <Icon size={22} color={isActive ? "#3b82f6" : "#64748b"} />
                <Text
                  className={`text-xs mt-1 ${isActive ? "text-blue-500 font-medium" : "text-gray-500"}`}
                >
                  {tab.label}
                </Text>
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
