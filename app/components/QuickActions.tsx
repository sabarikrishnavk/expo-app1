import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Camera, Receipt, Plus, RefreshCw, List } from "lucide-react-native";

interface QuickActionsProps {
  onScanReceipt?: () => void;
  onAddManually?: () => void;
  onSyncBank?: () => void;
  onViewAll?: () => void;
}

const QuickActions = ({
  onScanReceipt = () => console.log("Scan receipt"),
  onAddManually = () => console.log("Add manually"),
  onSyncBank = () => console.log("Sync bank"),
  onViewAll = () => console.log("View all"),
}: QuickActionsProps) => {
  return (
    <View className="w-full bg-white p-4 rounded-lg shadow-sm mb-4">
      <Text className="text-lg font-semibold mb-3 text-gray-800">
        Quick Actions
      </Text>
      <View className="flex-row justify-between">
        <ActionButton
          icon={<Camera size={24} color="#4F46E5" />}
          label="Scan Receipt"
          onPress={onScanReceipt}
        />
        <ActionButton
          icon={<Plus size={24} color="#4F46E5" />}
          label="Add Manually"
          onPress={onAddManually}
        />
        <ActionButton
          icon={<RefreshCw size={24} color="#4F46E5" />}
          label="Sync Bank"
          onPress={onSyncBank}
        />
        <ActionButton
          icon={<List size={24} color="#4F46E5" />}
          label="View All"
          onPress={onViewAll}
        />
      </View>
    </View>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

const ActionButton = ({
  icon,
  label,
  onPress = () => {},
}: ActionButtonProps) => {
  return (
    <TouchableOpacity
      className="items-center justify-center p-2"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="bg-indigo-50 w-12 h-12 rounded-full items-center justify-center mb-1">
        {icon}
      </View>
      <Text className="text-xs text-gray-700 text-center">{label}</Text>
    </TouchableOpacity>
  );
};

export default QuickActions;
