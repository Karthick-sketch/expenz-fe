import "./App.css";
import "./auth/auth.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./expenses/dashboard-page/DashboardPage";
import ExpensesPage from "./expenses/ExpensesPage";
import ExpensePage from "./expenses/expense-page/ExpensePage";
import { useAuth } from "./auth/context/AuthContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PageNotFound from "./util/page-not-found/PageNotFound";
import ExpenseGroupPage from "./expenses/expense-group-page/ExpenseGroupPage";

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage {...user} />} />
            <Route path="/expenses" element={<ExpensesPage {...user} />} />
            <Route path="/expenses/:id" element={<ExpensePage {...user} />} />
            <Route
              path="/expenses/groups/:id"
              element={<ExpenseGroupPage {...user} />}
            />
            <Route
              path="/login"
              element={<Navigate to="/expenses" replace />}
            />
            <Route
              path="/signup"
              element={<Navigate to="/expenses" replace />}
            />
            <Route path="*" element={<PageNotFound />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
