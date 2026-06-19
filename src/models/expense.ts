export interface Expense {
  id: number;
  title: string;
  income: boolean;
  amount: number;
  currencyCode: string;
  category: string;
  dateAdded: string;
  description?: string;
}
