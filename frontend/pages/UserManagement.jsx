import { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    userName: "",
    fName: "",
    lName: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    diseases: "",
    sex: "",
    BMI: "",
  });

  const [draft, setDraft] = useState({ ...profile });
  const userName = localStorage.getItem("userName");
  const hiddenFields = ["id", "password"];

  const fieldLabels = {
    userName: "Username",
    fName: "First Name",
    lName: "Last Name",
    age: "Age",
    height: "Height (cm)",
    weight: "Weight (kg)",
    diseases: "Medical Conditions",
    sex: "Gender",
    BMI: "BMI",
  };

  useEffect(() => {
    if (userName) {
      axios
        .get(`http://localhost:1234/users/${userName}`)
        .then((res) => {
          setProfile(res.data);
          setDraft({ ...res.data });
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [userName]);

  const handleStartEdit = () => {
    setDraft({ ...profile });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1234/users/${userName}`, draft);
      setProfile({ ...draft });
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and update your personal account information.</p>
      </div>

      <div className="card surface">
        {!isEditing ? (
          <div className="profile-view">
            {Object.entries(profile)
              .filter(([key]) => !hiddenFields.includes(key))
              .map(([key, value]) => (
                <div className="profile-row" key={key}>
                  <span className="profile-label">
                    {fieldLabels[key] || key}
                  </span>
                  <span className="profile-value">{value}</span>
                </div>
              ))}

            <div className="profile-actions">
              <button type="button" className="btn" onClick={handleStartEdit}>
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSave}>
            {Object.entries(draft)
              .filter(([key]) => !hiddenFields.includes(key))
              .map(([key, value]) => (
                <div className="profile-row" key={key}>
                  <label className="profile-label" htmlFor={key}>
                    {fieldLabels[key] || key}
                  </label>

                  {key === "sex" ? (
                    <select
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="male" className="text-black">
                        male
                      </option>
                      <option value="female" className="text-black">
                        female
                      </option>
                      <option value="other" className="text-black">
                        other
                      </option>
                    </select>
                  ) : (
                    <input
                      id={key}
                      name={key}
                      type={
                        ["age", "height", "weight", "BMI"].includes(key)
                          ? "number"
                          : "text"
                      }
                      value={value}
                      onChange={handleChange}
                      className="input"
                    />
                  )}
                </div>
              ))}

            <div className="profile-actions">
              <button
                type="button"
                className="btn ghost"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
