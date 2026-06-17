import ExpensesList from "../expenses-list/ExpensesList";
import "./TransactionsSection.css";

function TransactionsSection({
  filter,
  setFilter,
  filteredExpenses,
  onExpenseAdded,
  onOpenForm,
}) {
  return (
    <div className="transactions-section">
      <div className="card">
        <div className="card-header">
          <span className="card-title">Transactions</span>
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
        </div>
        <div className="card-body">
          <ExpensesList
            expenses={filteredExpenses}
            onExpenseAdded={onExpenseAdded}
            onOpenForm={onOpenForm}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionsSection;
