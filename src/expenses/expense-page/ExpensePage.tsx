import "./ExpensePage.css";
import { useNavigate, useParams } from "react-router-dom";
import AppLayout from "../app-layout/AppLayout";
import useExpense from "../hooks/useExpense";
import ExpenseFormModal from "../components/expense-form-modal/ExpenseFormModal";
import { User } from "../../models/user";

/* ── Category helpers ───────────────────────────── */
const CATEGORY_META: Record<string, { icon: string; color: string }> = {
  food: { icon: "🍔", color: "#f97316" },
  shopping: { icon: "🛍️", color: "#8b5cf6" },
  travel: { icon: "✈️", color: "#3b82f6" },
  bills: { icon: "🧾", color: "#ef4444" },
  entertainment: { icon: "🎬", color: "#ec4899" },
  health: { icon: "🏥", color: "#10b981" },
  vacation: { icon: "🏖️", color: "#06b6d4" },
  salary: { icon: "💼", color: "#00d4aa" },
  freelance: { icon: "🖥️", color: "#34d399" },
  business: { icon: "🏢", color: "#a3e635" },
  bonus: { icon: "🎁", color: "#fbbf24" },
  investment: { icon: "📈", color: "#38bdf8" },
  rental: { icon: "🏠", color: "#818cf8" },
  gift: { icon: "🎀", color: "#f472b6" },
  other: { icon: "📦", color: "#6b7280" },
};

function getCategoryMeta(category: string) {
  return CATEGORY_META[category?.toLowerCase()] ?? CATEGORY_META.other;
}

/* ── Skeleton while loading ─────────────────────── */
function DetailSkeleton() {
  return (
    <div className="expense-detail-layout">
      <div className="detail-skeleton">
        <div
          className="skeleton-line tall"
          style={{
            borderRadius: "50%",
            width: 64,
            height: 64,
            alignSelf: "center",
          }}
        />
        <div className="skeleton-line medium" style={{ alignSelf: "center" }} />
        <div className="skeleton-line short" style={{ alignSelf: "center" }} />
        <div className="skeleton-line full" style={{ height: 1 }} />
        <div className="skeleton-line short" style={{ alignSelf: "center" }} />
      </div>
      <div className="detail-skeleton">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className="skeleton-line full" key={i} />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ─────────────────────────────── */
function ExpensePage(user: User) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { expense, editForm, setEditForm, fetchExpense } = useExpense(id!);

  const isLoaded = expense.id !== 0;
  const meta = getCategoryMeta(expense.category);

  const displayAmount = `${expense.income ? "+" : "-"}₹${Number(
    expense.amount,
  ).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const displayDate = expense.dateAdded
    ? new Date(expense.dateAdded).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <AppLayout user={user}>
      <main className="main-content">
        {/* ── Back button ── */}
        <button className="detail-back" onClick={() => navigate(-1)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to transactions
        </button>

        {/* ── Loading skeleton ── */}
        {!isLoaded && <DetailSkeleton />}

        {/* ── Detail layout ── */}
        {isLoaded && (
          <div className="expense-detail-layout">
            {/* ── LEFT: Hero card ── */}
            <div className="detail-hero">
              {/* Category icon bubble */}
              <div
                className="detail-category-icon"
                style={{ background: meta.color + "22" }}
              >
                {meta.icon}
              </div>

              {/* Title */}
              <h1 className="detail-title">{expense.title}</h1>

              {/* Amount */}
              <span
                className={`detail-amount ${expense.income ? "is-income" : "is-expense"}`}
              >
                {displayAmount}
              </span>

              {/* Type badge */}
              <span
                className={`detail-type-badge ${expense.income ? "is-income" : "is-expense"}`}
              >
                {expense.income ? "💰 Income" : "💸 Expense"}
              </span>

              <div className="detail-divider" />

              {/* Date inside hero for quick scan */}
              <span style={{ fontSize: "0.85rem", color: "var(--text-2)" }}>
                {displayDate}
              </span>
            </div>

            {/* ── RIGHT: Info card ── */}
            <div className="detail-info-card">
              <div className="detail-info-header">
                <span className="detail-info-title">Transaction Details</span>
                <div className="detail-actions">
                  <button
                    className="detail-btn detail-btn-edit"
                    onClick={() => setEditForm(true)}
                    id="btn-edit-expense"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="detail-btn detail-btn-delete"
                    id="btn-delete-expense"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>

              <div className="detail-fields">
                {/* Category */}
                <div className="detail-field">
                  <span className="detail-field-icon">🏷️</span>
                  <div className="detail-field-body">
                    <div className="detail-field-label">Category</div>
                    <div className="detail-field-value">
                      <span
                        className="detail-category-pill"
                        style={{
                          background: meta.color + "22",
                          color: meta.color,
                        }}
                      >
                        {meta.icon}&nbsp;
                        {expense.category
                          ? expense.category.charAt(0).toUpperCase() +
                            expense.category.slice(1)
                          : "Other"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="detail-field">
                  <span className="detail-field-icon">💵</span>
                  <div className="detail-field-body">
                    <div className="detail-field-label">Amount</div>
                    <div
                      className={`detail-field-value ${expense.income ? "is-income" : "is-expense"}`}
                      style={{
                        color: expense.income
                          ? "var(--income)"
                          : "var(--danger)",
                      }}
                    >
                      {displayAmount}
                    </div>
                  </div>
                </div>

                {/* Currency */}
                <div className="detail-field">
                  <span className="detail-field-icon">🌐</span>
                  <div className="detail-field-body">
                    <div className="detail-field-label">Currency</div>
                    <div className="detail-field-value">
                      {expense.currencyCode || "—"}
                    </div>
                  </div>
                </div>

                {/* Date */}
                <div className="detail-field">
                  <span className="detail-field-icon">📅</span>
                  <div className="detail-field-body">
                    <div className="detail-field-label">Date Added</div>
                    <div className="detail-field-value">{displayDate}</div>
                  </div>
                </div>

                {/* Type */}
                <div className="detail-field">
                  <span className="detail-field-icon">🔀</span>
                  <div className="detail-field-body">
                    <div className="detail-field-label">Type</div>
                    <div className="detail-field-value">
                      <span
                        className={`detail-type-badge ${expense.income ? "is-income" : "is-expense"}`}
                      >
                        {expense.income ? "💰 Income" : "💸 Expense"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="detail-field">
                  <span className="detail-field-icon">📝</span>
                  <div className="detail-field-body">
                    <div className="detail-field-label">Description</div>
                    <div
                      className={`detail-field-value ${!expense.description ? "empty" : ""}`}
                    >
                      {expense.description || "No description provided."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── Edit modal ── */}
      {editForm && (
        <ExpenseFormModal
          onClose={() => setEditForm(false)}
          onSuccess={() => {
            setEditForm(false);
            fetchExpense();
          }}
          expenseUpdate={expense}
        />
      )}
    </AppLayout>
  );
}

export default ExpensePage;
