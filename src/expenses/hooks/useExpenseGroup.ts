import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { PieDataItem } from "../../models/pie-data-item";
import type { ExpenseGroup } from "../../models/expense-group";
import { calculatePieData } from "../util/expenseUtils";
import useExpenseCategory from "./useExpenseCategory";

export default function useExpenseGroup(id: string) {
  const [expenseGroup, setExpenseGroup] = useState<ExpenseGroup>(
    {} as ExpenseGroup,
  );
  const [showForm, setShowForm] = useState(false);
  const { categories } = useExpenseCategory();

  const fetchExpenseGroup = () => {
    execute(() => expenseApi.getExpenseGroupById(id))
      .then(setExpenseGroup)
      .catch(throwError);
  };

  useEffect(() => {
    fetchExpenseGroup();
  }, []);

  const expensePieData: PieDataItem[] = [];
  const incomePieData: PieDataItem[] = [];
  expenseGroup.expenses = expenseGroup.expenses || [];

  calculatePieData(
    expenseGroup.expenses,
    categories,
    expensePieData,
    incomePieData,
  );

  return {
    expenseGroup,
    showForm,
    setShowForm,
    fetchExpenseGroup,
    expensePieData,
    incomePieData,
  };
}
