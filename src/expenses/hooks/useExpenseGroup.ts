import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../auth/interceptor/api";
import type { PieDataItem } from "../../models/pie-data-item";
import { ExpenseGroup } from "../../models/expense-group";

export default function useExpenseGroup(id: string) {
  const [expenseGroup, setExpenseGroup] = useState<ExpenseGroup>(
    new ExpenseGroup(),
  );
  const [showForm, setShowForm] = useState(false);

  const fetchExpenseGroup = async () => {
    try {
      const response = await api.get("/expenses/groups/" + id);
      setExpenseGroup(response.data);
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
    fetchExpenseGroup();
  }, []);

  const categoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};

  expenseGroup.expenses.forEach((e) => {
    const cat = e.category || "Other";
    if (e.income) {
      incomeCategoryMap[cat] = (incomeCategoryMap[cat] || 0) + Number(e.amount);
    } else {
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
    }
  });

  const pieData: PieDataItem[] = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }),
  );

  const incomePieData: PieDataItem[] = Object.entries(incomeCategoryMap).map(
    ([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }),
  );

  return {
    expenseGroup,
    showForm,
    setShowForm,
    fetchExpenseGroup,
    pieData,
    incomePieData,
  };
}
