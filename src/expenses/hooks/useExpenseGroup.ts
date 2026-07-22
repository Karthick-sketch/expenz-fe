import { useEffect, useState } from "react";
import { expenseApi, execute } from "../api/expenseApi";
import type { PieDataItem } from "../../models/pie-data-item";
import { ExpenseGroup } from "../../models/expense-group";
import { calculateCategoryMap, mapPieDataItem } from "../util/expenseUtils";

export default function useExpenseGroup(id: string) {
  const [expenseGroup, setExpenseGroup] = useState<ExpenseGroup>(
    new ExpenseGroup(),
  );
  const [showForm, setShowForm] = useState(false);

  const fetchExpenseGroup = async () => {
    const data = await execute(() => expenseApi.getExpenseGroupById(id));
    setExpenseGroup(data);
  };

  useEffect(() => {
    fetchExpenseGroup();
  }, []);

  const categoryMap: Record<string, number> = {};
  const incomeCategoryMap: Record<string, number> = {};

  calculateCategoryMap(expenseGroup.expenses, categoryMap, incomeCategoryMap);

  const pieData: PieDataItem[] = mapPieDataItem(categoryMap);
  const incomePieData: PieDataItem[] = mapPieDataItem(incomeCategoryMap);

  return {
    expenseGroup,
    showForm,
    setShowForm,
    fetchExpenseGroup,
    pieData,
    incomePieData,
  };
}
