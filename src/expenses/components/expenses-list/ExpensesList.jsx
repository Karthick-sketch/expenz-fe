import ExpenseItem from "../expense-item/ExpenseItem";
import { CATEGORY_COLORS } from "../../constants/categories";
import "./ExpensesList.css";

function ExpensesList({ expenses, onOpenForm }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🗒️</div>
        <p>No transactions this month.</p>
        <p>
          <button
            onClick={onOpenForm}
            style={{
              background: "none",
              border: "none",
              color: "#6c63ff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "inherit",
              padding: 0,
            }}
          >
            Add your first expense →
          </button>
        </p>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date || b.dateAdded) - new Date(a.date || a.dateAdded),
  );

  return (
    <ul className="expenses-list">
      {sortedExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          dotColor={
            CATEGORY_COLORS[expense.category?.toLowerCase()] ??
            CATEGORY_COLORS.other
          }
        />
      ))}
    </ul>
  );
}

export default ExpensesList;
