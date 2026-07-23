import "./ExpenseFormModal.css";
import {
  type ChangeEvent,
  type SubmitEvent,
  type MouseEvent,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { expenseApi, execute } from "../../api/expenseApi";
import { Expense, ExpenseCreate } from "../../../models/expense";
import type { ExpenseGroupList } from "../../../models/expense-group";
import useExpenseCategory from "../../hooks/useExpenseCategory";

const INITIAL: ExpenseCreate = {
  title: "",
  income: false,
  amount: 0,
  categoryId: 0,
  subcategoryId: 0,
  description: "",
  dateAdded: new Date().toISOString().split("T")[0],
};

interface ExpenseFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
  expenseUpdate?: Expense;
  defaultExpenseGroupId?: number;
}

export default function ExpenseFormModal({
  onClose,
  onSuccess,
  expenseUpdate,
  defaultExpenseGroupId,
}: ExpenseFormModalProps) {
  const isEdit = expenseUpdate !== undefined;
  const [expense, setExpense] = useState<ExpenseCreate>(
    isEdit
      ? { ...expenseUpdate }
      : { ...INITIAL, expenseGroupId: defaultExpenseGroupId },
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroupList[]>([]);
  const { categories, subCategories, fetchSubCategories } =
    useExpenseCategory();

  /* Fetch available expense groups */
  useEffect(() => {
    execute(expenseApi.getExpenseGroups)
      .then((expenseGroups) => setExpenseGroups(expenseGroups))
      .catch(() => {
        /* silently ignore — the field becomes invisible */
      });
  }, []);

  const set =
    (key: string) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setExpense((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload: Expense | ExpenseCreate = {
        ...expense,
        amount: Number(expense.amount),
        expenseGroupId: expense.expenseGroupId
          ? Number(expense.expenseGroupId)
          : undefined,
      };
      if (isEdit && expenseUpdate?.id) {
        await execute(() => expenseApi.updateExpense(payload as Expense));
      } else {
        await execute(() => expenseApi.createExpense(payload as ExpenseCreate));
      }
      onSuccess?.();
    } catch (err: unknown) {
      setError("Failed to save expense. Please try again.");
      if (axios.isAxiosError(err)) {
        console.error(
          "ExpenseForm submit error:",
          err.response?.status ?? err.message,
        );
      } else {
        console.error("ExpenseForm submit error:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  /* Close on backdrop click */
  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
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
            {isEdit
              ? `✏️ Edit ${expense.income ? "Income" : "Expense"}`
              : `➕ Add ${expense.income ? "Income" : "Expense"}`}
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
              {/* Category */}
              <div className="form-field">
                <label className="form-label" htmlFor="exp-category">
                  Category
                </label>
                <select
                  id="exp-category"
                  className="form-select"
                  value={expense.categoryId}
                  onChange={(e) => {
                    set("categoryId")(e);
                    fetchSubCategories(Number(e.target.value));
                  }}
                >
                  <option value="0">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* SubCategory */}
              <div className="form-field">
                <label className="form-label" htmlFor="exp-category">
                  Subcategory
                </label>
                <select
                  id="exp-category"
                  className="form-select"
                  value={expense.subcategoryId}
                  onChange={set("subcategoryId")}
                >
                  <option value="0">Select Subcategory</option>
                  {subCategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Expense Group (optional) */}
              {expenseGroups.length > 0 && (
                <div className="form-field span-2">
                  <label className="form-label" htmlFor="exp-group">
                    📂 Expense Group
                    <span className="form-label-optional"> (optional)</span>
                  </label>
                  <select
                    id="exp-group"
                    className="form-select"
                    value={expense.expenseGroupId ?? ""}
                    onChange={(e) =>
                      setExpense((prev) => ({
                        ...prev,
                        expenseGroupId: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      }))
                    }
                  >
                    <option value="">— No group —</option>
                    {expenseGroups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
                  : isEdit
                    ? expense.income
                      ? "Update Income"
                      : "Update Expense"
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
