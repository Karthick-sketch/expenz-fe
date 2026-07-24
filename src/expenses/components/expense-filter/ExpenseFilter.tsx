import "./ExpenseFilter.css";
import { useState } from "react";
import type { ExpenseFilter } from "../../../models/expense-filter";
import { ExpenseDuration, ExpenseType } from "../../../enums/expense-enums";

interface ExpenseFilterProps {
  filter: ExpenseFilter;
  setFilter: (filter: ExpenseFilter) => void;
  fetchExpenses: () => void;
}

function ExpenseFilter({
  filter,
  setFilter,
  fetchExpenses,
}: ExpenseFilterProps) {
  const [showDateRange, setShowDateRange] = useState(false);

  const handleDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
    if (value === ExpenseDuration.DATE_RANGE) {
      setShowDateRange(true);
    } else {
      setShowDateRange(false);
      setFilter({
        ...filter,
        duration: value as ExpenseDuration,
      });
      fetchExpenses();
    }
  };

  return (
    <div className="filter-container">
      <select
        onChange={(e) => {
          setFilter({
            ...filter,
            type: e.target.value as ExpenseType,
          });
          fetchExpenses();
        }}
      >
        <option value={ExpenseType.ALL}>All</option>
        <option value={ExpenseType.EXPENSE}>Expenses</option>
        <option value={ExpenseType.INCOME}>Incomes</option>
      </select>
      <select
        onChange={(e) => {
          setFilter({
            ...filter,
            subCategoryId: parseInt(e.target.value),
          });
          fetchExpenses();
        }}
      >
        <option value="all">All Categories</option>
        <option value="category">Food</option>
        <option value="category">Transport</option>
        <option value="category">Shopping</option>
        <option value="category">Utilities</option>
        <option value="category">Entertainment</option>
        <option value="category">Other</option>
      </select>
      <select onChange={handleDuration}>
        <option value={ExpenseDuration.THIS_WEEK}>This Week</option>
        <option value={ExpenseDuration.LAST_WEEK}>Last Week</option>
        <option value={ExpenseDuration.THIS_MONTH}>This Month</option>
        <option value={ExpenseDuration.LAST_MONTH}>Last Month</option>
        <option value={ExpenseDuration.THIS_YEAR}>This Year</option>
        <option value={ExpenseDuration.LAST_YEAR}>Last Year</option>
        <option value={ExpenseDuration.ALL_TIME}>All Time</option>
        <option value={ExpenseDuration.DATE_RANGE}>Date Range</option>
      </select>
      {showDateRange && (
        <div className="date-range-inputs d-flex align-items-center gap-2">
          <input
            type="date"
            onChange={(e) => {
              setFilter({ ...filter, fromDate: e.target.value });
              fetchExpenses();
            }}
          />
          <input
            type="date"
            onChange={(e) => {
              setFilter({ ...filter, toDate: e.target.value });
              fetchExpenses();
            }}
          />
        </div>
      )}
      <input
        type="search"
        placeholder="Search Expenses"
        onChange={(e) => {
          setFilter({ ...filter, searchTerm: e.target.value });
          fetchExpenses();
        }}
      />
    </div>
  );
}

export default ExpenseFilter;
