import type { Expense } from "./expense";

interface DashboardData {
  balance: number;
  totalExpenses: number;
  totalIncome: number;
  totalExpenseCount: number;
  totalIncomeCount: number;
  recentExpenses: Expense[];
}

export type { DashboardData };
