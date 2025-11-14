export default function UserManagement() {
  const users = [
    {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'Member',
      status: 'Active',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Trainer',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Admin Boss',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Sleepy User',
      email: 'sleepy@example.com',
      role: 'Member',
      status: 'Suspended',
    },
  ]

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
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-role">{u.role}</span>
                </td>
                <td>
                  <span
                    className={
                      u.status === 'Active'
                        ? 'badge badge-active'
                        : 'badge badge-suspended'
                    }
                  >
                    {u.status}
                  </span>
                </td>
                <td className="table-actions">
                  <button type="button" className="btn-xs ghost">
                    Details
                  </button>
                  <button type="button" className="btn-xs">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
