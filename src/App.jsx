import "./App.css";
import "./auth/auth.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Expenses from "./expenses/Expenses.jsx";
import { useAuth } from "./auth/context/AuthContext.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/expenses" replace />} />
            <Route path="/expenses" element={<Expenses />} />
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
