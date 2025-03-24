import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Transaction, AccountType } from "../types/expense";

// Add a new transaction
export const addTransaction = async (
  transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">,
): Promise<Transaction> => {
  try {
    const transactionData = {
      ...transaction,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const docRef = await addDoc(
      collection(db, "transactions"),
      transactionData,
    );
    return { ...transactionData, id: docRef.id } as Transaction;
  } catch (error) {
    console.error("Error adding transaction:", error);
    throw error;
  }
};

// Get all transactions for a user
export const getUserTransactions = async (
  userId: string,
): Promise<Transaction[]> => {
  try {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
      orderBy("date", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];

    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });

    return transactions;
  } catch (error) {
    console.error("Error getting transactions:", error);
    throw error;
  }
};

// Get transactions by category
export const getTransactionsByCategory = async (
  userId: string,
  category: AccountType,
): Promise<Transaction[]> => {
  try {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
      where("category", "==", category),
      orderBy("date", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];

    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });

    return transactions;
  } catch (error) {
    console.error("Error getting transactions by category:", error);
    throw error;
  }
};

// Get transactions by date range
export const getTransactionsByDateRange = async (
  userId: string,
  startDate: string,
  endDate: string,
): Promise<Transaction[]> => {
  try {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", userId),
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      orderBy("date", "desc"),
    );

    const querySnapshot = await getDocs(q);
    const transactions: Transaction[] = [];

    querySnapshot.forEach((doc) => {
      transactions.push({ id: doc.id, ...doc.data() } as Transaction);
    });

    return transactions;
  } catch (error) {
    console.error("Error getting transactions by date range:", error);
    throw error;
  }
};

// Update a transaction
export const updateTransaction = async (
  id: string,
  data: Partial<Transaction>,
): Promise<void> => {
  try {
    const transactionRef = doc(db, "transactions", id);
    await updateDoc(transactionRef, {
      ...data,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "transactions", id));
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
};

// Get transaction by ID
export const getTransactionById = async (
  id: string,
): Promise<Transaction | null> => {
  try {
    const docRef = doc(db, "transactions", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Transaction;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting transaction:", error);
    throw error;
  }
};

// Get spending summary by category for a date range
export const getSpendingSummary = async (
  userId: string,
  startDate: string,
  endDate: string,
): Promise<Record<AccountType, number>> => {
  try {
    const transactions = await getTransactionsByDateRange(
      userId,
      startDate,
      endDate,
    );

    const summary: Record<AccountType, number> = {
      Grocery: 0,
      Salary: 0,
      Entertainment: 0,
      Transportation: 0,
      "Food & Dining": 0,
      Shopping: 0,
      Bills: 0,
      Income: 0,
      Other: 0,
    };

    transactions.forEach((transaction) => {
      if (transaction.amount < 0) {
        // Expense (negative amount)
        summary[transaction.category] += Math.abs(transaction.amount);
      } else {
        // Income (positive amount)
        summary[transaction.category] += transaction.amount;
      }
    });

    return summary;
  } catch (error) {
    console.error("Error getting spending summary:", error);
    throw error;
  }
};
