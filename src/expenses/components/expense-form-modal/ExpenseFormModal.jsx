import { useState } from "react";
import api from "../../../auth/interceptor/api";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/categories";
import "./ExpenseFormModal.css";

const INITIAL = {
  title: "",
  income: false,
  amount: "",
  currencyCode: "INR",
  category: "food",
  description: "",
  dateAdded: new Date().toISOString().split("T")[0],
};

export default function ExpenseFormModal({ onClose, onSuccess }) {
  const [expense, setExpense] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) =>
    setExpense((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/expenses", {
        ...expense,
        amount: Number(expense.amount),
      });
      onSuccess?.();
    } catch (err) {
      setError("Failed to save expense. Please try again.");
      console.error(
        "ExpenseForm submit error:",
        err?.response?.status ?? err.message,
      );
    } finally {
      setLoading(false);
    }
  }

  /* Close on backdrop click */
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose?.();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <span className="modal-title" id="modal-title">
            {expense.income ? "➕ Add Income" : "➕ Add Expense"}
          </span>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
            id="btn-close-expense-form"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {error && (
            <div
              style={{
                background: "rgba(255,77,109,0.12)",
                border: "1px solid rgba(255,77,109,0.3)",
                borderRadius: 8,
                padding: "0.65rem 1rem",
                color: "#ff4d6d",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              {/* Type toggle */}
              <div className="form-field span-2">
                <label className="form-label">Type</label>
                <div className="type-toggle">
                  <input
                    type="radio"
                    id="typeExpense"
                    name="type"
                    checked={!expense.income}
                    onChange={() =>
                      setExpense((p) => ({
                        ...p,
                        income: false,
                        category: "food",
                      }))
                    }
                  />
                  <label htmlFor="typeExpense">Expense</label>
                  <input
                    type="radio"
                    id="typeIncome"
                    name="type"
                    checked={expense.income}
                    onChange={() =>
                      setExpense((p) => ({
                        ...p,
                        income: true,
                        category: "salary",
                      }))
                    }
                  />
                  <label htmlFor="typeIncome">Income</label>
                </div>
              </div>

              {/* Title */}
              <div className="form-field span-2">
                <label className="form-label" htmlFor="exp-title">
                  Title
                </label>
                <input
                  id="exp-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Groceries"
                  value={expense.title}
                  onChange={set("title")}
                  required
                />
              </div>

              {/* Amount */}
              <div className="form-field">
                <label className="form-label" htmlFor="exp-amount">
                  Amount
                </label>
                <input
                  id="exp-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  className="form-input"
                  placeholder="0.00"
                  value={expense.amount}
                  onChange={set("amount")}
                  required
                />
              </div>

              {/* Currency */}
              <div className="form-field">
                <label className="form-label" htmlFor="exp-currencyCode">
                  Currency
                </label>
                <select
                  id="exp-currencyCode"
                  className="form-select"
                  value={expense.currencyCode}
                  onChange={set("currencyCode")}
                >
                  <option value="INR">INR ₹</option>
                  <option value="USD">USD $</option>
                  <option value="EUR">EUR €</option>
                  <option value="GBP">GBP £</option>
                </select>
              </div>

              {/* Category — expense or income variants */}
              <div className="form-field">
                <label className="form-label" htmlFor="exp-category">
                  Category
                </label>
                <select
                  id="exp-category"
                  className="form-select"
                  value={expense.category}
                  onChange={set("category")}
                >
                  {(expense.income
                    ? INCOME_CATEGORIES
                    : EXPENSE_CATEGORIES
                  ).map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="form-field">
                <label className="form-label" htmlFor="exp-dateAdded">
                  Date
                </label>
                <input
                  id="exp-dateAdded"
                  type="date"
                  className="form-input"
                  value={expense.dateAdded}
                  onChange={set("dateAdded")}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-field span-2">
                <label className="form-label" htmlFor="exp-description">
                  Description (optional)
                </label>
                <textarea
                  id="exp-description"
                  className="form-textarea"
                  placeholder="Add a note..."
                  value={expense.description}
                  onChange={set("description")}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
                id="btn-submit-expense"
              >
                {loading
                  ? "Saving…"
                  : expense.income
                    ? "Add Income"
                    : "Add Expense"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
