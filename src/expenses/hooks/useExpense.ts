import { useEffect, useState } from "react";
import { expenseApi, execute } from "../api/expenseApi";
import { Expense } from "../../models/expense";

export default function useExpense(id: string) {
  const [expense, setExpense] = useState<Expense>(new Expense());
  const [showForm, setShowForm] = useState(false);
  const [editForm, setEditForm] = useState(false);

  const fetchExpense = async () => {
    const data = await execute(() => expenseApi.getExpenseById(id));
    setExpense(data);
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
