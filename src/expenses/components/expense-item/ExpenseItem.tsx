import "./ExpenseItem.css";
import { useNavigate } from "react-router-dom";
import type { Expense } from "../../../models/expense";

interface ExpenseItemProps {
  expense: Expense;
  dotColor: string;
}

function ExpenseItem({ expense, dotColor }: ExpenseItemProps) {
  const navigate = useNavigate();

  const { id, title, amount, dateAdded, income, category } = expense;

  const displayAmount = `${income ? "+" : "-"}₹${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const displayDate = dateAdded
    ? new Date(dateAdded).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <li>
      <div
        className="expense-row"
        id={`expense-row-${id}`}
        onClick={() => navigate(`/expenses/${id}`)}
      >
        {/* Category colour dot */}
        <span
          className="expense-dot"
          style={{ background: dotColor }}
          title={category ?? (income ? "Income" : "Other")}
        />

        {/* Title + meta */}
        <div className="expense-main">
          <div className="expense-title-text">{title}</div>
          <div className="expense-meta">
            {category && (
              <span style={{ textTransform: "capitalize" }}>{category}</span>
            )}
            {category && displayDate && " · "}
            {displayDate}
          </div>
        </div>

        {/* Amount */}
        <span
          className={`expense-amount-text ${income ? "is-income" : "is-expense"}`}
        >
          {displayAmount}
        </span>

        {/* Actions */}
        <div className="expense-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className="expense-action-btn danger"
            id={`btn-delete-expense-${id}`}
            aria-label="Delete expense"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>
    </li>
  );
}

export default ExpenseItem;
