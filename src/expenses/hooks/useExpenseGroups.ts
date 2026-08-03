import { useEffect, useState } from "react";
import { expenseApi, execute, throwError } from "../api/expenseApi";
import type { ExpenseGroupList } from "../../models/expense-group";
import type { ExpenseGroupFilter } from "../../models/expense-filter";
import type { PageInfo } from "../../models/page-info";

const INITIATE_FILTER: ExpenseGroupFilter = {
  page: 0,
  size: 20,
};

const INITIATE_PAGE_INFO: PageInfo = {
  pageNumber: 0,
  pageSize: 20,
  totalElements: 0,
  totalPages: 0,
};

export default function useExpenseGroups() {
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupList[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfo>(INITIATE_PAGE_INFO);
  const [filter, setFilter] = useState(INITIATE_FILTER);

  const fetchExpenseGroups = () => {
    execute(() => expenseApi.queryExpenseGroups(filter))
      .then((data) => {
        setExpenseGroups(data.content);
        setPageInfo({
          pageNumber: data.number,
          pageSize: data.size,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
      })
      .catch(throwError);
  };

  const nextPage = () => {
    if (pageInfo.pageNumber < pageInfo.totalPages - 1) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        page: pageInfo.pageNumber + 1,
      }));
    }
  };

  const prevPage = () => {
    if (pageInfo.pageNumber > 0) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        page: pageInfo.pageNumber - 1,
      }));
    }
  };

  useEffect(() => {
    fetchExpenseGroups();
  }, [filter]);

  return { expenseGroups, fetchExpenseGroups, pageInfo, nextPage, prevPage };
}
