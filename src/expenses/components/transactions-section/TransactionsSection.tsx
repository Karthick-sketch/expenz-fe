import type { Expense } from "../../../models/expense";
import type { ExpenseGroupList } from "../../../models/expense-group";
import ExpensesList from "../expenses-list/ExpensesList";
import ExpenseGroupItem from "../expense-group-item/ExpenseGroupItem";
import "./TransactionsSection.css";

interface TransactionsSectionProps {
  filteredExpenses: Expense[];
  onOpenForm: () => void;
  filter?: string | null;
  setFilter?: ((value: string) => void) | null;
  recent?: boolean;
  expenseGroups?: ExpenseGroupList[];
}

function TransactionsSection({
  filteredExpenses,
  onOpenForm,
  filter = null,
  setFilter = null,
  recent = false,
  expenseGroups = [],
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
          {/* Expense Groups section */}
          {expenseGroups.length > 0 && (
            <div className="transactions-group-section">
              <div className="transactions-section-label">
                <span className="section-label-icon">📂</span>
                Expense Groups
              </div>
              <ul className="expenses-list">
                {expenseGroups.map((group) => (
                  <ExpenseGroupItem key={group.id} group={group} />
                ))}
              </ul>
            </div>
          )}

          {/* Individual expenses section */}
          {expenseGroups.length > 0 && filteredExpenses.length > 0 && (
            <div className="transactions-section-label" style={{ marginTop: "1.25rem" }}>
              <span className="section-label-icon">💳</span>
              Individual Transactions
            </div>
          )}
          <ExpensesList expenses={filteredExpenses} onOpenForm={onOpenForm} />
        </div>
      </div>
    </div>
  );
}

export default TransactionsSection;
