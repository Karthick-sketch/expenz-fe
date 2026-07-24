import type { ExpenseType, ExpenseDuration } from "../enums/expense-enums";

interface ExpenseFilter {
  type?: ExpenseType;
  subCategoryId?: number;
  duration?: ExpenseDuration;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}

export type { ExpenseFilter };
