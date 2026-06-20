import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../auth/interceptor/api";
import { Expense } from "../../models/expense";

export default function useExpense(id: string) {
  const [expense, setExpense] = useState<Expense>(new Expense());
  const [showForm, setShowForm] = useState(false);

  const fetchExpense = async () => {
    try {
      const response = await api.get<Expense>("/expenses/" + id);
      setExpense(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(
          "Failed to fetch expenses:",
          err.response?.status ?? err.message,
        );
      } else {
        console.error("Failed to fetch expenses:", err);
      }
    }
  };

  useEffect(() => {
    fetchExpense();
  }, [id]);

  return {
    expense,
    showForm,
    setShowForm,
    fetchExpense,
  };
}
