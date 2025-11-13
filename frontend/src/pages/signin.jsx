import { useState } from "react";
import axios from "axios";
import Box from "../components/box.jsx";

export default function Signin() {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1234/users/login", form);
      localStorage.setItem("userName", res.data.data.userName);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center px-4">
      <Box width={400} height={420} backgroundColor="#1F2937" radius={16}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 w-full px-6 py-8"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Login
          </h2>

          <input
            name="userName"
            placeholder="Username"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
          />

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="mt-4 bg-[#61FF7E] text-gray-900 font-bold py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Login
          </button>
        </form>
      </Box>
    </div>
  );
}
