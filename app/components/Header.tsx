import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { User, Menu } from "lucide-react-native";

interface HeaderProps {
  title?: string;
  onProfilePress?: () => void;
  onMenuPress?: () => void;
}

const Header = ({
  title = "Expense Tracker",
  onProfilePress,
  onMenuPress,
}: HeaderProps) => {
  const router = useRouter();

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      // Default navigation to settings
      router.push("/settings");
    }
  };

  const handleMenuPress = () => {
    if (onMenuPress) {
      onMenuPress();
    }
    // Default menu action could be added here
  };

  return (
    <View className="w-full h-16 px-4 flex-row items-center justify-between bg-white border-b border-gray-200">
      <TouchableOpacity onPress={handleMenuPress} className="p-2">
        <Menu size={24} color="#333" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-center text-blue-600">
        {title}
      </Text>

      <TouchableOpacity onPress={handleProfilePress} className="p-2">
        <User size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
