import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../auth/interceptor/api";
import type { Expense } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";

export default function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const fetchExpenses = async () => {
    try {
      const response = await api.get<Expense[]>("/expenses/this-month");
      setExpenses(response.data);
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
    fetchExpenses();
  }, []);

  // Derived stats
  const totalExpenses = expenses
    .filter((e) => !e.income)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalIncome = expenses
    .filter((e) => e.income)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalIncome - totalExpenses;

  const categoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};

  expenses.forEach((e) => {
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

  const filteredExpenses = expenses.filter((e) => {
    if (filter === "Expenses") return !e.income;
    if (filter === "Incomes") return e.income;
    return true;
  });

  return {
    expenses,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    totalExpenses,
    totalIncome,
    balance,
    pieData,
    incomePieData,
    filteredExpenses,
  };
}
