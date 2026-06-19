import type { Expense } from "../../../models/expense";
import ExpensesList from "../expenses-list/ExpensesList";
import "./TransactionsSection.css";

interface TransactionsSectionProps {
  filteredExpenses: Expense[];
  onOpenForm: () => void;
  filter?: string | null;
  setFilter?: ((value: string) => void) | null;
  recent?: boolean;
}

function TransactionsSection({
  filteredExpenses,
  onOpenForm,
  filter = null,
  setFilter = null,
  recent = false,
}: TransactionsSectionProps) {
  return (
    <div className="transactions-section">
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            {recent && "Recent "}
            Transactions
          </span>
          {filter && setFilter && (
            <select
              className="form-select"
              style={{
                width: "auto",
                padding: "0.4rem 2rem 0.4rem 0.8rem",
                fontSize: "0.85rem",
              }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Expenses">Expenses</option>
              <option value="Incomes">Incomes</option>
            </select>
          )}
        </div>
        <div className="card-body">
          <ExpensesList expenses={filteredExpenses} onOpenForm={onOpenForm} />
        </div>
      </div>
    </div>
  );
}

export default TransactionsSection;
