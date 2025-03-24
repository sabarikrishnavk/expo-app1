import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import QuickActions from "./components/QuickActions";
import RecentTransactions from "./components/RecentTransactions";
import BottomNavigation from "./components/BottomNavigation";
import { useAuth } from "./context/AuthContext";
import { getUserTransactions, getSpendingSummary } from "./firebase/firestore";
import { Transaction } from "./types/expense";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<
    Array<{
      name: string;
      amount: number;
      percentage: number;
      color: string;
    }>
  >([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [monthlyTrend, setMonthlyTrend] = useState<
    Array<{
      month: string;
      amount: number;
    }>
  >([]);

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first and last day of current month
  const firstDay = new Date(currentYear, currentMonth, 1)
    .toISOString()
    .split("T")[0];
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  // Load user transactions
  useEffect(() => {
    if (user) {
      const fetchTransactions = async () => {
        try {
          setLoading(true);
          const userTransactions = await getUserTransactions(user.uid);
          setTransactions(userTransactions);

          // Calculate spending summary
          const summary = await getSpendingSummary(user.uid, firstDay, lastDay);

          // Calculate total spent (excluding income)
          let total = 0;
          Object.entries(summary).forEach(([category, amount]) => {
            if (category !== "Income" && category !== "Salary") {
              total += amount;
            }
          });
          setTotalSpent(total);

          // Create category data for dashboard
          const colors = {
            Grocery: "#FF6384",
            Entertainment: "#FFCE56",
            Transportation: "#36A2EB",
            "Food & Dining": "#4BC0C0",
            Shopping: "#9966FF",
            Bills: "#FF9F40",
            Other: "#C9CBCF",
          };

          const categories = Object.entries(summary)
            .filter(
              ([category]) =>
                category !== "Income" &&
                category !== "Salary" &&
                summary[category as any] > 0,
            )
            .map(([category, amount]) => ({
              name: category,
              amount,
              percentage: Math.round((amount / total) * 100),
              color: colors[category as keyof typeof colors] || "#C9CBCF",
            }));

          setCategoryData(categories);

          // Create monthly trend data (last 4 months)
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const trend = [];

          // Simple mock data for now - in a real app, you'd query for each month
          for (let i = 3; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            trend.push({
              month: months[monthIndex],
              amount: i === 0 ? total : total * (0.8 + Math.random() * 0.4), // Random variation for past months
            });
          }

          setMonthlyTrend(trend);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [user]);

  // Handlers for quick actions
  const handleScanReceipt = () => {
    console.log("Scan receipt pressed");
    // Navigation would go here in a real implementation
  };

  const handleAddManually = () => {
    console.log("Add manually pressed");
    // Navigation would go here in a real implementation
  };

  const handleSyncBank = () => {
    console.log("Sync bank pressed");
    // Bank sync logic would go here in a real implementation
  };

  const handleViewAll = () => {
    console.log("View all pressed");
    // Navigation would go here in a real implementation
  };

  // Handler for transaction selection
  const handleTransactionPress = (id: string) => {
    console.log(`Transaction ${id} pressed`);
    // Navigation to transaction details would go here
  };

  // Handle sign out
  const handleSignOut = () => {
    // Sign out logic would go here
  };

  if (authLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <Header
          title="Expense Tracker"
          userName={user?.displayName || "User"}
          onProfilePress={handleSignOut}
        />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }} // Extra padding for bottom navigation
        >
          {loading ? (
            <View className="p-4 items-center justify-center h-40">
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : (
            <View className="p-4">
              <Dashboard
                totalSpent={totalSpent}
                budget={user?.settings?.monthlyBudget || 2000}
                categories={categoryData}
                monthlyTrend={monthlyTrend}
              />
            </View>
          )}

          <View className="px-4">
            <QuickActions
              onScanReceipt={handleScanReceipt}
              onAddManually={handleAddManually}
              onSyncBank={handleSyncBank}
              onViewAll={handleViewAll}
            />
          </View>

          <View className="flex-1 mx-4 bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <RecentTransactions
              transactions={transactions}
              onTransactionPress={handleTransactionPress}
            />
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0">
          <BottomNavigation activeTab="home" />
        </View>
      </SafeAreaView>
    </View>
  );
}
