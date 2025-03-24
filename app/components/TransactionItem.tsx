import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Receipt, CreditCard, ChevronRight } from "lucide-react-native";

interface TransactionItemProps {
  merchant: string;
  date: string;
  amount: number;
  category: string;
  hasReceipt: boolean;
  isMatched: boolean;
  onPress?: () => void;
}

const TransactionItem = ({
  merchant = "Grocery Store",
  date = "2023-06-15",
  amount = 24.99,
  category = "Food & Dining",
  hasReceipt = false,
  isMatched = false,
  onPress = () => {},
}: TransactionItemProps) => {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Format amount to show as currency
  const formattedAmount = `$${Math.abs(amount).toFixed(2)}`;

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between p-3 border-b border-gray-200 bg-white"
      onPress={onPress}
    >
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
          {category === "Food & Dining" ? (
            <Text className="text-lg">🍔</Text>
          ) : category === "Shopping" ? (
            <Text className="text-lg">🛍️</Text>
          ) : category === "Transportation" ? (
            <Text className="text-lg">🚗</Text>
          ) : category === "Entertainment" ? (
            <Text className="text-lg">🎬</Text>
          ) : (
            <Text className="text-lg">💼</Text>
          )}
        </View>

        <View className="flex-1">
          <Text className="font-semibold text-base">{merchant}</Text>
          <Text className="text-gray-500 text-sm">
            {formattedDate} • {category}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center">
        <Text
          className={`font-semibold text-base mr-2 ${amount < 0 ? "text-red-500" : "text-green-500"}`}
        >
          {amount < 0 ? "-" : "+"}
          {formattedAmount}
        </Text>

        <View className="flex-row">
          {hasReceipt && (
            <View className="mr-2">
              <Receipt size={16} color={isMatched ? "#10b981" : "#6b7280"} />
            </View>
          )}

          {isMatched && (
            <View className="mr-2">
              <CreditCard size={16} color="#10b981" />
            </View>
          )}

          <ChevronRight size={16} color="#9ca3af" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;
