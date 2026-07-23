import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { ExpenseGroupList } from "../../models/expense-group";

export default function useExpenseGroups() {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupList[]>([]);

  const fetchExpenseGroups = () => {
    execute(expenseApi.getExpenseGroups)
      .then(setExpenseGroups)
      .catch(throwError);
  };

  useEffect(() => {
    fetchExpenseGroups();
  }, []);

  return { expenseGroups, fetchExpenseGroups };
}
