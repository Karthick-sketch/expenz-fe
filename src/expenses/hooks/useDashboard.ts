import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { PieDataItem } from "../../models/pie-data-item";
import type { DashboardData } from "../../models/dashboard-data";
import useExpenseGroups from "./useExpenseGroups";
import { calculateCategoryMap, mapPieDataItem } from "../util/expenseUtils";

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(
    {} as DashboardData,
  );
  const [showForm, setShowForm] = useState(false);
  const { expenseGroups, fetchExpenseGroups } = useExpenseGroups();

  const fetchDashboardData = () => {
    execute(expenseApi.getDashboardData)
      .then(setDashboardData)
      .catch(throwError);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const expenseCategoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};
  dashboardData.recentExpenses = dashboardData.recentExpenses || [];

  calculateCategoryMap(
    dashboardData.recentExpenses,
    expenseCategoryMap,
    incomeCategoryMap,
  );

  const pieData: PieDataItem[] = mapPieDataItem(expenseCategoryMap);
  const incomePieData: PieDataItem[] = mapPieDataItem(incomeCategoryMap);

  return {
    dashboardData,
    showForm,
    setShowForm,
    fetchDashboardData,
    fetchExpenseGroups,
    pieData,
    incomePieData,
    expenseGroups,
  };
}
