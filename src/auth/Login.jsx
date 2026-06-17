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
      console.log(error);
    }
  }

  return (
    <div className="auth-card">
      <h2 className="auth-title text-center">Expenz</h2>
      <h3 className="auth-title">Login</h3>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          name="email"
          className="auth-input"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          className="auth-input"
          required
        />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-white">
          New to Expenz?{" "}
          <Link to="/signup" className="auth-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
