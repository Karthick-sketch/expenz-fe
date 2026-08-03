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

interface ExpenseGroupPage {
  content: ExpenseGroupList[];
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

export type {
  ExpenseGroup,
  ExpenseGroupList,
  ExpenseGroupCreate,
  ExpenseGroupPage,
};
