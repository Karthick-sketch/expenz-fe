import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">💸 Expenz</div>
      <nav className="sidebar-nav">
        <a href="/expenses" className="sidebar-link active">
          <span className="sidebar-icon">📋</span> Expenses
        </a>
        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">💰</span> Incomes
        </a>
        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">📊</span> Reports
        </a>
        <a href="#" className="sidebar-link">
          <span className="sidebar-icon">⚙️</span> Settings
        </a>
      </nav>
      <div className="sidebar-logout">
        <button className="sidebar-link" style={{ color: "#ff4d6d" }}>
          <span className="sidebar-icon">🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
