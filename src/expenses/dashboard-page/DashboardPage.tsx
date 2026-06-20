import { useState } from "react";
import AppLayout from "../app-layout/AppLayout";
import ChartsRow from "../components/charts-row/ChartsRow";
import ExpenseFormModal from "../components/expense-form-modal/ExpenseFormModal";
import PageHeader from "../components/page-header/PageHeader";
import StatsRow from "../components/stats-row/StatsRow";
import TransactionsSection from "../components/transactions-section/TransactionsSection";
import useDashboard from "../hooks/useDashboard";
import { User } from "../../models/user";

export default function DashboardPage(user: User) {
  const [showForm, setShowForm] = useState(false);
  const { dashboardData, fetchDashboardData, pieData, incomePieData } =
    useDashboard();

  return (
    <AppLayout user={user}>
      <main className="main-content">
        <PageHeader
          title="Dashboard"
          subtitle="Welcome back! Here's what's happening with your finances."
          onAddExpense={() => setShowForm(true)}
        />
        <StatsRow
          balance={dashboardData.balance}
          totalExpenses={dashboardData.totalExpenses}
          totalIncome={dashboardData.totalIncome}
          expenseCount={dashboardData.totalExpenseCount}
          incomeCount={dashboardData.totalIncomeCount}
          recent={true}
        />
        <ChartsRow pieData={pieData} incomePieData={incomePieData} />
        <TransactionsSection
          filteredExpenses={dashboardData.recentExpenses}
          onOpenForm={() => setShowForm(true)}
          recent={true}
        />
      </main>

      {showForm && (
        <ExpenseFormModal
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchDashboardData();
          }}
        />
      )}
    </AppLayout>
  );
}
