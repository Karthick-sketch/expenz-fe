import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>Email</label>
        <input
          type="text"
          name="email"
          className="border border-gray-300 p-2 rounded-md"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
