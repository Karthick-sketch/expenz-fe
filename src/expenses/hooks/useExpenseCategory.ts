import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type {
  ExpenseCategory,
  ExpenseSubCategory,
} from "../../models/expense-category";

export default function useExpenseCategory() {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [subCategories, setSubCategories] = useState<ExpenseSubCategory[]>([]);
  const [categoryColors, setCategoryColors] = useState<Record<number, string>>(
    {},
  );

  const fetchCategories = () => {
    execute(() => expenseApi.getExpenseCategories())
      .then((categories) => {
        setCategories(categories);
        const colors = categories.reduce(
          (acc, category) => {
            acc[category.id] = category.colorHex;
            return acc;
          },
          {} as Record<number, string>,
        );
        setCategoryColors(colors);
      })
      .catch(throwError);
  };

  const fetchSubCategories = (categoryId: number) => {
    execute(() => expenseApi.getExpenseSubCategories(categoryId))
      .then(setSubCategories)
      .catch(throwError);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    subCategories,
    fetchSubCategories,
    categoryColors,
  };
}
