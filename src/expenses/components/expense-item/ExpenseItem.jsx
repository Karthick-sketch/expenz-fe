import { useState } from "react";
import "./ExpenseItem.css";

function ExpenseItem({ expense, dotColor }) {
  const [expanded, setExpanded] = useState(false);

  const { id, title, amount, date, description, income, category } = expense;

  const displayAmount = `${income ? "+" : "-"}₹${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const displayDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
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
        onClick={() => setExpanded((prev) => !prev)}
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

      {/* Expandable description */}
      {description && (
        <div className={`expense-description-panel ${expanded ? "open" : ""}`}>
          <div className="expense-description-inner">{description}</div>
        </div>
      )}
    </li>
  );
}

export default ExpenseItem;
