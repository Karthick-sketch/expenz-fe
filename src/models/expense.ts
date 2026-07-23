interface Expense {
  id: number;
  title: string;
  income: boolean;
  amount: number;
  category: string;
  dateAdded: string;
  description?: string;
  expenseGroupId?: number;
}

interface ExpenseCreate {
  title: string;
  income: boolean;
  amount: number;
  category: string;
  dateAdded: string;
  description?: string;
  expenseGroupId?: number;
}

interface ExpenseList {
  totalExpensesCount: number;
  totalIncomesCount: number;
  totalExpensesAmount: number;
  totalIncomesAmount: number;
  balanceAmount: number;
  expenses: Expense[];
}

export type { Expense, ExpenseCreate, ExpenseList };
