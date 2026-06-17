import { useEffect, useState } from "react";
import api from "../auth/interceptor/api";
import LeftNavbar from "./components/LeftNavbar";
import ExpensesDuration from "./components/ExpensesDuration";
import ExpensesContainer from "./components/ExpensesContainer";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await api.get("/expenses/this-month");
      setExpenses(response.data);
    };
    fetchExpenses();
  }, []);

  return (
    <article className="expenses-page">
      <LeftNavbar />
      <div>
        <h2>Expenses</h2>
        <ExpensesDuration />
        <ExpensesContainer expenses={expenses} />
      </div>
    </article>
  );
}

export default Expenses;
