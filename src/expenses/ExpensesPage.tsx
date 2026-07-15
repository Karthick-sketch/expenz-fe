import "./ExpensesPage.css";
import useExpenses from "./hooks/useExpenses";
import AppLayout from "./app-layout/AppLayout";
import PageHeader from "./components/page-header/PageHeader";
import MonthNavigator from "./components/month-navigator/MonthNavigator";
import StatsRow from "./components/stats-row/StatsRow";
import ChartsRow from "./components/charts-row/ChartsRow";
import TransactionsSection from "./components/transactions-section/TransactionsSection";
import ExpenseFormModal from "./components/expense-form-modal/ExpenseFormModal";
import ExpenseGroupFormModal from "./components/expense-group-form-modal/ExpenseGroupFormModal";
import { User } from "../models/user";
import { useState } from "react";

function ExpensesPage(user: User) {
  const [showGroupForm, setShowGroupForm] = useState(false);
  const {
    expenses,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    fetchExpenseGroups,
    totalExpenses,
    totalIncome,
    balance,
    pieData,
    incomePieData,
    filteredExpenses,
    expenseGroups,
  } = useExpenses();

  return (
    <AppLayout user={user}>
      <main className="main-content">
        <PageHeader
          title="Expenses"
          subtitle="Track and manage your spending"
          onAddExpense={() => setShowForm(true)}
        />
        <MonthNavigator />
        <StatsRow
          balance={balance}
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          expenseCount={expenses.filter((e) => !e.income).length}
          incomeCount={expenses.filter((e) => e.income).length}
        />
        <ChartsRow pieData={pieData} incomePieData={incomePieData} />
        <TransactionsSection
          filter={filter}
          setFilter={setFilter}
          filteredExpenses={filteredExpenses}
          onOpenForm={() => setShowForm(true)}
          expenseGroups={expenseGroups}
          onCreateGroup={() => setShowGroupForm(true)}
        />
      </main>

      {showForm && (
        <ExpenseFormModal
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchExpenses();
            fetchExpenseGroups();
          }}
        />
      )}

      {showGroupForm && (
        <ExpenseGroupFormModal
          onClose={() => setShowGroupForm(false)}
          onSuccess={() => {
            setShowGroupForm(false);
            fetchExpenseGroups();
          }}
        />
      )}
    </AppLayout>
  );
}

export default ExpensesPage;
