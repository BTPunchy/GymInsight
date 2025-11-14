import { useState } from "react";

export default function UserManagement() {
  const initialUsers = [
    { id: 1, name: "Jane Doe", email: "jane@example.com", role: "Member", status: "Active" },
    { id: 2, name: "John Smith", email: "john@example.com", role: "Trainer", status: "Active" },
    { id: 3, name: "Admin Boss", email: "admin@example.com", role: "Admin", status: "Active" },
    { id: 4, name: "Sleepy User", email: "sleepy@example.com", role: "Member", status: "Suspended" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});

  const handleEdit = (user) => {
    setEditingId(user.id);
    setDraft({ ...user }); // clone data for editing
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraft({});
  };

  const handleSave = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === editingId ? draft : u))
    );
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>View roles, status, and manage accounts for the platform.</p>
      </div>

      <div className="card surface">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                {/* Name */}
                <td>
                  {editingId === u.id ? (
                    <input
                      name="name"
                      className="input"
                      value={draft.name}
                      onChange={handleChange}
                    />
                  ) : (
                    u.name
                  )}
                </td>

                {/* Email */}
                <td>
                  {editingId === u.id ? (
                    <input
                      name="email"
                      className="input"
                      value={draft.email}
                      onChange={handleChange}
                    />
                  ) : (
                    u.email
                  )}
                </td>

                {/* Role */}
                <td>
                  {editingId === u.id ? (
                    <select
                      name="role"
                      className="input"
                      value={draft.role}
                      onChange={handleChange}
                    >
                      <option>Member</option>
                      <option>Trainer</option>
                      <option>Admin</option>
                    </select>
                  ) : (
                    <span className="badge badge-role">{u.role}</span>
                  )}
                </td>

                {/* Status */}
                <td>
                  {editingId === u.id ? (
                    <select
                      name="status"
                      className="input"
                      value={draft.status}
                      onChange={handleChange}
                    >
                      <option>Active</option>
                      <option>Suspended</option>
                    </select>
                  ) : (
                    <span
                      className={
                        u.status === "Active"
                          ? "badge badge-active"
                          : "badge badge-suspended"
                      }
                    >
                      {u.status}
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="table-actions">
                  {editingId === u.id ? (
                    <>
                      <button className="btn-xs ghost" onClick={handleCancel}>
                        Cancel
                      </button>
                      <button className="btn-xs" onClick={handleSave}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn-xs ghost">Details</button>
                      <button className="btn-xs" onClick={() => handleEdit(u)}>
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
