import "./PageHeader.css";

function PageHeader({ onAddExpense }) {
  return (
    <div className="page-header">
      <div>
        <h1>Expenses</h1>
        <p className="subtitle">Track and manage your spending</p>
      </div>
      <button
        className="btn-add-expense"
        id="btn-open-expense-form"
        onClick={onAddExpense}
      >
        ＋ Add Expense
      </button>
    </div>
  );
}

export default PageHeader;
