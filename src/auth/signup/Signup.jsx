import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

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
    <div className="flex flex-col gap-2 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          className="border border-gray-300 p-2 rounded-md"
        />
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
          Signup
        </button>
      </form>
    </div>
  );
}
