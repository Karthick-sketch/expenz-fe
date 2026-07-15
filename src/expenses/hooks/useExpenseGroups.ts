import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../auth/interceptor/api";
import { ExpenseGroupList } from "../../models/expense-group";

export default function useExpenseGroups() {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupList[]>([]);

  const fetchExpenseGroups = async () => {
    try {
      const response = await api.get<ExpenseGroupList[]>("/expenses/groups");
      setExpenseGroups(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Failed to fetch expense groups:",
          err.response?.status ?? err.message,
        );
      } else {
        console.error("Failed to fetch expense groups:", err);
      }
    }
  };

  useEffect(() => {
    fetchExpenseGroups();
  }, []);

  return { expenseGroups, fetchExpenseGroups };
}
