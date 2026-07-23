import axios from "axios";
import type { AxiosResponse } from "axios";
import api from "../../auth/interceptor/api";
import type { Expense, ExpenseCreate, ExpenseList } from "../../models/expense";
import type {
  ExpenseGroup,
  ExpenseGroupCreate,
  ExpenseGroupList,
} from "../../models/expense-group";
import type { DashboardData } from "../../models/dashboard-data";

export const expenseApi = {
  // GET methods
  getThisMonthExpenses: () => api.get<ExpenseList>("/expenses/this-month"),
  getExpenseById: (id: string) => api.get<Expense>(`/expenses/${id}`),
  getExpenseGroups: () => api.get<ExpenseGroupList[]>("/expenses/groups"),
  getExpenseGroupById: (id: string) =>
    api.get<ExpenseGroup>(`/expenses/groups/${id}`),
  getDashboardData: () => api.get<DashboardData>("/expenses/dashboard"),

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
