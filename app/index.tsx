import React from "react";
import { View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import QuickActions from "./components/QuickActions";
import RecentTransactions from "./components/RecentTransactions";
import BottomNavigation from "./components/BottomNavigation";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // Mock handlers for quick actions
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

  // Mock handler for transaction selection
  const handleTransactionPress = (id: string) => {
    console.log(`Transaction ${id} pressed`);
    // Navigation to transaction details would go here
  };

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1">
        <Header title="Expense Tracker" />

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }} // Extra padding for bottom navigation
        >
          <View className="p-4">
            <Dashboard />
          </View>

          <View className="px-4">
            <QuickActions
              onScanReceipt={handleScanReceipt}
              onAddManually={handleAddManually}
              onSyncBank={handleSyncBank}
              onViewAll={handleViewAll}
            />
          </View>

          <View className="flex-1 mx-4 bg-white rounded-lg shadow-sm overflow-hidden mb-4">
            <RecentTransactions onTransactionPress={handleTransactionPress} />
          </View>
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0">
          <BottomNavigation activeTab="home" />
        </View>
      </SafeAreaView>
    </View>
  );
}
