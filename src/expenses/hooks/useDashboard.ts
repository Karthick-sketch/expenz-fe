import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { DashboardData } from "../../models/dashboard-data";
import useExpenseGroups from "./useExpenseGroups";

const INITIATE: DashboardData = {
  balance: 0,
  totalExpenses: 0,
  totalIncome: 0,
  totalExpenseCount: 0,
  totalIncomeCount: 0,
  recentExpenses: [],
  expensePieDataItems: [],
  incomePieDataItems: [],
};

export default function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>(INITIATE);
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

  const expensePieData = dashboardData.expensePieDataItems || [];
  const incomePieData = dashboardData.incomePieDataItems || [];
  dashboardData.recentExpenses = dashboardData.recentExpenses || [];

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
