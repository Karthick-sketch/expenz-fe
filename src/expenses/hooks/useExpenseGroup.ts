import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { ExpenseGroup } from "../../models/expense-group";

const INITIATE: ExpenseGroup = {
  id: 0,
  title: "",
  description: "",
  totalExpensesCount: 0,
  totalIncomesCount: 0,
  totalExpensesAmount: 0,
  totalIncomesAmount: 0,
  balanceAmount: 0,
  expenses: [],
  expensePieDataItems: [],
  incomePieDataItems: [],
};

export default function useExpenseGroup(id: string) {
  const [expenseGroup, setExpenseGroup] = useState<ExpenseGroup>(INITIATE);
  const [showForm, setShowForm] = useState(false);

  const fetchExpenseGroup = () => {
    execute(() => expenseApi.getExpenseGroupById(id))
      .then(setExpenseGroup)
      .catch(throwError);
  };

  useEffect(() => {
    fetchExpenseGroup();
  }, []);

  const expensePieData = expenseGroup.expensePieDataItems || [];
  const incomePieData = expenseGroup.incomePieDataItems || [];
  expenseGroup.expenses = expenseGroup.expenses || [];

  return {
    expenseGroup,
    showForm,
    setShowForm,
    fetchExpenseGroup,
    expensePieData,
    incomePieData,
  };
}
