import "./ExpensesPage.css";
import { useState } from "react";
import useExpenses from "./hooks/useExpenses";
import useExpenseCategory from "./hooks/useExpenseCategory";
import useExpenseGroups from "./hooks/useExpenseGroups";
import { CurrencyContext } from "./context/CurrencyContext";
import AppLayout from "./app-layout/AppLayout";
import PageHeader from "./components/page-header/PageHeader";
import ExpenseFilter from "./components/expense-filter/ExpenseFilter";
import StatsRow from "./components/stats-row/StatsRow";
import ChartsRow from "./components/charts-row/ChartsRow";
import TransactionsSection from "./components/transactions-section/TransactionsSection";
import ExpenseFormModal from "./components/expense-form-modal/ExpenseFormModal";
import ExpenseGroupFormModal from "./components/expense-group-form-modal/ExpenseGroupFormModal";
import type { User } from "../models/user";

function ExpensesPage(user: User) {
  const [showGroupForm, setShowGroupForm] = useState(false);
  const {
    expenses,
    summary,
    showForm,
    setShowForm,
    filter,
    setFilter,
    fetchExpenses,
    expensePieData,
    incomePieData,
    pageInfo,
    nextPage,
    prevPage,
  } = useExpenses();
  const {
    expenseGroups,
    fetchExpenseGroups,
    pageInfo: expenseGroupPageInfo,
    nextPage: nextExpenseGroupPage,
    prevPage: prevExpenseGroupPage,
  } = useExpenseGroups();
  const { categoryColors, categories, subCategories, fetchSubCategories } =
    useExpenseCategory();

  return (
    <AppLayout user={user}>
      <CurrencyContext.Provider value={user.currencyCode}>
        <main className="main-content">
          <PageHeader
            title="Expenses"
            subtitle="Track and manage your spending"
            onAddExpense={() => setShowForm(true)}
          />
          <ExpenseFilter
            categories={categories}
            subCategories={subCategories}
            fetchSubCategories={fetchSubCategories}
            filter={filter}
            setFilter={setFilter}
            fetchExpenses={fetchExpenses}
          />
          <StatsRow
            balance={summary.balanceAmount}
            totalExpenses={summary.totalExpensesAmount}
            totalIncome={summary.totalIncomesAmount}
            expenseCount={summary.totalExpensesCount}
            incomeCount={summary.totalIncomesCount}
          />
          <ChartsRow
            expensePieData={expensePieData}
            incomePieData={incomePieData}
          />
          <TransactionsSection
            expenses={expenses}
            onOpenForm={() => setShowForm(true)}
            expenseGroups={expenseGroups}
            onCreateGroup={() => setShowGroupForm(true)}
            categoryColors={categoryColors}
            pageInfo={pageInfo}
            nextPage={nextPage}
            prevPage={prevPage}
            expenseGroupPageInfo={expenseGroupPageInfo}
            nextExpenseGroupPage={nextExpenseGroupPage}
            prevExpenseGroupPage={prevExpenseGroupPage}
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
      </CurrencyContext.Provider>
    </AppLayout>
  );
}

export default ExpensesPage;
