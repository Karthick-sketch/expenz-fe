import { Link } from "react-router-dom";
import "./LeftNavbar.css";

function LeftNavbar() {
  return (
    <aside>
      <h2>Karthick</h2>
      <ul id="lnb">
        <li>
          <Link to="/dashboard" className="section" id="section-dasboard">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expenses" className="section" id="section-expenses">
            Expenses
          </Link>
        </li>
        <li>
          <Link to="/incomes" className="section" id="section-incomes">
            Incomes
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default LeftNavbar;
