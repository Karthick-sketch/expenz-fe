import "./PageHeader.css";

function PageHeader({ title, subtitle, onAddExpense }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
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
