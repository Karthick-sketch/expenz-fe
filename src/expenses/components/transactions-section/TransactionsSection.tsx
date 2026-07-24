import "./TransactionsSection.css";
import type { Expense } from "../../../models/expense";
import type { ExpenseGroupList } from "../../../models/expense-group";
import ExpensesList from "../expenses-list/ExpensesList";
import ExpenseGroupItem from "../expense-group-item/ExpenseGroupItem";

interface TransactionsSectionProps {
  expenses: Expense[];
  onOpenForm: () => void;
  recent?: boolean;
  expenseGroups?: ExpenseGroupList[];
  onCreateGroup?: () => void;
  categoryColors: Record<string, string>;
}

function TransactionsSection({
  expenses,
  onOpenForm,
  recent = false,
  expenseGroups = [],
  onCreateGroup,
  categoryColors,
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
        </div>
        <div className="card-body">
          <ExpensesList
            expenses={expenses}
            categoryColors={categoryColors}
            onOpenForm={onOpenForm}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionsSection;
