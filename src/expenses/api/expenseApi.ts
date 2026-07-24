import axios, { AxiosResponse } from "axios";
import api from "../../auth/interceptor/api";
import type { Expense, ExpenseCreate, ExpenseList } from "../../models/expense";
import type {
  ExpenseGroup,
  ExpenseGroupCreate,
  ExpenseGroupList,
} from "../../models/expense-group";
import type { DashboardData } from "../../models/dashboard-data";
import type {
  ExpenseCategory,
  ExpenseSubCategory,
} from "../../models/expense-category";
import type { ExpenseFilter } from "../../models/expense-filter";

export const expenseApi = {
  // QUERY methods
  queryExpenses: (filter: ExpenseFilter) =>
    api.post<ExpenseList>("/expenses/query", filter),

  // GET methods
  getExpenseById: (id: string) => api.get<Expense>(`/expenses/${id}`),
  getExpenseGroups: () => api.get<ExpenseGroupList[]>("/expenses/groups"),
  getExpenseGroupById: (id: string) =>
    api.get<ExpenseGroup>(`/expenses/groups/${id}`),
  getDashboardData: () => api.get<DashboardData>("/expenses/dashboard"),
  getExpenseCategories: () =>
    api.get<ExpenseCategory[]>("/expenses/categories"),
  getExpenseSubCategories: (categoryId: number) =>
    api.get<ExpenseSubCategory[]>(
      `/expenses/categories/${categoryId}/sub-categories`,
    ),

  // POST methods
  createExpense: (expense: ExpenseCreate) =>
    api.post<Expense>("/expenses", expense),
  createExpenseGroup: (expenseGroup: ExpenseGroupCreate) =>
    api.post<ExpenseGroup>("/expenses/groups", expenseGroup),

  // PATCH methods
  updateExpense: (expense: Expense) =>
    api.patch<Expense>(`/expenses/${expense.id}`, expense),
  updateExpenseGroup: (expenseGroup: ExpenseGroup) =>
    api.patch<ExpenseGroup>(
      `/expenses/groups/${expenseGroup.id}`,
      expenseGroup,
    ),

  // DELETE methods
  deleteExpense: (id: string) => api.delete<void>(`/expenses/${id}`),
  deleteExpenseGroup: (id: string) =>
    api.delete<void>(`/expenses/groups/${id}`),
};

export async function execute<T>(
  fn: () => Promise<AxiosResponse<T>>,
): Promise<T> {
  const response = await fn();
  return response.data;
}

export const throwError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    console.error("Failed to fetch:", err.response?.status ?? err.message);
  } else {
    console.error("Failed to fetch:", err);
  }
  throw err;
};
