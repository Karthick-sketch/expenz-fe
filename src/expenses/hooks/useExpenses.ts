import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { ExpenseList } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";
import useExpenseGroups from "./useExpenseGroups";
import { calculateCategoryMap, mapPieDataItem } from "../util/expenseUtils";

export default function useExpenses() {
  const [expenseList, setExpenseList] = useState<ExpenseList>(
    {} as ExpenseList,
  );
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const { expenseGroups, fetchExpenseGroups } = useExpenseGroups();

  const fetchExpenses = () => {
    execute(expenseApi.getThisMonthExpenses)
      .then(setExpenseList)
      .catch(throwError);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const expenseCategoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};
  const expenses = expenseList.expenses || [];

  calculateCategoryMap(
    expenses,
    expenseCategoryMap,
    incomeCategoryMap,
  );

  const pieData: PieDataItem[] = mapPieDataItem(expenseCategoryMap);
  const incomePieData: PieDataItem[] = mapPieDataItem(incomeCategoryMap);

  const filteredExpenses = expenses.filter((e) => {
    if (filter === "Expenses") return !e.income;
    if (filter === "Incomes") return e.income;
    return true;
  });

  return {
    expenses,
    totalExpensesAmount: expenseList.totalExpensesAmount || 0,
    totalIncomesAmount: expenseList.totalIncomesAmount || 0,
    balanceAmount: expenseList.balanceAmount || 0,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    fetchExpenseGroups,
    pieData,
    incomePieData,
    filteredExpenses,
    expenseGroups,
  };
}
