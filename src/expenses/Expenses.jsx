import { useEffect, useState } from "react";
import api from "../auth/interceptor/api";
import ExpensesDuration from "./components/ExpensesDuration";
import ExpensesContainer from "./components/ExpensesContainer";
import ExpensePieChart from "./expense-pie-chart/ExpensePieChart";
import ExpenseForm from "./expense-form/ExpenseForm";
import "./Expenses.css";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses/this-month");
      setExpenses(response.data);
    } catch (err) {
      console.error(
        "Failed to fetch expenses:",
        err?.response?.status ?? err.message,
      );
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Derived stats
  const totalExpenses = expenses
    .filter((e) => !e.income)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const totalIncome = expenses
    .filter((e) => e.income)
    .reduce((sum, e) => sum + Number(e.amount), 0);

  const balance = totalIncome - totalExpenses;

  const categoryMap = {};
  const incomeCategoryMap = {};

  expenses.forEach((e) => {
    const cat = e.category || "Other";
    if (e.income) {
      incomeCategoryMap[cat] = (incomeCategoryMap[cat] || 0) + Number(e.amount);
    } else {
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
    }
  });

  const pieData = Object.entries(categoryMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const incomePieData = Object.entries(incomeCategoryMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  const filteredExpenses = expenses.filter((e) => {
    if (filter === "Expenses") return !e.income;
    if (filter === "Incomes") return e.income;
    return true;
  });

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">💸 Expenz</div>
        <nav className="sidebar-nav">
          <a href="/expenses" className="sidebar-link active">
            <span className="sidebar-icon">📋</span> Expenses
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">💰</span> Incomes
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">📊</span> Reports
          </a>
          <a href="#" className="sidebar-link">
            <span className="sidebar-icon">⚙️</span> Settings
          </a>
        </nav>
        <div className="sidebar-logout">
          <button className="sidebar-link" style={{ color: "#ff4d6d" }}>
            <span className="sidebar-icon">🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1>Expenses</h1>
            <p className="subtitle">Track and manage your spending</p>
          </div>
          <button
            className="btn-add-expense"
            id="btn-open-expense-form"
            onClick={() => setShowForm(true)}
          >
            ＋ Add Expense
          </button>
        </div>

        {/* Month navigator */}
        <ExpensesDuration />

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Balance</span>
            <span
              className={`stat-value ${balance >= 0 ? "income" : "expense"}`}
            >
              {balance >= 0 ? "+" : "-"}₹{Math.abs(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="stat-sub">This month</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Spent</span>
            <span className="stat-value expense">
              ₹{totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="stat-sub">
              {expenses.filter((e) => !e.income).length} transactions
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Income</span>
            <span className="stat-value income">
              ₹{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="stat-sub">
              {expenses.filter((e) => e.income).length} transactions
            </span>
          </div>
        </div>

        {/* Charts row */}
        <div className="charts-row">
          <div className="card chart-card">
            <div className="card-header">
              <span className="card-title">Spending Breakdown</span>
            </div>
            <div className="card-body">
              <ExpensePieChart expenses={pieData} />
            </div>
          </div>
          <div className="card chart-card">
            <div className="card-header">
              <span className="card-title">Income Breakdown</span>
            </div>
            <div className="card-body">
              <ExpensePieChart expenses={incomePieData} />
            </div>
          </div>
        </div>

        {/* Transactions list */}
        <div className="transactions-section">
          <div className="card">
            <div className="card-header">
              <span className="card-title">Transactions</span>
              <select
                className="form-select"
                style={{ width: "auto", padding: "0.4rem 2rem 0.4rem 0.8rem", fontSize: "0.85rem" }}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Expenses">Expenses</option>
                <option value="Incomes">Incomes</option>
              </select>
            </div>
            <div className="card-body">
              <ExpensesContainer
                expenses={filteredExpenses}
                onExpenseAdded={fetchExpenses}
                onOpenForm={() => setShowForm(true)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Expense Form Modal */}
      {showForm && (
        <ExpenseForm
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

export default Expenses;
