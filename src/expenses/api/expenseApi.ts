import axios from "axios";
import type { AxiosResponse } from "axios";
import api from "../../auth/interceptor/api";
import type { Expense, ExpenseList } from "../../models/expense";
import type {
  ExpenseGroup,
  ExpenseGroupList,
} from "../../models/expense-group";
import type { DashboardData } from "../../models/dashboard-data";

export const expenseApi = {
  getThisMonthExpenses: () => api.get<ExpenseList>("/expenses/this-month"),
  getExpenseById: (id: string) => api.get<Expense>(`/expenses/${id}`),
  getExpenseGroups: () => api.get<ExpenseGroupList[]>("/expenses/groups"),
  getExpenseGroupById: (id: string) =>
    api.get<ExpenseGroup>(`/expenses/groups/${id}`),
  getDashboardData: () => api.get<DashboardData>("/expenses/dashboard"),
};

export async function execute<T>(fn: () => Promise<AxiosResponse<T>>) {
  try {
    const response = await fn();
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      console.error("Failed to fetch:", err.response?.status ?? err.message);
    } else {
      console.error("Failed to fetch:", err);
    }
    throw err;
  }
}
