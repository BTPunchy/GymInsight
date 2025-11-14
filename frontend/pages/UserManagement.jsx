import { useState } from 'react'

export default function UserManagement() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    role: 'Member',
    status: 'Active',
  })

  const [draft, setDraft] = useState(profile)

  const handleStartEdit = () => {
    setDraft(profile)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDraft((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    setProfile(draft)
    setIsEditing(false)
    alert('Profile updated (mock only – connect to backend later).')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and update your personal account information.</p>
      </div>

      <div className="card surface">
        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-row">
              <span className="profile-label">Name</span>
              <span className="profile-value">{profile.name}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Email</span>
              <span className="profile-value">{profile.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Role</span>
              <span className="profile-value">{profile.role}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">Status</span>
              <span className="profile-value">
                <span
                  className={
                    profile.status === 'Active'
                      ? 'badge badge-active'
                      : 'badge badge-suspended'
                  }
                >
                  {profile.status}
                </span>
              </span>
            </div>

            <div className="profile-actions">
              <button type="button" className="btn" onClick={handleStartEdit}>
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSave}>
            <div className="profile-row">
              <label className="profile-label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={draft.name}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="profile-row">
              <label className="profile-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={draft.email}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="profile-row">
              <label className="profile-label" htmlFor="role">
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={draft.role}
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="profile-row">
              <label className="profile-label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={draft.status}
                onChange={handleChange}
                className="input"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="profile-actions">
              <button type="button" className="btn ghost" onClick={handleCancel}>
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
  )
}
