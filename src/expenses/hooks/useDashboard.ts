import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../auth/interceptor/api";
import type { PieDataItem } from "../../models/pie-data-item";
import { DashboardData } from "../../models/dashboard-data";

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    new DashboardData(),
  );
  const [showForm, setShowForm] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/expenses/dashboard");
      setDashboardData(response.data);
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

  dashboardData.recentExpenses.forEach((e) => {
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
    dashboardData,
    showForm,
    setShowForm,
    fetchDashboardData,
    pieData,
    incomePieData,
  };
}
