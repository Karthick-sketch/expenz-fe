import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../auth/interceptor/api";
import type { Expense } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";

export default function useDashboard() {
  const [balance, setBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenseCount, setTotalExpenseCount] = useState(0);
  const [totalIncomeCount, setTotalIncomeCount] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/expenses/dashboard");
      setTotalExpenses(response.data.totalExpenses);
      setTotalIncome(response.data.totalIncome);
      setBalance(response.data.balance);
      setTotalExpenseCount(response.data.totalExpenseCount);
      setTotalIncomeCount(response.data.totalIncomeCount);
      setRecentExpenses(response.data.recentExpenses);
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
    fetchDashboardData();
  }, []);

  const categoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};

  recentExpenses.forEach((e) => {
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
    recentExpenses,
    showForm,
    setShowForm,
    fetchDashboardData,
    balance,
    totalExpenses,
    totalIncome,
    totalExpenseCount,
    totalIncomeCount,
    pieData,
    incomePieData,
  };
}
