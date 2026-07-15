import {
  type ChangeEvent,
  type SubmitEvent,
  type MouseEvent,
  useState,
} from "react";
import axios from "axios";
import api from "../../../auth/interceptor/api";
import { ExpenseGroupCreate } from "../../../models/expense-group";
/* Reuses modal + form styles from ExpenseFormModal.css */
import "../expense-form-modal/ExpenseFormModal.css";

const INITIAL: ExpenseGroupCreate = {
  title: "",
  description: "",
};

interface ExpenseGroupFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ExpenseGroupFormModal({
  onClose,
  onSuccess,
}: ExpenseGroupFormModalProps) {
  const [group, setGroup] = useState<ExpenseGroupCreate>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (key: keyof ExpenseGroupCreate) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) =>
      setGroup((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await api.post("/expenses/groups", group);
      onSuccess?.();
    } catch (err: unknown) {
      setError("Failed to create expense group. Please try again.");
      if (axios.isAxiosError(err)) {
        console.error(
          "ExpenseGroupForm submit error:",
          err.response?.status ?? err.message,
        );
      } else {
        console.error("ExpenseGroupForm submit error:", err);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleOverlayClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose?.();
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-modal-title"
      >
        {/* Header */}
        <div className="modal-header">
          <span className="modal-title" id="group-modal-title">
            📂 New Expense Group
          </span>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
            id="btn-close-group-form"
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
              {/* Title */}
              <div className="form-field span-2">
                <label className="form-label" htmlFor="group-title">
                  Title
                </label>
                <input
                  id="group-title"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Thailand Trip"
                  value={group.title}
                  onChange={set("title")}
                  required
                />
              </div>

              {/* Description */}
              <div className="form-field span-2">
                <label className="form-label" htmlFor="group-description">
                  Description
                  <span className="form-label-optional"> (optional)</span>
                </label>
                <textarea
                  id="group-description"
                  className="form-textarea"
                  placeholder="Describe this expense group..."
                  value={group.description}
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
                id="btn-submit-group"
              >
                {loading ? "Creating…" : "Create Group"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
