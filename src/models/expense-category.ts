interface ExpenseCategory {
  id: number;
  name: string;
  icon: string;
  colorHex: string;
}

interface ExpenseSubCategory {
  id: number;
  name: string;
  icon: string;
  categoryId: number;
}

export type { ExpenseCategory, ExpenseSubCategory };
