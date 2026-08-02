import { PieDataItem } from "./pie-data-item";

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

interface ExpenseSummary {
  totalExpensesCount: number;
  totalIncomesCount: number;
  totalExpensesAmount: number;
  totalIncomesAmount: number;
  balanceAmount: number;
  expensePieDataItems: PieDataItem[];
  incomePieDataItems: PieDataItem[];
}

interface ExpensePage {
  content: Expense[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export type { Expense, ExpenseCreate, ExpensePage, ExpenseSummary };
