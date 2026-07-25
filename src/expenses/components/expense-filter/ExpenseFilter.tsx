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
      set("subCategoryId")(e);
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
      set("duration")(e);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filter]);

  return (
    <div className="filter-container">
      <select onChange={set("type")} value={filter.type}>
        <option value={ExpenseType.ALL}>All</option>
        <option value={ExpenseType.EXPENSE}>Expenses</option>
        <option value={ExpenseType.INCOME}>Incomes</option>
      </select>
      <select onChange={handleCategory} value={filter.categoryId}>
        <option value="0">All Categories</option>
        {categories &&
          categories.length > 0 &&
          categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>
      <select onChange={set("subCategoryId")} value={filter.subCategoryId}>
        <option value="0">All Subcategories</option>
        {subCategories &&
          subCategories.length > 0 &&
          subCategories.map((subCategory) => (
            <option key={subCategory.id} value={subCategory.id}>
              {subCategory.name}
            </option>
          ))}
      </select>
      <select onChange={handleDuration} value={filter.duration}>
        <option value={ExpenseDuration.THIS_MONTH}>This Month</option>
        <option value={ExpenseDuration.LAST_MONTH}>Last Month</option>
        <option value={ExpenseDuration.THIS_WEEK}>This Week</option>
        <option value={ExpenseDuration.LAST_WEEK}>Last Week</option>
        <option value={ExpenseDuration.THIS_YEAR}>This Year</option>
        <option value={ExpenseDuration.LAST_YEAR}>Last Year</option>
        <option value={ExpenseDuration.ALL_TIME}>All Time</option>
        <option value={ExpenseDuration.DATE_RANGE}>Date Range</option>
      </select>
      {showDateRange && (
        <div className="date-range-inputs d-flex align-items-center gap-2">
          <input
            type="date"
            value={filter.fromDate}
            onChange={set("fromDate")}
          />
          <input type="date" onChange={set("toDate")} value={filter.toDate} />
        </div>
      )}
      <input
        type="search"
        placeholder="Search Expenses"
        value={filter.searchTerm}
        onChange={set("searchTerm")}
      />
    </div>
  );
}

export default ExpenseFilter;
