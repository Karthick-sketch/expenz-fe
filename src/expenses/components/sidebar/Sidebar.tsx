import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import type { User } from "../../../models/user";

function Sidebar(user: User) {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">💸 Expenz</div>
      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={`sidebar-link ${isActive("/dashboard")}`}
        >
          <span className="sidebar-icon">📊</span> Dashboard
        </Link>
        <Link
          to="/expenses"
          className={`sidebar-link ${isActive("/expenses")}`}
        >
          <span className="sidebar-icon">📋</span> Expenses
        </Link>
      </nav>
      <div className="sidebar-logout">
        <span className="sidebar-icon">🚪</span> {user.name}
      </div>
    </aside>
  );
}

export default Sidebar;
