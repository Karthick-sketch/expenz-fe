import Expense from "./Expense";

function ExpensesContainer({ expenses }) {
  return (
    <section className="expenses-container">
      {expenses.length === 0 ? (
        <p>No expenses found</p>
      ) : (
        <ul className="expenses">
          {expenses.map((expense) => (
            <li key={expense.id} className="expense">
              <Expense
                id={expense.id}
                title={expense.title}
                amount={expense.amount}
                date={expense.date}
                description={expense.description}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ExpensesContainer;
