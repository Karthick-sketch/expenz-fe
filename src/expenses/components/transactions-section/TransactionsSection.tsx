import "./TransactionsSection.css";
import { useState } from "react";
import ExpensesList from "../expenses-list/ExpensesList";
import ExpenseGroupItem from "../expense-group-item/ExpenseGroupItem";
import type { Expense } from "../../../models/expense";
import type { ExpenseGroupList } from "../../../models/expense-group";
import type { PageInfo } from "../../../models/page-info";

interface TransactionsSectionProps {
  expenses: Expense[];
  onOpenForm: () => void;
  recent?: boolean;
  expenseGroups?: ExpenseGroupList[];
  onCreateGroup?: () => void;
  categoryColors: Record<string, string>;
  pageInfo?: PageInfo;
  nextPage?: () => void;
  prevPage?: () => void;
  expenseGroupPageInfo?: PageInfo;
  nextExpenseGroupPage?: () => void;
  prevExpenseGroupPage?: () => void;
}

function TransactionsSection({
  expenses,
  onOpenForm,
  recent = false,
  expenseGroups = [],
  onCreateGroup,
  categoryColors,
  pageInfo,
  nextPage,
  prevPage,
  expenseGroupPageInfo,
  nextExpenseGroupPage,
  prevExpenseGroupPage,
}: TransactionsSectionProps) {
  const [isExpenseGroup, setIsExpenseGroup] = useState(false);

  return (
    <div className="transactions-section">
      <div className="card transactions-card">
        {/* Card Header */}
        <div className="card-header">
          <span className="card-title">
            {recent && "Recent "}
            Transactions
          </span>
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
        {/* Tab bar */}
        <div className="tab-bar">
          <div className="tab-list">
            <button
              id="tab-expenses"
              className={"tab-btn" + (!isExpenseGroup ? " tab-btn-active" : "")}
              onClick={() => setIsExpenseGroup(false)}
            >
              {recent && "Recent "}
              Expenses
            </button>
            <button
              id="tab-expense-groups"
              className={"tab-btn" + (isExpenseGroup ? " tab-btn-active" : "")}
              onClick={() => setIsExpenseGroup(true)}
            >
              {recent && "Recent "}
              Expense Groups
            </button>
          </div>

          {!recent && !isExpenseGroup && pageInfo && nextPage && prevPage && (
            <div className="card-pagination">
              <button onClick={prevPage}>
                <svg
                  className="backward"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="page-info">
                <span className="font-bold">
                  {pageInfo.pageNumber * pageInfo.pageSize + 1} -{" "}
                  {Math.min(
                    pageInfo.pageNumber * pageInfo.pageSize + pageInfo.pageSize,
                    pageInfo.totalElements,
                  )}
                </span>{" "}
                of {pageInfo.totalElements}
              </div>
              <button onClick={nextPage}>
                <svg
                  className="forward"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          {!recent && isExpenseGroup && expenseGroupPageInfo && nextExpenseGroupPage && prevExpenseGroupPage && (
            <div className="card-pagination">
              <button onClick={prevExpenseGroupPage}>
                <svg
                  className="backward"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="page-info">
                <span className="font-bold">
                  {expenseGroupPageInfo.pageNumber * expenseGroupPageInfo.pageSize + 1} -{" "}
                  {Math.min(
                    expenseGroupPageInfo.pageNumber * expenseGroupPageInfo.pageSize + expenseGroupPageInfo.pageSize,
                    expenseGroupPageInfo.totalElements,
                  )}
                </span>{" "}
                of {expenseGroupPageInfo.totalElements}
              </div>
              <button onClick={nextExpenseGroupPage}>
                <svg
                  className="forward"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 6L15 12L9 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {isExpenseGroup ? (
          /* ── Expense Groups card ── */
          expenseGroups.length > 0 || onCreateGroup ? (
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
                    <button
                      className="empty-groups-link"
                      onClick={onCreateGroup}
                    >
                      Create your first group →
                    </button>
                  </p>
                </div>
              )}
            </div>
          ) : null
        ) : (
          /* ── Individual Transactions card ── */
          <div className="card-body">
            <ExpensesList
              expenses={expenses}
              categoryColors={categoryColors}
              onOpenForm={onOpenForm}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionsSection;
