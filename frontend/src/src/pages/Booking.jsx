export default function Booking() {
  const bookings = [
    {
      id: 'BK-001',
      room: 'Yoga Room',
      date: '2025-11-15',
      time: '09:00 - 10:00',
      status: 'Upcoming',
    },
    {
      id: 'BK-002',
      room: 'Pilates Room',
      date: '2025-11-10',
      time: '18:00 - 19:00',
      status: 'Completed',
    },
    {
      id: 'BK-003',
      room: 'Dance Fitness',
      date: '2025-11-12',
      time: '19:00 - 20:00',
      status: 'Cancelled',
    },
  ]

  return (
    <div className="page">
      <div className="page-header">
        <h1>Booking</h1>
        <p>Track and manage all of your room reservations in one place.</p>
      </div>

      <div className="pill-tabs">
        <button type="button" className="pill active">
          All
        </button>
        <button type="button" className="pill">
          Upcoming
        </button>
        <button type="button" className="pill">
          Completed
        </button>
        <button type="button" className="pill">
          Cancelled
        </button>
      </div>

      <div className="card surface">
        <table className="table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.room}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>
                  <span className={`badge badge-${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                </td>
                <td className="table-actions">
                  <button type="button" className="btn-xs">
                    View
                  </button>
                  <button type="button" className="btn-xs ghost">
                    Cancel
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
