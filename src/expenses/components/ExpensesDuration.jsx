import "../Expenses.css";

function ExpensesDuration() {
  return (
    <section className="expense-duration">
      <button className="btn-style-default">
        <img src="../src/assets/left.svg" />
      </button>
      <span>January 2024</span>
      <button className="btn-style-default">
        <img src="../src/assets/right.svg" />
      </button>
    </section>
  );
}

export default ExpensesDuration;
