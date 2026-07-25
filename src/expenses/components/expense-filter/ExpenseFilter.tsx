import "./ExpenseFilter.css";
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import type { ExpenseFilter } from "../../../models/expense-filter";
import { ExpenseDuration, ExpenseType } from "../../../enums/expense-enums";
import {
  ExpenseCategory,
  ExpenseSubCategory,
} from "../../../models/expense-category";

interface ExpenseFilterProps {
  categories: ExpenseCategory[];
  subCategories: ExpenseSubCategory[];
  fetchSubCategories: (categoryId: number) => void;
  filter: ExpenseFilter;
  setFilter: Dispatch<SetStateAction<ExpenseFilter>>;
  fetchExpenses: () => void;
}

function ExpenseFilter({
  categories,
  subCategories,
  fetchSubCategories,
  filter,
  setFilter,
  fetchExpenses,
}: ExpenseFilterProps) {
  const [showDateRange, setShowDateRange] = useState(false);

  const set =
    (key: keyof ExpenseFilter) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setFilter((prev: ExpenseFilter) => ({ ...prev, [key]: e.target.value }));

  const handleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value);
    if (categoryId === 0) {
      setFilter({
        ...filter,
        subCategoryId: 0,
      });
    }
    fetchSubCategories(categoryId);
    set("categoryId")(e);
  };

  const handleDuration = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === ExpenseDuration.DATE_RANGE) {
      setShowDateRange(true);
    } else {
      setShowDateRange(false);
      setFilter({
        ...filter,
        fromDate: "",
        toDate: "",
      });
    }
    set("duration")(e);
  };

  const isIncompleteDateRange =
    filter.duration === ExpenseDuration.DATE_RANGE &&
    !filter.fromDate &&
    !filter.toDate;

  useEffect(() => {
    if (isIncompleteDateRange) {
      return;
    }

    fetchExpenses();
  }, [filter]);

  return (
    <div className="filter-container">
      {/* Search */}
      <div className="filter-search-container">
        <input
          type="search"
          className="filter-search"
          placeholder="Search Expenses"
          value={filter.searchTerm ?? ""}
          onChange={set("searchTerm")}
        />
      </div>

      {/* Filters */}
      <div className="filter-field-container">
        <div className="filter-field">
          <select
            className="filter-select"
            onChange={set("type")}
            value={filter.type ?? ExpenseType.ALL}
          >
            <option value={ExpenseType.ALL}>All</option>
            <option value={ExpenseType.EXPENSE}>Expenses</option>
            <option value={ExpenseType.INCOME}>Incomes</option>
          </select>
        </div>

        <div className="filter-field">
          <select
            className="filter-select"
            onChange={handleCategory}
            value={filter.categoryId ?? 0}
          >
            <option value="0">All Categories</option>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div className="filter-field">
          <select
            className="filter-select"
            onChange={set("subCategoryId")}
            value={filter.subCategoryId ?? 0}
          >
            <option value="0">All Subcategories</option>
            {subCategories &&
              subCategories.length > 0 &&
              subCategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
          </select>
        </div>

        <div className="filter-field">
          <select
            className="filter-select"
            onChange={handleDuration}
            value={filter.duration ?? ExpenseDuration.THIS_MONTH}
          >
            <option value={ExpenseDuration.THIS_MONTH}>This Month</option>
            <option value={ExpenseDuration.LAST_MONTH}>Last Month</option>
            <option value={ExpenseDuration.THIS_WEEK}>This Week</option>
            <option value={ExpenseDuration.LAST_WEEK}>Last Week</option>
            <option value={ExpenseDuration.THIS_YEAR}>This Year</option>
            <option value={ExpenseDuration.LAST_YEAR}>Last Year</option>
            <option value={ExpenseDuration.ALL_TIME}>All Time</option>
            <option value={ExpenseDuration.DATE_RANGE}>Date Range</option>
          </select>
        </div>

        {showDateRange && (
          <>
            <div className="filter-field">
              <input
                type="date"
                className="filter-date"
                value={filter.fromDate ?? ""}
                onChange={set("fromDate")}
              />
            </div>
            <div className="filter-field">
              <input
                type="date"
                className="filter-date"
                onChange={set("toDate")}
                value={filter.toDate ?? ""}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ExpenseFilter;
