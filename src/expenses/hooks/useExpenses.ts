import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { Expense, ExpenseSummary } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";
import useExpenseGroups from "./useExpenseGroups";
import useExpenseCategory from "./useExpenseCategory";
import { calculatePieData } from "../util/expenseUtils";
import type { ExpenseFilter } from "../../models/expense-filter";
import { ExpenseDuration, ExpenseType } from "../../enums/expense-enums";

const INITIATE: ExpenseFilter = {
  type: ExpenseType.ALL,
  subCategoryId: 0,
  duration: ExpenseDuration.THIS_MONTH,
  fromDate: "",
  toDate: "",
  searchTerm: "",
  page: 0,
  size: 20,
};

export default function useExpenses() {
  const [expenseSummary, setExpenseSummary] = useState<ExpenseSummary>(
    {} as ExpenseSummary,
  );
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<ExpenseFilter>(INITIATE);

  const { expenseGroups, fetchExpenseGroups } = useExpenseGroups();
  const { categories } = useExpenseCategory();

  const fetchSummary = () => {
    execute(() => expenseApi.querySummary(filter))
      .then(setExpenseSummary)
      .catch(throwError);
  };

  const fetchList = () => {
    execute(() => expenseApi.queryExpenses(filter))
      .then(setExpenseList)
      .catch(throwError);
  };

  const fetchExpenses = () => {
    fetchSummary();
    fetchList();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const expensePieData: PieDataItem[] = [];
  const incomePieData: PieDataItem[] = [];
  const expenses = expenseList || [];

  calculatePieData(expenses, categories, expensePieData, incomePieData);

  return {
    expenses,
    totalExpensesAmount: expenseSummary.totalExpensesAmount || 0,
    totalIncomesAmount: expenseSummary.totalIncomesAmount || 0,
    balanceAmount: expenseSummary.balanceAmount || 0,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    fetchExpenseGroups,
    expensePieData,
    incomePieData,
    expenseGroups,
  };
}
