import Expense from "./Expense";

export const CATEGORY_COLORS = {
  // Expense categories
  food: "#f97316",
  shopping: "#8b5cf6",
  travel: "#3b82f6",
  bills: "#ef4444",
  entertainment: "#ec4899",
  health: "#10b981",
  vacation: "#06b6d4",
  // Income categories
  salary: "#00d4aa",
  freelance: "#34d399",
  business: "#a3e635",
  bonus: "#fbbf24",
  investment: "#38bdf8",
  rental: "#818cf8",
  gift: "#f472b6",
  // Fallback
  other: "#6b7280",
};

function ExpensesContainer({ expenses, onOpenForm }) {
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
    (a, b) => new Date(b.date || b.dateAdded) - new Date(a.date || a.dateAdded)
  );

  return (
    <ul className="expenses-list">
      {sortedExpenses.map((expense) => (
        <Expense
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

export default ExpensesContainer;
