import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { Expense } from "../../models/expense";

export default function useExpense(id: string) {
  const [expense, setExpense] = useState<Expense>({} as Expense);
  const [editForm, setEditForm] = useState(false);

  const fetchExpense = () => {
    execute(() => expenseApi.getExpenseById(id))
      .then(setExpense)
      .catch(throwError);
  };

  useEffect(() => {
    fetchExpense();
  }, [id]);

  return {
    expense,
    fetchExpense,
    editForm,
    setEditForm,
  };
}
