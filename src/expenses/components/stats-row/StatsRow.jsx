import "./StatsRow.css";

function StatsRow({
  balance,
  totalExpenses,
  totalIncome,
  expenseCount,
  incomeCount,
}) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-label">Balance</span>
        <span
          className={`stat-value ${balance >= 0 ? "income" : "expense"}`}
        >
          {balance >= 0 ? "+" : "-"}₹
          {Math.abs(balance).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="stat-sub">This month</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Total Spent</span>
        <span className="stat-value expense">
          ₹
          {totalExpenses.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="stat-sub">{expenseCount} transactions</span>
      </div>
      <div className="stat-card">
        <span className="stat-label">Total Income</span>
        <span className="stat-value income">
          ₹
          {totalIncome.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <span className="stat-sub">{incomeCount} transactions</span>
      </div>
    </div>
  );
}

export default StatsRow;
