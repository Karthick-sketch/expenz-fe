import type { Expense } from "./expense";
import { PieDataItem } from "./pie-data-item";

interface ExpenseGroup {
  id: number;
  title: string;
  description: string;
  totalExpensesCount: number;
  totalIncomesCount: number;
  totalExpensesAmount: number;
  totalIncomesAmount: number;
  balanceAmount: number;
  expenses: Expense[];
  expensePieDataItems: PieDataItem[];
  incomePieDataItems: PieDataItem[];
}

interface ExpenseGroupList {
  id: number;
  title: string;
  description: string;
  expenseCount: number;
  incomeCount: number;
  totalExpensesAmount: number;
  totalIncomesAmount: number;
  balanceAmount: number;
}

interface ExpenseGroupCreate {
  title: string;
  description: string;
}

export type { ExpenseGroup, ExpenseGroupList, ExpenseGroupCreate };
