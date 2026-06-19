import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { UserSignup } from "../models/user";
import { type SubmitEvent, useState } from "react";

export default function Signup() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [user, setUser] = useState<UserSignup>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post("api/auth/register", user);
      setAccessToken(res.data.accessToken);
      navigate("/expenses");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Signup failed:",
          error.response?.status ?? error.message,
        );
      } else {
        console.error("Signup failed:", error);
      }
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
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
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
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
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
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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
