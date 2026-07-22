import { useEffect, useState } from "react";
import { expenseApi, execute } from "../api/expenseApi";
import type { ExpenseGroupList } from "../../models/expense-group";

export default function useExpenseGroups() {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupList[]>([]);

  const fetchExpenseGroups = async () => {
    const data = await execute(() => expenseApi.getExpenseGroups());
    setExpenseGroups(data);
  };

  useEffect(() => {
    fetchExpenseGroups();
  }, []);

  return { expenseGroups, fetchExpenseGroups };
}
