import { useState } from "react";

function calcBMI(heightCm, weightKg) {
  const h = parseFloat(heightCm);
  const w = parseFloat(weightKg);
  if (!h || !w) return "";
  const m = h / 100;
  const bmi = w / (m * m);
  return bmi.toFixed(1);
}

export default function UserManagement() {
  // สมมุติ user ที่ล็อกอินอยู่ (เดี๋ยวค่อยไปผูก backend)
  const [user, setUser] = useState({
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    email: "jane@example.com",
    sex: "female",
    height: "165",
    weight: "55",
    diseases: "None",
    role: "Member",
    status: "Active",
  });

  const [editing, setEditing] = useState(false);

  const bmi = calcBMI(user.height, user.weight);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: ตรงนี้ไว้ยิง backend อัปเดตโปรไฟล์ทีหลัง
    alert("บันทึกโปรไฟล์แล้ว (ตอนนี้ยังเป็น mock ไม่ได้ยิง backend)");
    setEditing(false);
  };

  const handleCancel = () => {
    // ในของจริงควร reload ข้อมูลจาก backend แทน
    setEditing(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and update your personal information for this account.</p>
      </div>

      <div className="card surface profile-card">
        {!editing ? (
          <>
            <div className="profile-row">
              <span className="profile-label">Name</span>
              <span className="profile-value">
                {user.firstName} {user.lastName}
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Username</span>
              <span className="profile-value">@{user.username}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{user.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Sex</span>
              <span className="profile-value">
                {user.sex === "male"
                  ? "Male"
                  : user.sex === "female"
                  ? "Female"
                  : "Other"}
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Height / Weight</span>
              <span className="profile-value">
                {user.height} cm · {user.weight} kg
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">BMI</span>
              <span className="profile-value">{bmi || "-"}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Diseases</span>
              <span className="profile-value">
                {user.diseases || "No underlying diseases"}
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Role</span>
              <span className="profile-value">
                <span className="badge badge-role">{user.role}</span>
              </span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Status</span>
              <span className="profile-value">
                <span className="badge badge-active">{user.status}</span>
              </span>
            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="btn-xs profile-edit-btn"
                onClick={() => setEditing(true)}
              >
                Edit profile
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <div className="field-row">
              <div className="field">
                <span className="icon">🧍</span>
                <input
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <span className="icon">🧍</span>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={user.lastName}
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
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <span className="icon">📧</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <span className="icon">⚧</span>
                <select
                  name="sex"
                  value={user.sex}
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
                  value={user.height}
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
                  value={user.weight}
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
                value={user.diseases}
                onChange={handleChange}
              />
            </div>

            <div className="profile-actions">
              <button type="button" className="btn-xs ghost" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn-xs profile-edit-btn">
                Save changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
