class Expense {
  id: number = 0;
  title: string = "";
  income: boolean = false;
  amount: number = 0;
  currencyCode: string = "";
  category: string = "";
  dateAdded: string = "";
  description?: string;
  expenseGroupId?: number;
}

class ExpenseCreate {
  title: string = "";
  income: boolean = false;
  amount: number = 0;
  currencyCode: string = "";
  category: string = "";
  dateAdded: string = "";
  description?: string;
  expenseGroupId?: number;
}

export { Expense, ExpenseCreate };
