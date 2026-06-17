import Expense from "./Expense";

function ExpensesContainer({ data }) {
  return (
    <section className="expenses-container">
      <ul className="expenses">
        {data.map((expense) => (
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
    </section>
  );
}

export default ExpensesContainer;
