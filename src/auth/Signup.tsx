import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const res = await axios.post("api/auth/register", {
        name: formData.get("fullName"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      setAccessToken(res.data.accessToken);
      navigate("/expenses");
    } catch (error) {
      console.error("Signup failed:", error?.response?.status ?? error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* Brand */}
        <span className="auth-brand-icon">💸</span>
        <h1 className="auth-brand">Expenz</h1>
        <h2 className="auth-title">Create your account</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              className="auth-input"
              placeholder="Jane Doe"
              autoComplete="name"
              required
            />
          </div>

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
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
