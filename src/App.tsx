import "./App.css";
import "./auth/auth.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExpensesPage from "./expenses/ExpensesPage";
import DashboardPage from "./expenses/dashboard-page/DashboardPage";
import { useAuth } from "./auth/context/AuthContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PageNotFound from "./util/page-not-found/PageNotFound";

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
