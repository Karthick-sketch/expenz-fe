import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import { ExpenseDuration, ExpenseType } from "../../enums/expense-enums";
import type { Expense, ExpenseSummary } from "../../models/expense";
import type { ExpenseFilter } from "../../models/expense-filter";
import type { PageInfo } from "../../models/page-info";

const INITIATE_SUMMARY: ExpenseSummary = {
  totalExpensesCount: 0,
  totalIncomesCount: 0,
  totalExpensesAmount: 0,
  totalIncomesAmount: 0,
  balanceAmount: 0,
  expensePieDataItems: [],
  incomePieDataItems: [],
};

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

const INITIATE_PAGE_INFO: PageInfo = {
  pageNumber: 0,
  pageSize: 20,
  totalElements: 0,
  totalPages: 0,
};

export default function useExpenses() {
  const [expenseSummary, setExpenseSummary] =
    useState<ExpenseSummary>(INITIATE_SUMMARY);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<ExpenseFilter>(INITIATE);
  const [pageInfo, setPageInfo] = useState<PageInfo>(INITIATE_PAGE_INFO);
  const [pageChangeTrigger, setPageChangeTrigger] = useState(false);

  const fetchSummary = () => {
    execute(() => expenseApi.querySummary(filter))
      .then(setExpenseSummary)
      .catch(throwError);
  };

  const fetchList = () => {
    execute(() => expenseApi.queryExpenses(filter))
      .then((data) => {
        setExpenseList(data.content);
        setPageInfo({
          pageNumber: data.number,
          pageSize: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
        setPageChangeTrigger(false);
      })
      .catch(throwError);
  };

  const nextPage = () => {
    if (pageInfo.pageNumber < pageInfo.totalPages - 1) {
      setPageChangeTrigger(true);
      setFilter((prevFilter) => ({
        ...prevFilter,
        page: pageInfo.pageNumber + 1,
      }));
    }
  };

  const prevPage = () => {
    if (pageInfo.pageNumber > 0) {
      setPageChangeTrigger(true);
      setFilter((prevFilter) => ({
        ...prevFilter,
        page: pageInfo.pageNumber - 1,
      }));
    }
  };

  const fetchExpenses = () => {
    if (!pageChangeTrigger) {
      fetchSummary();
    }
    fetchList();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const expensePieData = expenseSummary.expensePieDataItems || [];
  const incomePieData = expenseSummary.incomePieDataItems || [];
  const expenses = expenseList || [];

  return {
    expenses,
    summary: expenseSummary,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    expensePieData,
    incomePieData,
    pageInfo,
    nextPage,
    prevPage,
  };
}
