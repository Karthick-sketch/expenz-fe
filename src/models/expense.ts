interface Expense {
  id: number;
  title: string;
  income: boolean;
  amount: number;
  dateAdded: string;
  categoryId: number;
  subcategoryId: number;
  description?: string;
  expenseGroupId?: number;
}

interface ExpenseCreate {
  title: string;
  income: boolean;
  amount: number;
  dateAdded: string;
  categoryId: number;
  subcategoryId: number;
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
