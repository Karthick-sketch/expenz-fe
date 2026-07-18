import "./ExpenseGroupItem.css";
import { useNavigate } from "react-router-dom";
import type { ExpenseGroupList } from "../../../models/expense-group";
import useCurrency from "../../hooks/useCurrency";

interface ExpenseGroupItemProps {
  group: ExpenseGroupList;
}

function ExpenseGroupItem({ group }: ExpenseGroupItemProps) {
  const navigate = useNavigate();
  const currency = useCurrency();

  const {
    id,
    title,
    description,
    balanceAmount,
    totalExpensesAmount,
    totalIncomesAmount,
    expenseCount,
    incomeCount,
  } = group;

  const isPositive = balanceAmount >= 0;

  const fmt = (n: number) =>
    `${currency}${Math.abs(Number(n)).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <li>
      <div
        className="expense-group-row"
        id={`expense-group-row-${id}`}
        onClick={() => navigate(`/expenses/groups/${id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" && navigate(`/expenses/groups/${id}`)
        }
      >
        {/* Icon */}
        <div className="group-icon-wrap">
          <span className="group-icon">📂</span>
        </div>

        {/* Title + meta */}
        <div className="group-main">
          <div className="group-title-text">{title}</div>
          <div className="group-meta">
            {description && (
              <span className="group-description">{description}</span>
            )}
            {description && (expenseCount > 0 || incomeCount > 0) && " · "}
            {expenseCount > 0 &&
              `${expenseCount} expense${expenseCount !== 1 ? "s" : ""}`}
            {expenseCount > 0 && incomeCount > 0 && ", "}
            {incomeCount > 0 &&
              `${incomeCount} income${incomeCount !== 1 ? "s" : ""}`}
          </div>
        </div>

        {/* Balance + sub-totals */}
        <div className="group-amounts">
          <span
            className={`group-balance ${isPositive ? "is-income" : "is-expense"}`}
          >
            {isPositive ? "+" : "-"}
            {fmt(balanceAmount)}
          </span>
          <div className="group-sub-amounts">
            {totalExpensesAmount > 0 && (
              <span className="group-sub expense">
                -{fmt(totalExpensesAmount)}
              </span>
            )}
            {totalIncomesAmount > 0 && (
              <span className="group-sub income">
                +{fmt(totalIncomesAmount)}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <span className="group-arrow">›</span>
      </div>
    </li>
  );
}

export default ExpenseGroupItem;
