import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react-native";
import TransactionItem from "./TransactionItem";

interface RecentTransactionsProps {
  transactions?: Array<{
    id: string;
    merchant: string;
    date: string;
    amount: number;
    category: string;
    hasReceipt: boolean;
    isMatched: boolean;
  }>;
  onTransactionPress?: (id: string) => void;
  onFilterPress?: () => void;
}

const RecentTransactions = ({
  transactions = [
    {
      id: "1",
      merchant: "Grocery Store",
      date: "2023-06-15",
      amount: -54.99,
      category: "Food & Dining",
      hasReceipt: true,
      isMatched: true,
    },
    {
      id: "2",
      merchant: "Gas Station",
      date: "2023-06-14",
      amount: -35.5,
      category: "Transportation",
      hasReceipt: false,
      isMatched: true,
    },
    {
      id: "3",
      merchant: "Coffee Shop",
      date: "2023-06-14",
      amount: -4.75,
      category: "Food & Dining",
      hasReceipt: true,
      isMatched: false,
    },
    {
      id: "4",
      merchant: "Movie Theater",
      date: "2023-06-12",
      amount: -24.0,
      category: "Entertainment",
      hasReceipt: true,
      isMatched: true,
    },
    {
      id: "5",
      merchant: "Online Store",
      date: "2023-06-10",
      amount: -89.99,
      category: "Shopping",
      hasReceipt: false,
      isMatched: true,
    },
    {
      id: "6",
      merchant: "Paycheck",
      date: "2023-06-01",
      amount: 1250.0,
      category: "Income",
      hasReceipt: false,
      isMatched: true,
    },
  ],
  onTransactionPress = () => {},
  onFilterPress = () => {},
}: RecentTransactionsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter transactions based on search query and active filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.merchant
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Receipts")
      return matchesSearch && transaction.hasReceipt;
    if (activeFilter === "Matched")
      return matchesSearch && transaction.isMatched;
    if (activeFilter === "Unmatched")
      return matchesSearch && !transaction.isMatched;

    return matchesSearch;
  });

  const filterOptions = ["All", "Receipts", "Matched", "Unmatched"];

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <Text className="text-lg font-semibold">Recent Transactions</Text>
        <TouchableOpacity
          className="flex-row items-center"
          onPress={onFilterPress}
        >
          <Text className="text-blue-500 mr-1">This Month</Text>
          <Calendar size={16} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-2">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search size={18} color="#6b7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search transactions"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-2 py-2 border-b border-gray-200"
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter}
            className={`px-4 py-2 mx-1 rounded-full ${activeFilter === filter ? "bg-blue-500" : "bg-gray-100"}`}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              className={`${activeFilter === filter ? "text-white" : "text-gray-700"} font-medium`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Transaction List */}
      {filteredTransactions.length > 0 ? (
        <ScrollView className="flex-1">
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              merchant={transaction.merchant}
              date={transaction.date}
              amount={transaction.amount}
              category={transaction.category}
              hasReceipt={transaction.hasReceipt}
              isMatched={transaction.isMatched}
              onPress={() => onTransactionPress(transaction.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-gray-500 text-center mb-2">
            No transactions found
          </Text>
          <Text className="text-gray-400 text-center">
            Try adjusting your search or filters
          </Text>
        </View>
      )}
    </View>
  );
};

export default RecentTransactions;
