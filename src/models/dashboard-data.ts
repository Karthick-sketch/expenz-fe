import type { Expense } from "./expense";
import { PieDataItem } from "./pie-data-item";

interface DashboardData {
  balance: number;
  totalExpenses: number;
  totalIncome: number;
  totalExpenseCount: number;
  totalIncomeCount: number;
  recentExpenses: Expense[];
  expensePieDataItems: PieDataItem[];
  incomePieDataItems: PieDataItem[];
}

export type { DashboardData };
