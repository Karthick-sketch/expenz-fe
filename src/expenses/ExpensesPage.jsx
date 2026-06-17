import useExpenses from "./hooks/useExpenses";
import Sidebar from "./components/sidebar/Sidebar";
import PageHeader from "./components/page-header/PageHeader";
import MonthNavigator from "./components/month-navigator/MonthNavigator";
import StatsRow from "./components/stats-row/StatsRow";
import ChartsRow from "./components/charts-row/ChartsRow";
import TransactionsSection from "./components/transactions-section/TransactionsSection";
import ExpenseFormModal from "./components/expense-form-modal/ExpenseFormModal";
import "./ExpensesPage.css";

function ExpensesPage() {
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
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <PageHeader onAddExpense={() => setShowForm(true)} />
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
          onExpenseAdded={fetchExpenses}
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
    </div>
  );
}

export default ExpensesPage;
