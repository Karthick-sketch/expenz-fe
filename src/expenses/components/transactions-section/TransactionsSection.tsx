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
  onCreateGroup?: () => void;
}

function TransactionsSection({
  filteredExpenses,
  onOpenForm,
  filter = null,
  setFilter = null,
  recent = false,
  expenseGroups = [],
  onCreateGroup,
}: TransactionsSectionProps) {
  return (
    <div className="transactions-section">
      {/* ── Expense Groups card ── */}
      {expenseGroups.length > 0 || onCreateGroup ? (
        <div className="card transactions-card">
          <div className="card-header">
            <span className="card-title">📂 Expense Groups</span>
            {onCreateGroup && (
              <button
                className="btn-create-group"
                id="btn-create-expense-group"
                onClick={onCreateGroup}
              >
                ＋ New Group
              </button>
            )}
          </div>
          <div className="card-body">
            {expenseGroups.length > 0 ? (
              <ul className="expenses-list">
                {expenseGroups.map((group) => (
                  <ExpenseGroupItem key={group.id} group={group} />
                ))}
              </ul>
            ) : (
              <div className="empty-groups">
                <span className="empty-groups-icon">📂</span>
                <p className="empty-groups-text">
                  No expense groups yet.{" "}
                  <button className="empty-groups-link" onClick={onCreateGroup}>
                    Create your first group →
                  </button>
                </p>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* ── Individual Transactions card ── */}
      <div className="card transactions-card">
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
