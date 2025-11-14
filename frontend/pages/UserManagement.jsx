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

  useEffect(() => {
    if (userName) {
      axios
        .get(`http://localhost:1234/users/${userName}`)
        .then((res) => {
          setProfile(res.data);
          setDraft({ ...res.data }); // important: clone
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [userName]);

  const handleStartEdit = () => {
    setDraft({ ...profile }); // clone
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

      setProfile({ ...draft }); // update UI
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
                  <span className="profile-label">{key}</span>
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
                    {key}
                  </label>

                  {key === "sex" ? (
                    <select
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
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
