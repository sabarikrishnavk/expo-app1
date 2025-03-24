export type AccountType =
  | "Grocery"
  | "Salary"
  | "Entertainment"
  | "Transportation"
  | "Food & Dining"
  | "Shopping"
  | "Bills"
  | "Income"
  | "Other";

export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  category: AccountType;
  hasReceipt: boolean;
  isMatched: boolean;
  userId: string;
  notes?: string;
  receiptUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: number;
  settings?: UserSettings;
}

export interface UserSettings {
  currency: string;
  monthlyBudget: number;
  categoryBudgets: Record<AccountType, number>;
  notificationsEnabled: boolean;
}
