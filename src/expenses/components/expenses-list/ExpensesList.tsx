import "./ExpensesList.css";
import type { Expense } from "../../../models/expense";
import ExpenseItem from "../expense-item/ExpenseItem";

interface ExpensesListProps {
  expenses: Expense[];
  categoryColors: Record<string, string>;
  onOpenForm: () => void;
}

function ExpensesList({
  expenses,
  categoryColors,
  onOpenForm,
}: ExpensesListProps) {
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
    (a, b) =>
      new Date(b.dateAdded || "").getTime() -
      new Date(a.dateAdded || "").getTime(),
  );

  return (
    <ul className="expenses-list">
      {sortedExpenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          dotColor={categoryColors[expense.categoryId]}
        />
      ))}
    </ul>
  );
}

export default ExpensesList;
