import type { Expense } from "../../models/expense";
import type { PieDataItem } from "../../models/pie-data-item";
import type { ExpenseCategory } from "../../models/expense-category";

export const calculatePieData = (
  expenses: Expense[],
  categories: ExpenseCategory[],
  expensePieData: PieDataItem[],
  incomePieData: PieDataItem[],
) => {
  (expenses || []).forEach((e) => {
    const category = categories.find((c) => c.id === e.categoryId);
    if (!category) {
      return;
    }
    if (e.income) {
      const existingCategory = incomePieData.find(
        (item) => item.name === category.name,
      );
      if (existingCategory) {
        existingCategory.value += Number(e.amount);
      } else {
        incomePieData.push({
          name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
          value: Number(e.amount),
          color: category.colorHex,
        });
      }
    } else {
      const existingCategory = expensePieData.find(
        (item) => item.name === category.name,
      );
      if (existingCategory) {
        existingCategory.value += Number(e.amount);
      } else {
        expensePieData.push({
          name: category.name.charAt(0).toUpperCase() + category.name.slice(1),
          value: Number(e.amount),
          color: category.colorHex,
        });
      }
    }
  });
};
