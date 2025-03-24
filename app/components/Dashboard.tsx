import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react-native";

interface DashboardProps {
  totalSpent?: number;
  budget?: number;
  categories?: Array<{
    name: string;
    amount: number;
    percentage: number;
    color: string;
  }>;
  monthlyTrend?: Array<{
    month: string;
    amount: number;
  }>;
}

const Dashboard = ({
  totalSpent = 1250.75,
  budget = 2000,
  categories = [
    { name: "Food", amount: 450.25, percentage: 36, color: "#FF6384" },
    { name: "Transport", amount: 320.5, percentage: 25.6, color: "#36A2EB" },
    { name: "Shopping", amount: 280, percentage: 22.4, color: "#FFCE56" },
    { name: "Bills", amount: 200, percentage: 16, color: "#4BC0C0" },
  ],
  monthlyTrend = [
    { month: "Jan", amount: 1100 },
    { month: "Feb", amount: 1300 },
    { month: "Mar", amount: 1200 },
    { month: "Apr", amount: 1250.75 },
  ],
}: DashboardProps) => {
  const percentOfBudget = Math.round((totalSpent / budget) * 100);
  const isOverBudget = totalSpent > budget;

  // Calculate if spending is up or down from previous month
  const currentMonth = monthlyTrend[monthlyTrend.length - 1].amount;
  const previousMonth = monthlyTrend[monthlyTrend.length - 2].amount;
  const spendingChange = ((currentMonth - previousMonth) / previousMonth) * 100;
  const isSpendingUp = spendingChange > 0;

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-bold text-gray-800">
          Spending Overview
        </Text>
        <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
          <Text className="text-sm text-gray-600">April 2023</Text>
        </TouchableOpacity>
      </View>

      {/* Budget Summary */}
      <View className="bg-gray-50 p-4 rounded-lg mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <View className="bg-blue-100 w-8 h-8 rounded-full items-center justify-center mr-2">
              <DollarSign size={18} color="#3b82f6" />
            </View>
            <Text className="text-gray-700 font-medium">Total Spent</Text>
          </View>
          <Text className="text-xl font-bold text-gray-800">
            ${totalSpent.toFixed(2)}
          </Text>
        </View>

        {/* Budget Progress Bar */}
        <View className="mt-2 mb-1">
          <View className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
            <View
              className={`h-full rounded-full ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
              style={{ width: `${Math.min(percentOfBudget, 100)}%` }}
            />
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-sm text-gray-500">
            ${totalSpent.toFixed(2)} of ${budget.toFixed(2)}
          </Text>
          <View className="flex-row items-center">
            {isSpendingUp ? (
              <ArrowUpRight size={14} color="#ef4444" />
            ) : (
              <ArrowDownRight size={14} color="#10b981" />
            )}
            <Text
              className={`text-sm ml-1 ${isSpendingUp ? "text-red-500" : "text-green-500"}`}
            >
              {Math.abs(spendingChange).toFixed(1)}% from last month
            </Text>
          </View>
        </View>
      </View>

      {/* Category Breakdown */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View className="bg-purple-100 w-8 h-8 rounded-full items-center justify-center mr-2">
              <PieChart size={18} color="#8b5cf6" />
            </View>
            <Text className="text-gray-700 font-medium">
              Category Breakdown
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500 text-sm">See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="pb-2"
        >
          {categories.map((category, index) => (
            <View
              key={index}
              className="mr-3 bg-gray-50 p-3 rounded-lg"
              style={{ minWidth: 120 }}
            >
              <View
                className="w-3 h-3 rounded-full mb-2"
                style={{ backgroundColor: category.color }}
              />
              <Text className="text-gray-800 font-medium">{category.name}</Text>
              <Text className="text-gray-900 font-bold mt-1">
                ${category.amount.toFixed(2)}
              </Text>
              <Text className="text-gray-500 text-xs mt-1">
                {category.percentage}% of total
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Monthly Trends */}
      <View>
        <View className="flex-row justify-between items-center mb-3">
          <View className="flex-row items-center">
            <View className="bg-green-100 w-8 h-8 rounded-full items-center justify-center mr-2">
              <TrendingUp size={18} color="#10b981" />
            </View>
            <Text className="text-gray-700 font-medium">Monthly Trends</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-blue-500 text-sm">Details</Text>
          </TouchableOpacity>
        </View>

        {/* Simple Bar Chart Visualization */}
        <View className="flex-row justify-between items-end h-24 bg-gray-50 p-3 rounded-lg">
          {monthlyTrend.map((item, index) => {
            const maxAmount = Math.max(...monthlyTrend.map((m) => m.amount));
            const barHeight = (item.amount / maxAmount) * 100;

            return (
              <View key={index} className="items-center">
                <View
                  className={`w-8 rounded-t-md ${index === monthlyTrend.length - 1 ? "bg-blue-500" : "bg-blue-300"}`}
                  style={{ height: `${barHeight}%` }}
                />
                <Text className="text-xs text-gray-600 mt-1">{item.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Dashboard;
