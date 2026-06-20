import "./ExpensePage.css";
import { useParams } from "react-router-dom";
import AppLayout from "../app-layout/AppLayout";
import useExpense from "../hooks/useExpense";
import PageHeader from "../components/page-header/PageHeader";
import ExpenseFormModal from "../components/expense-form-modal/ExpenseFormModal";
import { User } from "../../models/user";

function ExpensePage(user: User) {
  const { id } = useParams();
  const { expense, showForm, setShowForm, fetchExpense } = useExpense(id!);

  return (
    <AppLayout user={user}>
      <main className="main-content">
        <PageHeader
          title="Expenses"
          subtitle="Track and manage your spending"
          onAddExpense={() => setShowForm(true)}
        />
        <div className="expense-details">
          <p>Title: {expense.title}</p>
          <p>Amount: {expense.amount}</p>
          <p>Income: {expense.income}</p>
          <p>Currency Code: {expense.currencyCode}</p>
          <p>Category: {expense.category}</p>
          <p>Date Added: {expense.dateAdded}</p>
          <p>Description: {expense.description}</p>
        </div>
      </main>

      {showForm && (
        <ExpenseFormModal
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            fetchExpense();
          }}
        />
      )}
    </AppLayout>
  );
}

export default ExpensePage;
