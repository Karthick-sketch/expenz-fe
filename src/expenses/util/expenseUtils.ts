import type { Expense } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";

export const calculateCategoryMap = (
  expenses: Expense[],
  expenseCategoryMap: Record<string, number>,
  incomeCategoryMap: Record<string, number>,
) => {
  (expenses || []).forEach((e) => {
    const cat = e.category || "Other";
    if (e.income) {
      incomeCategoryMap[cat] = (incomeCategoryMap[cat] || 0) + Number(e.amount);
    } else {
      expenseCategoryMap[cat] =
        (expenseCategoryMap[cat] || 0) + Number(e.amount);
    }
  });
};

export const mapPieDataItem = (
  categoryMap: Record<string, number>,
): PieDataItem[] => {
  return Object.entries(categoryMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));
};
