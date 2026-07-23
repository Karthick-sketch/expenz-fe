import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { PieDataItem } from "../../models/pie-data-item";
import type { DashboardData } from "../../models/dashboard-data";
import useExpenseGroups from "./useExpenseGroups";
import { calculatePieData } from "../util/expenseUtils";
import useExpenseCategory from "./useExpenseCategory";

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    {} as DashboardData,
  );
  const [showForm, setShowForm] = useState(false);
  const { expenseGroups, fetchExpenseGroups } = useExpenseGroups();
  const { categories } = useExpenseCategory();

  const fetchDashboardData = () => {
    execute(expenseApi.getDashboardData)
      .then(setDashboardData)
      .catch(throwError);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const expensePieData: PieDataItem[] = [];
  const incomePieData: PieDataItem[] = [];
  dashboardData.recentExpenses = dashboardData.recentExpenses || [];

  calculatePieData(
    dashboardData.recentExpenses,
    categories,
    expensePieData,
    incomePieData,
  );

  return {
    dashboardData,
    showForm,
    setShowForm,
    fetchDashboardData,
    fetchExpenseGroups,
    expensePieData,
    incomePieData,
    expenseGroups,
  };
}
