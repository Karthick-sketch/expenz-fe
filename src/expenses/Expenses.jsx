import { useState } from "react";
import LeftNavbar from "./components/LeftNavbar";
import ExpensesDuration from "./components/ExpensesDuration";
import ExpensesContainer from "./components/ExpensesContainer";

const expenseItems = [
  {
    id: 1,
    title: "Buy clothes",
    amount: "-₹200",
    date: "01-01-2024",
    description: "Buy clothes for Pongal celebration.",
  },
  {
    id: 2,
    title: "Buy clothes",
    amount: "-₹200",
    date: "01-01-2024",
    description: "Buy clothes for Pongal celebration.",
  },
  {
    id: 3,
    title: "Buy clothes",
    amount: "-₹200",
    date: "01-01-2024",
    description: "Buy clothes for Pongal celebration.",
  },
];

function Expenses() {
  const [expenses, setExpenses] = useState(expenseItems);

  return (
    <article className="expenses-page">
      <LeftNavbar />
      <div>
        <h2>Expenses</h2>
        <ExpensesDuration />
        <ExpensesContainer data={expenses} />
      </div>
    </article>
  );
}

export default Expenses;
