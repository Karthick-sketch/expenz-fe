import { Expense } from "./expense";

export class DashboardData {
  balance = 0;
  totalExpenses = 0;
  totalIncome = 0;
  totalExpenseCount = 0;
  totalIncomeCount = 0;
  recentExpenses: Expense[] = [];
}
