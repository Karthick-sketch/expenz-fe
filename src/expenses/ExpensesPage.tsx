import "./ExpensesPage.css";
import useExpenses from "./hooks/useExpenses";
import AppLayout from "./app-layout/AppLayout";
import PageHeader from "./components/page-header/PageHeader";
import MonthNavigator from "./components/month-navigator/MonthNavigator";
import StatsRow from "./components/stats-row/StatsRow";
import ChartsRow from "./components/charts-row/ChartsRow";
import TransactionsSection from "./components/transactions-section/TransactionsSection";
import ExpenseFormModal from "./components/expense-form-modal/ExpenseFormModal";
import { User } from "../models/user";

function ExpensesPage(user: User) {
  const {
    expenses,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    totalExpenses,
    totalIncome,
    balance,
    pieData,
    incomePieData,
    filteredExpenses,
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
        />
      </main>

      {showForm && (
        <ExpenseFormModal
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchExpenses();
          }}
        />
      )}
    </AppLayout>
  );
}

export default ExpensesPage;
