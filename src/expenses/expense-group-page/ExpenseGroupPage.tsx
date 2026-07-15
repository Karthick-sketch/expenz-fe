import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../app-layout/AppLayout";
import ChartsRow from "../components/charts-row/ChartsRow";
import ExpenseFormModal from "../components/expense-form-modal/ExpenseFormModal";
import StatsRow from "../components/stats-row/StatsRow";
import TransactionsSection from "../components/transactions-section/TransactionsSection";
import useExpenseGroup from "../hooks/useExpenseGroup";
import { User } from "../../models/user";
import { useParams } from "react-router-dom";
import "./ExpenseGroupPage.css";

export default function ExpenseGroupPage(user: User) {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <div>Invalid expense group ID.</div>;
  }

  const [showForm, setShowForm] = useState(false);
  const { expenseGroup, fetchExpenseGroup, pieData, incomePieData } =
    useExpenseGroup(id);

  return (
    <AppLayout user={user}>
      <main className="main-content">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <button
            className="breadcrumb-link"
            onClick={() => navigate("/expenses")}
            aria-label="Back to Expenses"
          >
            Expenses
          </button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">
            {expenseGroup.title || "Expense Group"}
          </span>
        </nav>

        {/* Page header */}
        <div className="expense-group-page-header">
          <div className="expense-group-page-title-wrap">
            <span className="expense-group-page-icon">📂</span>
            <div>
              <h1 className="expense-group-page-title">
                {expenseGroup.title || "Loading…"}
              </h1>
              {expenseGroup.description && (
                <p className="expense-group-page-subtitle">
                  {expenseGroup.description}
                </p>
              )}
            </div>
          </div>
          <button
            className="btn-add-expense"
            id="btn-open-expense-form"
            onClick={() => setShowForm(true)}
          >
            ＋ Add Expense
          </button>
        </div>

        <StatsRow
          balance={expenseGroup.balanceAmount}
          totalExpenses={expenseGroup.totalExpensesAmount}
          totalIncome={expenseGroup.totalIncomesAmount}
          expenseCount={expenseGroup.totalExpensesCount}
          incomeCount={expenseGroup.totalIncomesCount}
          recent={true}
        />
        <ChartsRow pieData={pieData} incomePieData={incomePieData} />
        <TransactionsSection
          filteredExpenses={expenseGroup.expenses}
          onOpenForm={() => setShowForm(true)}
          recent={true}
        />
      </main>

      {showForm && (
        <ExpenseFormModal
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchExpenseGroup();
          }}
          defaultExpenseGroupId={expenseGroup.id}
        />
      )}
    </AppLayout>
  );
}
