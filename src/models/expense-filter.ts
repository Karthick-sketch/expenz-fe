import type { ExpenseType, ExpenseDuration } from "../enums/expense-enums";

interface ExpenseFilter {
  type?: ExpenseType;
  categoryId?: number;
  subCategoryId?: number;
  duration?: ExpenseDuration;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}

export type { ExpenseFilter };
