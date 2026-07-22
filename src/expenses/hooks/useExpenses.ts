import { useEffect, useState } from "react";
import { expenseApi, execute } from "../api/expenseApi";
import { ExpenseList } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";
import useExpenseGroups from "./useExpenseGroups";
import { calculateCategoryMap, mapPieDataItem } from "../util/expenseUtils";

export default function useExpenses() {
  const [expenseList, setExpenseList] = useState<ExpenseList>(
    new ExpenseList(),
  );
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const { expenseGroups, fetchExpenseGroups } = useExpenseGroups();

  const fetchExpenses = async () => {
    const data = await execute(() => expenseApi.getThisMonthExpenses());
    setExpenseList(data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const expenseCategoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};

  calculateCategoryMap(
    expenseList.expenses,
    expenseCategoryMap,
    incomeCategoryMap,
  );

  const pieData: PieDataItem[] = mapPieDataItem(expenseCategoryMap);
  const incomePieData: PieDataItem[] = mapPieDataItem(incomeCategoryMap);

  const filteredExpenses = expenseList.expenses.filter((e) => {
    if (filter === "Expenses") return !e.income;
    if (filter === "Incomes") return e.income;
    return true;
  });

  return {
    expenses: expenseList.expenses,
    totalExpensesAmount: expenseList.totalExpensesAmount,
    totalIncomesAmount: expenseList.totalIncomesAmount,
    balanceAmount: expenseList.balanceAmount,
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
