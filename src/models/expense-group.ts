import { Expense } from "./expense";

class ExpenseGroup {
  id: number = 0;
  title: string = "";
  description: string = "";
  totalExpensesCount: number = 0;
  totalIncomesCount: number = 0;
  totalExpensesAmount: number = 0;
  totalIncomesAmount: number = 0;
  balanceAmount: number = 0;
  expenses: Expense[] = [];
}

class ExpenseGroupList {
  id: number = 0;
  title: string = "";
  description: string = "";
  expenseCount: number = 0;
  incomeCount: number = 0;
  totalExpensesAmount: number = 0;
  totalIncomesAmount: number = 0;
  balanceAmount: number = 0;
}

class ExpenseGroupCreate {
  title: string = "";
  description: string = "";
}

export { ExpenseGroup, ExpenseGroupList, ExpenseGroupCreate };
