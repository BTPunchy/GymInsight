import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const navigate = useNavigate();
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

      const user = res.data?.data;
      if (!user || !user.userName) {
        setError("Login failed: Invalid response from server");
        return;
      }

      localStorage.setItem("userName", user.userName);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrap">
      <div className="diagonal-bg" />
      <div className="auth-card">
        <Link to="/" className="back">
          ← Previous
        </Link>
        <h2 className="auth-title">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="icon">👤</span>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="eye" aria-hidden>
              👁️
            </span>
          </div>

          {error && (
            <div className="text-center text-red-700 px-4 py-3 rounded relative mb-2 text-sm font-medium">
              {error}
            </div>
          )}

          <button type="submit" className="btn submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
