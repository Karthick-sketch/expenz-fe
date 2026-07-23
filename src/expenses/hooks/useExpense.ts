import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import { Expense } from "../../models/expense";

export default function useExpense(id: string) {
  const [expense, setExpense] = useState<Expense>(new Expense());
  const [showForm, setShowForm] = useState(false);
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
    showForm,
    setShowForm,
    editForm,
    setEditForm,
    fetchExpense,
  };
}
