import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const response = await axios.post("api/auth/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      setAccessToken(response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error?.response?.status ?? error.message);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Brand */}
        <span className="auth-brand-icon">💸</span>
        <h1 className="auth-brand">Expenz</h1>
        <h2 className="auth-title">Welcome back</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="auth-input"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="auth-input"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          New to Expenz?{" "}
          <Link to="/signup" className="auth-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
