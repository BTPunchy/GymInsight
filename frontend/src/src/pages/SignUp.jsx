import { useState } from "react";
import { Link } from "react-router-dom";

function calcBMI(heightCm, weightKg) {
  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  if (!h || !w) return "";
  const m = h / 100;
  const bmi = w / (m * m);
  return bmi.toFixed(1);
}

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    sex: "",
    height: "",
    weight: "",
    diseases: "",
    password: "",
    confirmPassword: "",
  });

  const bmi = calcBMI(form.height, form.weight);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: ยิง backend สมัคร user ใหม่
    console.log({
      ...form,
      bmi,
    });
    alert("ส่งข้อมูลสมัครแล้ว (ตอนนี้ยังเป็น mock)");
  };

  return (
    <div className="auth-wrap">
      <div className="diagonal-bg" />

      <div className="auth-card">
        <Link to="/" className="back">
          ← Previous
        </Link>

        <h2 className="auth-title">Sign Up</h2>
        <p className="auth-subtitle">
          Create your FitQuery account and start tracking your wellness.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <span className="icon">🧍</span>
              <input
                name="firstName"
                type="text"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <span className="icon">🧍</span>
              <input
                name="lastName"
                type="text"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <span className="icon">@</span>
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <span className="icon">⚧</span>
              <select
                name="sex"
                value={form.sex}
                onChange={handleChange}
                style={{ background: "transparent", border: "none", color: "inherit" }}
              >
                <option value="">Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="field">
              <span className="icon">📏</span>
              <input
                name="height"
                type="number"
                min="0"
                placeholder="Height (cm)"
                value={form.height}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <span className="icon">🏋️</span>
              <input
                name="weight"
                type="number"
                min="0"
                placeholder="Weight (kg)"
                value={form.weight}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field">
            <span className="icon">📊</span>
            <input
              type="text"
              value={bmi ? `BMI: ${bmi}` : "BMI will be calculated"}
              readOnly
            />
          </div>

          <div className="field textarea-field">
            <span className="icon">💊</span>
            <textarea
              name="diseases"
              placeholder="Underlying diseases / conditions"
              value={form.diseases}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <span className="eye">👁</span>
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            <span className="eye">👁</span>
          </div>

          <button type="submit" className="btn submit">
            Submit
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <Link to="/signin" className="inline-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
