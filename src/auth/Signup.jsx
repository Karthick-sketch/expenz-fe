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
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-card">
      <h2 className="auth-title text-center">Expenz</h2>
      <h3 className="auth-title">Signup</h3>
      <form onSubmit={handleSubmit} className="auth-form">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          className="auth-input"
          required
        />
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
          Signup
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-white">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
