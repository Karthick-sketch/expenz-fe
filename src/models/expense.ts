class Expense {
  id: number = 0;
  title: string = "";
  income: boolean = false;
  amount: number = 0;
  category: string = "";
  dateAdded: string = "";
  description?: string;
  expenseGroupId?: number;
}

class ExpenseCreate {
  title: string = "";
  income: boolean = false;
  amount: number = 0;
  category: string = "";
  dateAdded: string = "";
  description?: string;
  expenseGroupId?: number;
}

class ExpenseList {
  totalExpensesCount: number = 0;
  totalIncomesCount: number = 0;
  totalExpensesAmount: number = 0;
  totalIncomesAmount: number = 0;
  balanceAmount: number = 0;
  expenses: Expense[] = [];
}

export { Expense, ExpenseCreate, ExpenseList };
