import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    height: "",
    weight: "",
    sex: "",
    diseases: "",
    BMI: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const {
        fName,
        lName,
        userName,
        password,
        height,
        weight,
        sex,
        age,
        diseases,
        BMI,
      } = formData;

      const res = await axios.post("http://localhost:1234/users/register", {
        fName,
        lName,
        userName,
        password,
        height,
        weight,
        sex,
        age,
        diseases,
        BMI,
      });

      console.log("Signup success:", res.data);
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="diagonal-bg" />
      <div className="auth-card">
        <Link to="/" className="back">
          ← Previous
        </Link>
        <h2 className="auth-title">Sign Up</h2>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="icon">📝</span>
            <input
              type="text"
              name="fName"
              placeholder="First name"
              value={formData.fName}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">📝</span>
            <input
              type="text"
              name="lName"
              placeholder="Last name"
              value={formData.lName}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">👤</span>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="eye" aria-hidden>
              👁️
            </span>
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span className="eye" aria-hidden>
              👁️
            </span>
          </div>

          <div className="field">
            <span className="icon">🎂</span>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">📏</span>
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">⚖️</span>
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">⚧️</span>
            <input
              type="text"
              name="sex"
              placeholder="Sex"
              value={formData.sex}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">💊</span>
            <input
              type="text"
              name="diseases"
              placeholder="Diseases / Conditions"
              value={formData.diseases}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">📊</span>
            <input
              type="number"
              step="0.1"
              name="BMI"
              placeholder="BMI"
              value={formData.BMI}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
