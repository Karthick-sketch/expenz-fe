import { useState } from "react";
import "../Expenses.css";

function ExpensesDuration() {
  const [date, setDate] = useState(new Date());

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleDecreaseMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - 1);
    setDate(newDate);
  };

  const handleIncreaseMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    setDate(newDate);
  };

  return (
    <div className="month-nav">
      <button
        className="month-nav-btn"
        onClick={handleDecreaseMonth}
        aria-label="Previous month"
        id="btn-prev-month"
      >
        ‹
      </button>
      <span>{formattedDate}</span>
      <button
        className="month-nav-btn"
        onClick={handleIncreaseMonth}
        aria-label="Next month"
        id="btn-next-month"
      >
        ›
      </button>
    </div>
  );
}

export default ExpensesDuration;
